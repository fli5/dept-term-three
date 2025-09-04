# frozen_string_literal: true

# ---------------------------------------------------------------------
# Copyright (c) 2025. Felix Li. All rights reserved
#
# Unauthorized copying, modification, or distribution of this file, via any
# medium, is strictly prohibited without prior written permission from Felix Li.
#
# For licensing inquiries, please contact: future.doo@gmail.com
# ---------------------------------------------------------------------

# ---------------------------------------------------------------------
# Program: Full Stack Web Development
# Name: Feng Li
# Course: WEBD-3011 (273794) Agile Full Stack Web Development
# Created: 2025-09-03
# ---------------------------------------------------------------------

# !/usr/bin/env ruby

require_relative '../lib/app/entry_point'

# Optional, if Docker has been injected through env_file
require 'dotenv/load'

environment = ENV['RACK_ENV'] || 'development'
puts "Starting application in #{environment} environment..."
entry_point = App::EntryPoint.new(environment)
entry_point.start_app
