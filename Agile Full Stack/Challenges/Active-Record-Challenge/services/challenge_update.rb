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
require_relative '../config/config_logger'
setup_logger

Product.where("stock_quantity > ?", 40).each do |product|
  product.stock_quantity += 1
  product.save
  puts "Updated stock quantity for #{product.name}: "
  puts " - #{product.stock_quantity_before_last_save} -> #{product.stock_quantity}"
end
