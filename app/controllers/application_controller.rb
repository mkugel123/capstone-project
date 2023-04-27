class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorized
  skip_before_action :authorized, only: :authorized

  def authorized
    return render json: {errors: ["Please login for this action"]}, status: :unauthorized unless session.include? :user_id
  end
  
end
