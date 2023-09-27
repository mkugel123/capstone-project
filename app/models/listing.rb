class Listing < ApplicationRecord

  validates :title, :image, presence: true
  validates :content, length: { maximum: 255}
  validates :price, numericality: { only_integer: true }

  belongs_to :category
  belongs_to :user

end
