class LotsController < ApplicationController
	def show
		@lot = Lot.find(params[:id])
	end	

	def index
		@lots = Lot.where(user_id: current_user.id)
	end

	def new
		@categorie = Categorie.new
		@categories = Categorie.all
		@lot = Lot.new
	end

	def edit
		@lot = Lot.find(params[:id])
		@categorie = Categorie.new
		@categories = Categorie.all
	end

	def create 		
		@lot = Lot.new(get_params)
		@lot.user_id = current_user.id
		if @lot.save
			redirect_to @lot
		else
			render 'new'
		end
	end	

	def update
		@lot = Lot.find(params[:id])
		if @lot.update(get_params)
			redirect_to @lot
		else
			render 'edit'
		end
	end

	private
	def get_params
		params[:lot].permit(:name,:description,:date_buy,:date_sold,:price_buy,:price_sold,:price_estimated,:categorie_id,:parent_id,:user_id,:created_at)
	end
end