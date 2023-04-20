class CreateReststops < ActiveRecord::Migration[6.1]
  def change
    create_table :reststops do |t|
      t.integer :highway_id
      t.boolean :has_gas
      t.boolean :has_restroom
      t.boolean :has_store
      t.float :rating
      t.string :nearest_exit

      t.timestamps
    end
  end
end
