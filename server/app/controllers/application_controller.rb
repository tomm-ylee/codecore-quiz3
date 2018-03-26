class ApplicationController < ActionController::API
  skip_before_action :verify_authenticity_token

  private

  def current_user
    token = request.headers["AUTHORIZATION"]
    begin
      payload = JWT.decode(token, Rails.application.secrets.secret_key_base)&.first
      @user ||= User.find_by(id: payload["id"])
    rescue JWT::DecodeError => error
      nil
    end
  end

  helper_method :current_user


  def authenticate_user!
    unless current_user.present?
      render(
        json: { errors: [{ type: "Unauthorized" }] }, status: :unauthorized
      )
    end
  end

  def encode_token(payload = {})
    JWT.encode(payload, Rails.application.secrets.secret_key_base);
  end

end
