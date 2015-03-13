class UsersController < ApplicationController
	def index
			@users = User.all
  end
	private
    def get_params
			params[:post].permit(:email,:password,:password_confirmation,:remember_me,:firstname)
    end
end