class ChangeDateFormatLots < ActiveRecord::Migration
	def up
		change_column :lots, :date_buy, :date
		change_column :lots, :date_sold, :date
	end

	def down
		change_column :lots, :date_buy, :datetime
		change_column :lots, :date_sold, :datetime
	end
end
