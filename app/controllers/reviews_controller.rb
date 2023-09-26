class ReviewsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def create
    review = Review.create!(review_params)
    render json: review, status: :created
  end

  private

  def review_params
    params.permit(:item, :signature, :content, :user_id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
