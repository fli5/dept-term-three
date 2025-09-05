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
  class AshTrees
    include Contracts::TaskContract

    def execute_task
      url = 'https://data.winnipeg.ca/resource/d3jk-hb6j.json?$limit=306000'
      uri = URI(url)
      response = Net::HTTP.get(uri)
      trees = JSON.parse(response)
      ash_count = trees.count { |tree| tree['common_name']&.downcase&.include?('ash') }
      puts "Number of Ash trees in dataset: #{ash_count}"
    end
  end
end
