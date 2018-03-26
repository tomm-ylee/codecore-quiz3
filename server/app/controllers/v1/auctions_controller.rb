class V1::AuctionsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy, :update]
  before_action :find_auction, only: [:show, :destroy, :update]

  def create
    auction = Auction.new auction_params
    auction.user = current_user

    auction.save!

    render json: auction
  end

  def show
    render json: @auction
  end

  def index
    auctions = Auction.order(end_date: :ASC)
    render json: auctions
  end

  def update
    @auction.update! auction_params
    render json: @auction
  end

  def destroy
    @auction.destroy
  end

  private

  def auction_params
    params.require(:auction).permit(:title, :details, :end_date, :reserve_price)
  end

  def find_auction
    @auction = Auction.find params[:id]
  end
end
