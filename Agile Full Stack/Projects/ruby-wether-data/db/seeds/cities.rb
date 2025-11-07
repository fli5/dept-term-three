require 'csv'
require 'net/http'
require 'json'

puts "\nImporting Canadian Cities from CSV file..."

csv_file_path = Rails.root.join('db', 'canadian_cities.csv')

def determine_climate_zone(latitude, longitude, retries = 3)
  attempts = 0
  begin
    api_url = "http://climateapi.scottpinkelman.com/api/v1/location/#{latitude}/#{longitude}"
    uri = URI(api_url)
    response = Net::HTTP.get_response(uri)

    unless response.is_a?(Net::HTTPSuccess)
      puts "API returned #{response.code} for (#{latitude}, #{longitude})"
      return nil
    end

    data = JSON.parse(response.body)
    record = data["return_values"]&.first
    return nil unless record

    zone_code = record["koppen_geiger_zone"]
    zone_desc = record["zone_description"]

    if zone_code
      puts "(#{latitude}, #{longitude}) → #{zone_code} (#{zone_desc})"
      zone_code
    else
      puts "No koppen_geiger_zone key found for (#{latitude}, #{longitude})"
      nil
    end

  rescue JSON::ParserError => e
    puts "Failed to parse JSON for (#{latitude}, #{longitude}): #{e.message}"
    nil
  rescue => e
    attempts += 1
    if attempts < retries
      sleep(0.5)
      retry
    else
      puts "API request failed for (#{latitude}, #{longitude}): #{e.message}"
      nil
    end
  end
end


if File.exist?(csv_file_path)

  # Empty old data and reset the self-incrementing ID
  CityClimate.destroy_all
  City.destroy_all
  ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='cities'")
  ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='city_climates'")

  puts "📂 Reading CSV file..."
  imported_count = 0
  skipped_count = 0
  climate_cache = {}

  CSV.foreach(csv_file_path, headers: true) do |row|
    name = row['name']
    country = row['country']
    latitude = row['lat']&.to_f
    longitude = row['lon']&.to_f

    # Only Canadian cities are handled
    next unless country == 'CA'

    unless latitude && longitude
      skipped_count += 1
      puts "Skipped #{name} (missing coordinates)"
      next
    end

    # If the city already exists, just skip it
    if City.exists?(city_name: name, country_name: country)
      skipped_count += 1
      puts "Skipped duplicate city: #{name}"
      next
    end

    city = City.create!(
      city_name: name,
      country_name: country,
      coord_lat: latitude,
      coord_lon: longitude
    )

    # Get the climate zone
    cache_key = "#{latitude},#{longitude}"
    climate_code = climate_cache[cache_key] ||= determine_climate_zone(latitude, longitude)

    if climate_code.present?
      climate_zone = ClimateZone.find_by(zone_code: climate_code)

      if climate_zone
        # If CityClimate already exists, skip it
        if CityClimate.exists?(city_id: city.id, climate_zone_id: climate_zone.id)
          puts "Skipped duplicate CityClimate for #{name} -> #{climate_code}"
          skipped_count += 1
        else
          CityClimate.create!(city: city, climate_zone: climate_zone)
        end
      else
        puts "Climate zone '#{climate_code}' not found in ClimateZones table."
      end
    end

    imported_count += 1
    print "." if imported_count % 50 == 0

    sleep(0.2)
  end

  puts "\nImported #{imported_count} Canadian cities"
  puts "⊘ Skipped #{skipped_count} records (duplicates or missing coordinates)" if skipped_count > 0

else
  puts "Warning: CSV file not found at #{csv_file_path}"
  puts "   Skipping CSV import..."
end
