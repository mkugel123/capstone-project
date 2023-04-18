class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.integer :userId
      t.integer :reststopId
      t.text :content
      t.string :title
      t.integer :rating

      t.timestamps
    end
  end
end
