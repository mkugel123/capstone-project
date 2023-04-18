class CreateHighways < ActiveRecord::Migration[6.1]
  def change
    create_table :highways do |t|
      t.string :name

      t.timestamps
    end
  end
end
