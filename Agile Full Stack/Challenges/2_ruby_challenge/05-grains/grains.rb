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
  SQUARE_SIZE = 64

  #
  # @param square_no [int] The sequence number of the square
  #
  def self.square(square_no)
    raise ArgumentError, "Square must be between 1 and #{SQUARE_SIZE}" unless (1..SQUARE_SIZE).include?(n)

    2**(square_no - 1)
  end

  def self.total
    (1..SQUARE_SIZE).sum { |square_no| square(square_no) }
  end
end
