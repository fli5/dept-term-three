# ---------------------------------------------------------------------
# Copyright (c) 2025. Felix Li. All rights reserved
#
# Unauthorized copying, modification, or distribution of this file, via any
# medium, is strictly prohibited without prior written permission from Felix Li.
#
# For licensing inquiries, please contact: future.doo@gmail.com
# ---------------------------------------------------------------------
module Contracts
  module TaskContract
    def execute_task
      raise NotImplementedError, "You must implement execute_task"
    end
  end
end

# class Dog
#   include Speakable
#
#   def speak
#     "Woof!"
#   end
# end
#
# class Cat
#   include Speakable
#
#   def speak
#     "Meow!"
#   end
# end
#
# animals = [Dog.new, Cat.new]
# animals.each { |a| puts a.speak }
