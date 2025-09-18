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
product = Product.find_by(name: "Product A")
if product
  product.destroy
  puts "\nDeleted product: #{product.name}\n"
end
