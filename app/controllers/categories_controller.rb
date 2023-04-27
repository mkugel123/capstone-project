class CategoriesController < ApplicationController

  skip_before_action :authorized, only: :index

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    highways = Highway.all
    render json: highways
  end

  def show
    highway = Highway.find(params[:id])
    render json: highway
  end
  
  def create
    highway = Highway.create!(highway_params)
    render json: highway, status: :created
  end

  def update
    highway = Highway.find(params[:id])
    highway.update!(highway_params)
    render json: highway, status: :created
  end

  def delete
    highway = Highway.find(params[:id])
    highway.destroy
    head :ok
  end

  private

  def highway_params
    params.permit(:name)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
