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
  class CarlSagan
    include Contracts::TaskContract

    def execute_task
      carl = {
        toast: 'cosmos',
        punctuation: [',', '.', '?'],
        words: ['know', 'for', 'we']
      }

      sagan = [
        { :are => 'are', 'A' => 'a' },
        { 'waaaaaay' => 'way', :th3 => 'the' },
        'itself',
        { 2 => ['to'] }
      ]

      puts "#{carl[:words][2].capitalize} #{sagan[0][:are]} #{sagan[0]['A']} #{sagan[1]['waaaaaay']} " \
             "#{carl[:words][1]} #{sagan[1][:th3]} #{carl[:toast]} #{sagan[3][2][0]} #{carl[:words][0]} " \
             "#{sagan[2]}#{carl[:punctuation][1]}"
    end
  end
end
