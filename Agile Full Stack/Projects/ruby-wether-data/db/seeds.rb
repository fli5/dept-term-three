# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Starting seed process..."

seed_files = [
  # 'cities.rb',
  # 'climate_zones.rb',
  # 'weather_conditions.rb'
  'weather_readings.rb'
]

seed_files.each do |file|
  seed_path = File.join(Rails.root, 'db', 'seeds', file)
  load(seed_path)
end

puts "All seed data loaded successfully!"
