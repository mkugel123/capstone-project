class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :content, :price, :user_id, :category_id
end
