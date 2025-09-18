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
require_relative '../config/config_logger'
setup_logger
puts '=' * 30+'Categories && Products' + '='*30
Category.all.each do |category|
  puts "#{category.id} - Category: #{category.name} (#{category.products.count})"
  category.products.each do |product|
    puts "  #{product.id} - #{product.name.ljust(40)} | $#{'%.2f' % product.price}"
  end
  puts '-' * 80
end
