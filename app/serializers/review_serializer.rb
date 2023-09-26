class ReviewSerializer < ActiveModel::Serializer
  attributes :content, :item, :signature, :user_id

  belongs_to :user
end
