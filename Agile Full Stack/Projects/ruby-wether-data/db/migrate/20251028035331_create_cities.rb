class CreateCities < ActiveRecord::Migration[8.0]
  def change
    create_table :cities do |t|
      t.string :city_name
      t.string :country_name
      t.decimal :coord_lon
      t.decimal :coord_lat

      t.timestamps
    end
  end
end
