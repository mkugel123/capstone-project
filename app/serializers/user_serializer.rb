class UserSerializer < ActiveModel::Serializer
  attributes :id, :username
  
  has_many :listings
  has_many :reviews
  has_many :categories, through: :listings
end
