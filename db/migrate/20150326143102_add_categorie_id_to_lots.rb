class AddCategorieIdToLots < ActiveRecord::Migration
  def change
    add_column :lots, :categorie_id, :integer
  end
end
