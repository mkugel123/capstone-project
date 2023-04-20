class Highway < ApplicationRecord

  validates :name, presence: true

  has_many :reststops
end
