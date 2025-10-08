#!/usr/bin/env ruby
# frozen_string_literal: true

# ---------------------------------------------------------------------
# Copyright (c) 2025. Felix Li. All rights reserved
# Unauthorized copying, modification, or distribution of this file, via any
# medium, is strictly prohibited without prior written permission from Felix Li.
# For licensing inquiries, please contact: fli5@academic.rrc.ca
# ---------------------------------------------------------------------

# ---------------------------------------------------------------------
# Program: Full Stack Web Development
# Name: Feng Li
# Course: WEBD-3011 (273794) Agile Full Stack Web Development
# Created: 2025-09-18
# ---------------------------------------------------------------------
require_relative '../ar'
require_relative '../models/category'
require_relative '../models/product'
require_relative '../config/config_logger'
setup_logger

puts "Created 10 categories and 100 products with Faker."
puts '=' * 80
10.times do
  category_name=Faker::Commerce.department + '-Felix'
  category = Category.create(name: category_name)
  10.times do
    category.products.create(
      name: Faker::Commerce.product_name,
      description: Faker::Lorem.sentence,
      price: Faker::Commerce.price(range: 5..100.0),
      stock_quantity: rand(1..50)
    )
  end
  puts "Category: #{category.name}"
  category.products.each do |product|
    puts "  - #{product.name}"
  end
end

