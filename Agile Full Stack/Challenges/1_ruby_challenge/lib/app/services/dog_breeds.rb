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
# Created: 2025-09-04
# ---------------------------------------------------------------------
require 'net/http'
require 'json'
require 'pp'
require_relative '../contracts/task_contract'
module Services
  class DogBreeds
    include Contracts::TaskContract

    def execute_task
      url = 'https://dog.ceo/api/breeds/list/all'
      uri = URI(url)
      response = Net::HTTP.get(uri)
      dog_breeds = JSON.parse(response)
      # pp dog_breeds # pp stands for pretty print.

      dog_breeds['message'].each do |key, value|
        puts "* #{key.capitalize}"
        value.each do |item|
          puts "  * #{item.capitalize}"
        end
      end
    end
  end
end
