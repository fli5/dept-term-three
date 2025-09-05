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

require 'yaml'
require 'erb'
require_relative 'utils/logger_helper'

module App
  # Load the configuration for specific environment
  class ConfigLoader
    # Use the LoggerHelper's method as a class method
    extend Utils::LoggerHelper

    # Load the configuration file for the specified environment
    #
    # @param environment [String] environment name，如 "development", "production"
    # @return [Hash] configuration content
    def self.load(environment)
      config_file = File.join(__dir__, '../../config/environments', "#{environment}.yml")
      log "Configuration for '#{environment}' loaded from #{config_file}"
      YAML.safe_load(ERB.new(File.read(config_file)).result)
    end
  end
end
