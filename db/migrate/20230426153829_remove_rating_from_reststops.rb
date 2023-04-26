class RemoveRatingFromReststops < ActiveRecord::Migration[6.1]
  def change
    remove_column :reststops, :rating
  end
end
