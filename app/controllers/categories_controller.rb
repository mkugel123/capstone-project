class CategoriesController < ApplicationController

  skip_before_action :authorized, only: :index

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    categories = Category.all.order('name')
    render json: categories, include: [:listings, 'listings.user', 'listings.user.reviews']
  end
  
  def create
    category = Category.create!(category_params)
    render json: category, status: :created
  end

  private

  def category_params
    params.permit(:name)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
