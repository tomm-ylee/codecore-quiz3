class V1::BidsController <
  before_action :authorize_user!

  def create
    bid_params = params.require(:bid).permit(:bid_price)
    bid = Bid.new bid_params

    bid.save

    render json: bid
  end

  def destroy
    bid = Bid.find params[:id]
  end
end
