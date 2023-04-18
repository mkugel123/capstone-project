class CreateReststops < ActiveRecord::Migration[6.1]
  def change
    create_table :reststops do |t|
      t.integer :highwayId
      t.boolean :hasGas
      t.boolean :hasRestroom
      t.boolean :hasStore
      t.float :rating
      t.string :nearestExit

      t.timestamps
    end
  end
end
