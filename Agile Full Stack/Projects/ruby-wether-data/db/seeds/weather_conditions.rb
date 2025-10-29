require 'csv'

puts "Importing Weather Conditions from CSV..."

csv_path = Rails.root.join('db', 'weather_condition.csv')

if File.exist?(csv_path)
  WeatherCondition.delete_all
  ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='weather_conditions'")
  imported = 0
  skipped = 0

  CSV.foreach(csv_path, headers: true) do |row|
    condition_code = row['CODE']&.strip
    condition_name = row['NAME']&.strip
    condition_desc = row['DESC']&.strip
    condition_icon = row['ICON']&.strip

    if condition_code.blank? || condition_name.blank?
      skipped += 1
      next
    end

    WeatherCondition.find_or_create_by!(condition_code: condition_code) do |condition|
      condition.condition_name = condition_name
      condition.condition_desc = condition_desc
      condition.condition_icon = condition_icon
    end

    imported += 1
  end

  puts "Imported #{imported} weather conditions (Skipped #{skipped})"
else
  puts "CSV file not found: #{csv_path}"
end
