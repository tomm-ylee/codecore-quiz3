class AuctionSerializer < ActiveModel::Serializer
  attributes :id, :title, :details, :end_date, :reserve_price

  belongs_to :user, key: :seller
  class UserSerializer < ActiveModel::Serializer
    attributes :id, :username
  end

  has_many :bids
  class BidSerializer < ActiveModel::Serializer
    attributes :id, :bid_price, :bidder_username
    def bidder_username
      object.user&.username
    end
  end
end
