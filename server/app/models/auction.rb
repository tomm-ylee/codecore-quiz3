class Auction < ApplicationRecord
  belongs_to :user
  has_many :bids, dependent: :destroy

  validates :title, :details, :end_date, :reserve_price, presence: true
end
