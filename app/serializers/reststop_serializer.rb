class ReststopSerializer < ActiveModel::Serializer
  attributes :id, :has_gas, :has_restroom, :has_store, :rating, :nearest_exit, :confirmations

  belongs_to :highway
end
