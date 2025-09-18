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
require 'logger'
def setup_logger
  script_name = File.basename($0, ".rb")
  log_file = "logs/#{script_name}.log"
  FileUtils.mkdir_p("logs") unless Dir.exist?("logs")

  logger = Logger.new(log_file)
  ActiveRecord::Base.logger = logger
end
