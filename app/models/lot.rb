class Lot < ActiveRecord::Base
	has_one :user
	has_one :categorie
	belongs_to :parent, :class_name => 'Lot'
	has_many :children, :class_name => 'Lot', :foreign_key => 'parent_id'
	after_initialize :init

	def init
		self.price_buy ||= 0 
		self.price_sold ||= 0
	end
	def self.search(search,userID)
		search_condition = "%" + search + "%"
		@lots = Lot.where("name LIKE :search and user_id = :userID",{:search => search_condition,:userID => userID})
		return @lots
	end
end
