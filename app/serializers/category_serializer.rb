class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :listings
  has_many :users, through: :listings
end
