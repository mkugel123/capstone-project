class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :reststop_id, :content, :title, :rating
end
