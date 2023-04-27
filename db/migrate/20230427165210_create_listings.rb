class CreateListings < ActiveRecord::Migration[6.1]
  def change
    create_table :listings do |t|
      t.string :title
      t.string :image
      t.string :content
      t.integer :price
      t.integer :user_id
      t.integer :category_id

      t.timestamps
    end
  end
end
