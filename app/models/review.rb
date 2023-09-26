class Review < ApplicationRecord

  validates :item, :signature, presence: true
  validates :content, length: { maximum: 255}

  belongs_to :user
end
