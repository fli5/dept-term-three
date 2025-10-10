# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require "csv"

# Clear Tables
Product.destroy_all
Category.destroy_all

# 676.times do
#   Product.create(
#     title: Faker::Commerce.product_name,
#     price: Faker::Commerce.price(range: 5..100.0),
#     stock_quantity: Faker::Number.between(from: 1, to: 200),
#     )
# end

csv_file = Rails.root.join('db/products.csv')
csv_data = File.read(csv_file)

products = CSV.parse(csv_data, headers: true)

# If CSV was created by Excel in Windows you may also need to set an encoding type:
# products = CSV.parse(csv_data, headers: true, encoding: 'iso-8859-1')

products.each do |product|
  # Create categories and products here.
  category_name = product['category']
  product_name = product['name']
  product_price = product['price']
  product_desc = product['description']
  product_quantity = product['stock quantity']
  category = Category.find_or_create_by(name: category_name)
  category.products.create(title: product_name, price: product_price, stock_quantity: product_quantity, description: product_desc)
  puts "Created | product:#{product_name}| category:#{category.name}|"
end
