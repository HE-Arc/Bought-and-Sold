class CategoriesController < ApplicationController
	def index
		@categories = Categorie.all
		@categorie = Categorie.new
	end

	def create 
		@categorie = Categorie.new(get_params)
		@categories = Categorie.all
		@lots = Lot.all
		if @categorie.name.blank?
			render 'lots/index'
		else
			@categorie.name = @categorie.name.downcase
			if Categorie.exists?(:name => @categorie.name)
				render 'lots/index'
			else
				@categorie.save
				render 'lots/index'
			end
		end
	end
	
	def update
		@categorie = Categorie.new(get_params)
		@categories = Categorie.all
		render 'index'
	end
	
	def show
		@categorie = Categorie.where(id: params[:id]).first
		if !@categorie
			@categories = Categorie.all
			render 'index'
		else
			@lots = Lot.where(categorie_id: @categorie.id, user_id: current_user.id)
		end

	end

	private
	def get_params
		params[:categorie].permit(:name)
	end
end