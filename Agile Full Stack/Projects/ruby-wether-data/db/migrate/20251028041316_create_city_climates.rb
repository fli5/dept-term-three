class CreateCityClimates < ActiveRecord::Migration[8.0]
  def change
    create_table :city_climates do |t|
      t.references :city, null: false, foreign_key: true
      t.references :climate_zone, null: false, foreign_key: true

      t.timestamps
    end
  end
end
