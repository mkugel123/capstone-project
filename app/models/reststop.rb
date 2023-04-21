class Reststop < ApplicationRecord

  validates :highway_id, :nearest_exit, presence: true
  validates :has_gas, :has_restroom, :has_store, inclusion: [true, false]



  has_many :reviews
  has_many :users, through: :reviews
  belongs_to :highway
  
end
