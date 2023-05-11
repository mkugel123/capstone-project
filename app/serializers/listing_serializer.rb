class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :content, :price, :category_id

  belongs_to :category
  belongs_to :user
end
