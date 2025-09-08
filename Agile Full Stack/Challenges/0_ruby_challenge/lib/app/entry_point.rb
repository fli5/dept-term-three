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

require_relative 'config_loader'
require_relative 'services/tax_calculator'
require_relative 'utils/logger_helper'

module App
  # Core class
  class EntryPoint
    include Utils::LoggerHelper

    #
    # Constructor
    # @param environment [String] environment name
    #
    def initialize(environment = 'development')
      @config = ConfigLoader.load(environment)
    end

    def start_app
      log "Starting #{App::EntryPoint} in #{@config}"
      print "\nEnter the subtotal: $"
      # Remove '\r','\n','\r\n'
      sub_total = gets.chomp
      calculator = Services::TaxCalculator.new(sub_total)
      calculator.calculate_tax
    end
  end
end
