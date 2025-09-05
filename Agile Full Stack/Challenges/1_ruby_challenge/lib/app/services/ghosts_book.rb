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
require_relative '../contracts/task_contract'
module Services
  class GhostsBook
    include Contracts::TaskContract

    def execute_task
      ghosts = [
        { :name => 'Inky', age: 4, loves: 'reindeers', net_worth: 25 },
        { :name => 'Pinky', age: 5, loves: 'garden tools', net_worth: 14 },
        { :name => 'Blinky', age: 7, loves: 'ninjas', net_worth: 18.03 },
        { :name => 'Clyde', age: 6, loves: 'yarn', net_worth: 0 }
      ]

      ghosts.each do |ghost|
        ghost_info = "#{ghost[:name]} is #{ghost[:age]} years old, "
        ghost_info += "loves #{ghost[:loves]} and "
        ghost_info += "has #{ghost[:net_worth]} dollars in the bank."
        puts ghost_info
      end
    end
  end
end
