class CreateAuctions < ActiveRecord::Migration[5.1]
  def change
    create_table :auctions do |t|
      t.string :title
      t.string :details
      t.datetime :end_date
      t.float :reserve_price
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
