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
# Created: 2025-09-08
# ---------------------------------------------------------------------
class Pangram
  def self.is_pangram?(sentence)
    sentence.nil?
    # Create a letter array with a range
    letter_array = ('a'..'z').to_a

    # Convert the sentence into lowercase, then remove non-alphabeted letter
    normalized_str = sentence.downcase.gsub(/[^a-z]/, '')

    letter_array.all? { |ch| normalized_str.include?(ch) }
  end
end
