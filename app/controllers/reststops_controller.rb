class ReststopsController < ApplicationController

  skip_before_action :authorized, only: [:index, :create]

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response

  def index
    if params[:highway_id]
      highway = Highway.find(params[:highway_id])
      reststops = highway.reststops
    else
      reststops = Reststop.all
    end
      render json: reststops
  end

  def show
    reststop = Reststop.find(params[:id])
    render json: reststop
  end
  
  def create
    reststop = Reststop.create!(reststop_params)
    render json: reststop, status: :created
  end

  def update
    reststop = Reststop.find(params[:id])
    reststop.update!(reststop_params)
    render json: reststop, status: :created
  end

  def destroy
    reststop = Reststop.find(params[:id])
    if reststop[:confirmations] > 1
      render json: { errors: ["This reststop has been confirmed by other users"] }, status: :unprocessable_entity
    else
      render json: reststop, status: :ok
      reststop.delete
    end
  end

  private

  def reststop_params
    params.permit(:highway_id, :has_gas, :has_restroom, :has_store, :rating, :nearest_exit, :confirmations)
  end

  def render_record_not_found_response
    render json: { errors: ["Reststop not found"]}, status: :not_found
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
