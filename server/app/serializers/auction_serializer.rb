class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :end_date, :reserve_price, :seller_username
  def seller_username
    object.user&.username
  end

  belongs_to :user
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :username
  end

  has_many :bids
  def bids
    object.bids.order(:bid_price)
  end
  class BidSerializer < ActiveModel::Serializer
    attributes :id, :bid_price, :created_at, :bidder_username
    def bidder_username
      object.user&.username
    end
  end
end
