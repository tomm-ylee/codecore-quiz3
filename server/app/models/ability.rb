class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)

    if user.admin?
      can :manage, :all
    else
      can :read, :all
    end

    can :manage, Auction do |auction|
      auction.user == user
    end

    can :create, Bid do |bid|
      bid.auction.user != user
    end

    can :destroy, Bid do |bid|
      bid.user == user
    end
  end
end
