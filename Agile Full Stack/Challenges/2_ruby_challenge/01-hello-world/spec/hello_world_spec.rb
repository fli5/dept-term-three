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
gem 'rspec', '~> 3.12'
gem 'factory_bot', '~> 6.2'

require_relative '../hello_world'

RSpec.describe HelloWorld do
  # let(:calc) { HelloWorld.new }

  it 'test no name' do
    expect(HelloWorld.hello).to eq('Hello, World!')
  end
end
