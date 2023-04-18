class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :userId, :reststopId, :content, :title, :rating
end
