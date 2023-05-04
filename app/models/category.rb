class Category < ApplicationRecord

  validates :name, uniqueness: true

  has_many :listings
  has_many :users, through: :listings

end