require 'csv'

puts "Importing Climate Zones from CSV..."

csv_path = Rails.root.join('db',  'climate_zone.csv')

if File.exist?(csv_path)
  ClimateZone.delete_all
  CSV.foreach(csv_path, headers: true) do |row|
    zone_code = row['Code']&.strip
    zone_desc = row['Description']&.strip
    zone_name = row['NAME']&.strip

    next if zone_code.blank? || zone_name.blank?

    ClimateZone.find_or_create_by!(zone_code: zone_code) do |zone|
      zone.zone_name = zone_name
      zone.zone_desc = zone_desc
    end
  end

  puts "Climate zones imported successfully!"
else
  puts "CSV file not found: #{csv_path}"
end
