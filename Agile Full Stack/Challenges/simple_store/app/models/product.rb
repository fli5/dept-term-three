class Product < ApplicationRecord
  belongs_to :category, required: false
  validates :title, presence: true
  validates :price, presence: true
  validates :stock_quantity, presence: true
end
