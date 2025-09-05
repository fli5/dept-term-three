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
require_relative 'services/carl_sagan'
require_relative 'services/ghosts_book'
require_relative 'services/dog_breeds'
require_relative 'services/ash_trees'
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
      # Task 1
      puts '1:' + '-' * 80
      carl_agan=Services::CarlSagan.new
      carl_agan.execute_task
      

      #Task 2
      puts '2:'+'-'*80
      ghosts_book=Services::GhostsBook.new
      ghosts_book.execute_task

      #Task 3
      puts '3:'+'-'*80
      dog_breeds=Services::DogBreeds.new
      dog_breeds.execute_task

      #Task 4
      puts '4:'+'-'*80
      ash_trees=Services::AshTrees.new
      ash_trees.execute_task
    end
  end
end