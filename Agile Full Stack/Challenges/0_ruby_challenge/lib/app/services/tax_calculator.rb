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
# Created: 2025-09-03
# ---------------------------------------------------------------------
module App
  module Services
    # TaxCalculator
    class TaxCalculator
      # Constants
      PST_RATE = 0.07
      GST_RATE = 0.05

      # @param sub_total [String]
      def initialize(sub_total)
        # Convert a String to a Float
        @sub_total = sub_total.to_f
      end

      # Display the appropriate message based on the grand total.
      # @param grand_total [Float] grand total
      def print_message(grand_total)
        if grand_total <= 5
          puts 'Pocket Change'
        elsif grand_total > 5 && grand_total < 20
          puts 'Wallet Time'
        else
          puts 'Charge It!'
        end
      end

      # Output the receipt
      # @param pst_tax [Float] PST Tax
      # @param gst_tax [Float] GST Tax
      # @param grand_total [Float] Total Charge
      def print_receipt(pst_tax,gst_tax,grand_total)
        # Format the number to keep two decimal places
        puts "Subtotal: $#{format('%.2f',@sub_total)}"
        puts "PST: $#{format('%.2f',pst_tax)} - #{(PST_RATE * 100).to_i}%"
        puts "GST: $#{format('%.2f',gst_tax)} - #{(GST_RATE * 100).to_i}%"
        puts "Grand Total: $#{format('%.2f',grand_total)}"
      end

      # Calculate the grand total
      def calculate_tax
        # Calculate the two kinds of tax
        pst_tax = @sub_total * PST_RATE
        gst_tax = @sub_total * GST_RATE

        grand_total = @sub_total + pst_tax + gst_tax

        # Print 20 dashes
        puts '-' * 20
        print_receipt(pst_tax,gst_tax,grand_total)
        puts ''

        # Print message based on total
        print_message(grand_total)
        puts '-' * 20
      end
    end
  end
end
