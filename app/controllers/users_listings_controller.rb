class UsersListingsController < ApplicationController

  def index
    user = User.find_by(id: session[:user_id])
    listings = user.listings
    render json: listings
  end

end