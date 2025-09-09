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
class BeerSong
  MAXIMUM_BEER = 99

  def verse(beer_num)
    case beer_num
    when 0
      "No more bottles of beer on the wall, no more bottles of beer.\n" \
        "Go to the store and buy some more, 99 bottles of beer on the wall.\n"
    when 1
      "1 bottle of beer on the wall, 1 bottle of beer.\n" \
        "Take it down and pass it around, no more bottles of beer on the wall.\n"
    else
      "#{beer_num} bottles of beer on the wall, #{beer_num} bottles of beer.\n" \
        "Take one down and pass it around, #{beer_num - 1} #{beer_num - 1 == 1 ? 'bottle': 'bottles'} of beer on the wall.\n"
    end
  end

  def verses(start_num, finish_num)
    # Create an array with rang from finish_num to start_num, then reverse it
    # Iterate through the array and call the method verse for each element
    (finish_num..start_num).to_a.reverse.map { |n| verse(n) }.join("\n")
  end

  def lyrics
    verses(MAXIMUM_BEER, 0)
  end
end
