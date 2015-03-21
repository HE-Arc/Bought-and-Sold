class CreateLots < ActiveRecord::Migration
  def change
    create_table :lots do |t|
      t.string :name
      t.text :description
      t.float :price_buy
      t.float :price_sold
      t.float :price_estimated
      t.datetime :date_buy
      t.datetime :date_sold
      t.datetime :created_at
      t.integer :user_id
      t.integer :parent_id
    end
  end
end
