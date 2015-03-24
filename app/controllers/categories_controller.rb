class CategoriesController < ApplicationController
	def index
		@categories = Categorie.all
		@categorie = Categorie.new
	end

	def create 
		@categorie = Categorie.new(get_params)
		@categories = Categorie.all
		if @categorie.name.blank?
			render 'index'
		else
			@categorie.name = @categorie.name.downcase
			if Categorie.exists?(:name => @categorie.name)
				render 'index'
			else
				@categorie.save
				render 'index'
			end
		end
	end
	
	def update
		@categorie = Categorie.new(get_params)
		@categories = Categorie.all
		render 'index'
	end
	
	def show
	end

	private
	def get_params
		params[:categorie].permit(:name)
	end
end