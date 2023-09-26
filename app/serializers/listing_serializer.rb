class ListingSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :content, :price, :category_id, :image_file

  belongs_to :category
  belongs_to :user
end
