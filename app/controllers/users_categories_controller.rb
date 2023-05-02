class UsersCategoriesController < ApplicationController

  def index
    user = User.find_by(id: session[:user_id])
    categories = user.categories.uniq
    render json: categories
  end

end