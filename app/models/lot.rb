class Lot < ActiveRecord::Base
	has_one :user
	has_one :categorie
	belongs_to :parent, :class_name => 'Lot'
	has_many :children, :class_name => 'Lot', :foreign_key => 'parent_id'
end
