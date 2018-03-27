class V1::TokensController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      render json: {
        jwt: encode_token({
          id: user.id,
          username: user.username
          })
      };
    else
      render(
        json: { errors: [{type: "NotFound"}] }, status: :not_found
      )
    end
  end

end
