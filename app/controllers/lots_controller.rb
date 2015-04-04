class LotsController < ApplicationController
	def show
		@lot = Lot.where(id: params[:id]).first
		if !@lot
			@lots = Lot.where(user_id: current_user.id)
			render 'index'
		end
    
    @profits = 0
    if @lot.price_sold
      @profits = @lot.price_sold - @lot.price_buy
    end
    #Check the profit of children
    Lot.where(user_id: current_user.id).each do |l|
      if l.parent_id == @lot.id
        @profits += l.price_sold
      end
    end
	end	
	
	def search
		@lots = Lot.search(params[:search], current_user.id)
		render '_search_results'
	end

	def index
		@lots = Lot.where(user_id: current_user.id)
    @profit = 0
    @lots.each do |lot|
      if lot.price_sold != 0
        @profit += lot.price_sold - lot.price_buy
      end
    end
	end

	def new
		@parentLot = Lot.new
		@categorie = Categorie.new
		@categories = Categorie.all
		@lot = Lot.new
	end
	
	def addChild
		@parentLot = Lot.find(params[:id])
		@lot = Lot.new
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

	def edit
		@lot = Lot.find(params[:id])
		if @lot.parent_id
			@parentLot = Lot.find(@lot.parent_id)
		else
			@parentLot = Lot.new
		end
		@categorie = Categorie.new
		@categories = Categorie.all
	end

	def update
		@lot = Lot.find(params[:id])
		if @lot.update(get_params)
			redirect_to @lot
		else
			render 'edit'
		end
	end

	def destroy
		@lot = Lot.find(params[:id])
		@lots = Lot.where(parent_id: @lot.id)
		@lots.each do |l|
			l.destroy
		end
		@lot.destroy
		redirect_to lots_path
	end

  def values
		@Lots = Lot.where(user_id: current_user.id)
    @Categories = Categorie.all;
    render json: [@Lots,@Categories]
  end
  
	private
	def get_params
		params[:lot].permit(:name,:description,:date_buy,:date_sold,:price_buy,:price_sold,:price_estimated,:categorie_id,:parent_id,:user_id,:created_at)
	end
end