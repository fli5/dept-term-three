class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show ]

  def index
    # Without .includes(:category), Rails would run one query for all products and one more query for each product’s category.
    # By using .includes(:category), Rails loads all categories in one go — solving the N+1 problem.
    @products = Product.includes(:category).all
  end

  def show
    @product = Product.find(params[:id])
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end
end
