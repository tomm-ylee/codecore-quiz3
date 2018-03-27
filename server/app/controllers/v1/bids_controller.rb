class V1::BidsController < ApplicationController
  before_action :authenticate_user!

  def create
    bid_params = params.require(:bid).permit(:bid_price)
    bid = Bid.new bid_params
    bid.user = current_user
    bid.auction = Auction.find params[:auction_id]

    # if can? :create, bid
    if true
      bid.save
      render json: bid.auction
    else
      render(
        json: { errors: [{ type: "Unauthorized" }] }, status: :unauthorized
      )
    end
  end

  def destroy
    bid = Bid.find params[:id]
    # if can? :destroy, bid
    if true
      bid.destroy
      render json: bid
    else
      render(
        json: { errors: [{ type: "Unauthorized" }] }, status: :unauthorized
      )
    end
  end
end
