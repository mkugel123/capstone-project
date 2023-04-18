class ReststopSerializer < ActiveModel::Serializer
  attributes :id, :highwayId, :hasGas, :hasRestroom, :hasStore, :rating, :nearestExit
end
