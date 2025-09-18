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
require_relative '../models/product'
require_relative '../models/category'
require_relative '../config/config_logger'
setup_logger

category = Category.first

puts "\nTrying to create Product A..."
product_a = Product.new(name: "Product A", description: "Product A", price: 12, stock_quantity: 20, category_id: category.id)
product_a.save

puts "\nTrying to create Product B..."
product_b = Product.create(name: "Product B", description: "Product B", price: 15, stock_quantity: 30, category_id: category.id)

puts "\nTrying to create Product C..."
product_c = category.products.build(name: "Product C", description: "Product C", price: 20, stock_quantity: 25)
product_c.save


# Product with missing fields
puts "\nTrying to create a Bad Product ..."
bad_product = Product.new(name: "Bad Product")
unless bad_product.save
  puts "Errors: #{bad_product.errors.full_messages}"
end

puts "\nChecking if products is created successfully..."
Product.where('name LIKE ?', 'Product %').each do |product|
  puts product.inspect
end