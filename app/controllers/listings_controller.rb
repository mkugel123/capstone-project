class ListingsController < ApplicationController

  skip_before_action :authorized, only: [:index, :less_than_price]

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    listings = Listing.all.order('title')
    render json: listings
  end

  def show
    listing = Listing.find(params[:id])
    render json: listing
  end
  
  def create
    listing = Listing.new(listing_params)
    listing.user_id = session[:user_id]
    listing.save!
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
    if listing.user_id == session[:user_id]
      listing.delete
      render json: listing, status: :ok
    else
      render json: {errors: ["This post does not belong to you"]}, status: :unauthorized
    end
  end

  def less_than_price
    params_price = params[:price]
    listings_under_price = Listing.where("price < #{params_price}")
    user_of_listings = listings_under_price.map{ |listing| listing.user }
    if listings_under_price.length < 1
      render json: {error: "no listings under that price"}
    else
      render json: user_of_listings
    end
  end

#   array = ["a", "b", "c"]

# array.map { |string| string.upcase }

# ["A", "B", "C"]

  # Book.where("LENGTH(title) > 20")

  private

  def listing_params
    params.permit(:title, :image, :content, :price, :category_id, :image_file)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
