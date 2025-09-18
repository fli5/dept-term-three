class Product < ActiveRecord::Base
  # This AR object is linked with the products table.
  <<-COLUMNS
    id
    name
    description
    price
    stock_quantity
    category_id
    created_at
    updated_at
  COLUMNS

  <<-ASSOCIATION
    belongs_to :category
  ASSOCIATION

  # A product has a many to one relationship with a category.
  # The products table has a category_id foreign key.
  # In other words, a product belongs to a category.
  belongs_to :category

  # Validations
  validates :name, presence: true, uniqueness: true, length: { minimum: 3 }
  validates :description, presence: true
  validates :price, presence: true
  validates :stock_quantity, presence: true
end
