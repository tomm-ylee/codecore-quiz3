class V1::UsersController < ApplicationController
  def create
    user_params = params.require(:user).permit(:username, :email, :password, :password_confirmation)
    user = User.new user_params
    if user.save
      render json: {
        jwt: encode_token({
          id: user.id,
          username: user.username
          })
      };
    else
      errors = error.record.errors.map do |field, message|
        {
          type: error.class.to_s,
          record_type: error.record.class.to_s,
          field: field,
          message: message
        }
      end
      render(
        json: { errors: errors }, status: :unprocessable_entity
      )
    end
  end

end
