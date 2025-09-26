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
class Grains
  # Define a constant variable
  SQUARE_SIZE = 64

  #
  # Define a class method
  # @param square_no [int] The sequence number of the square
  #
  def self.square(square_no)
    # Check if the parameter is a valid value
    raise ArgumentError, "Square must be between 1 and #{SQUARE_SIZE}" unless (1..SQUARE_SIZE).include?(square_no)

    # Perform the power operation of two
    2**(square_no - 1)
  end

  def self.total
    (1..SQUARE_SIZE).sum { |square_no| square(square_no) }
  end
end

