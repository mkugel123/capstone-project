class User < ApplicationRecord

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :password, length: { in: 6..20 }

  has_secure_password
  has_many :listings
  has_many :users, through: :listings

end
