class Listing < ApplicationRecord

  validates :title, :image, presence: true
  validates :content, length: { maximum: 255}
  validates :price, numericality: { only_integer: true }

  has_one_attached :image_file


  def image_url
    Rails.application.routes.url_helpers.url_for(product_photo) if product_photo.attached?
  end


  belongs_to :category
  belongs_to :user

end
