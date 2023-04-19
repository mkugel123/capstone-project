class User < ApplicationRecord
  validates :username, presence: true
  validates :username, uniqueness: true

  has_secure_password
  has_many :reviews
  has_many :reststops, through: :reviews
end
