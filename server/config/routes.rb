Rails.application.routes.draw do
  namespace :v1 do
    resources :users, only: [:create]
    resources :tokens, only: [:create, :destroy]
    resources :auctions, only: [:create, :show, :index, :destroy, :update], shallow: true do
      resources :bids, only: [:create, :destroy]
    end
  end
end
