class ListingsController < ApplicationController

  skip_before_action :authorized

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    listings = Listing.all
    render json: listings
  end

  def show
    listing = Listing.find(params[:id])
    render json: listing
  end
  
  def create
    listing = Listing.create!(listing_params)
    render json: listing, status: :created
  end

  def update
    listing = Listing.find(params[:id])
    if listing.user_id == session[:user_id]
      listing.update!(listing_params)
      render json: listing, status: :created
    else
      render json: {errors: ["This post does not belong to you"]}, status: :unauthorized
    end
  end

  def destroy
    listing = Listing.find(params[:id])
    listing.delete
    head :ok
  end

  private

  def listing_params
    params.permit(:title, :image, :content, :price, :user_id, :category_id, :id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
