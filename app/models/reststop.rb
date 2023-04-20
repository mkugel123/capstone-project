class Reststop < ApplicationRecord

  validates :highway_id, :has_gas, :has_restroom, :has_store, :nearest_exit, presence: true


  has_many :reviews
  has_many :users, through: :reviews
  belongs_to :highway
  
end
