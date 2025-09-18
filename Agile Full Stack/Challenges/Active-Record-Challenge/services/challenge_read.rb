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

def output_result(message)
  puts "\n[#{message}]\n"
  puts ('*'*80)
end


# Find any product and inspect
product = Product.first
output_result(product.inspect)

# Total products
output_result("Total products: #{Product.count}")

# Products above $10 starting with 'C'
products_c = Product.where("price > ? AND name LIKE ?", 10, 'C%')
output_result("Products above $10 starting with C: #{products_c.pluck(:name)}")

# Products with low stock (<5)
low_stock_count = Product.where("stock_quantity < ?", 5).count
output_result("Products with low stock: #{low_stock_count}")

# Category association
output_result("Category name for product: #{product.category.name}") if product.category

# Build new product via category
category = Category.first
new_product = category.products.build(
  name: "New Product",
  description: "Built via association",
  price: 25,
  stock_quantity: 10
)
new_product.save
output_result("Created new product via category: #{new_product.name}")

# Products over certain price for a category
expensive_products = category.products.where("price > ?", 20)
output_result("Expensive products in category #{category.name}: #{expensive_products.pluck(:name)}")
