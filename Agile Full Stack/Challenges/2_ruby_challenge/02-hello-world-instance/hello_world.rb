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
class HelloWorld
  # Define a constructor with parameters
  def initialize(my_name)
    # initialize an instance variable
    @my_name = my_name
  end

  # Define an instance method
  # Assign a default value to greet_to parameter
  def hello(greet_to = 'World')
    "Hello, #{greet_to}. My name is #{@my_name}!"
  end
end
