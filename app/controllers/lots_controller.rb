class LotsController < ApplicationController
	def show
		@lot = Lot.find(params[:id])
	end	
	def index
		@lots = Lot.all
	end
	private
	def get_params
		params[:post].permit(:name,:description,:date_buy,:date_sold,:price_buy,:price_sold,:price_estimated)
	end
end