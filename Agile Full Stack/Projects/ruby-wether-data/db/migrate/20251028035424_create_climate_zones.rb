class CreateClimateZones < ActiveRecord::Migration[8.0]
  def change
    create_table :climate_zones do |t|
      t.string :zone_name
      t.text :zone_desc
      t.string :zone_code

      t.timestamps
    end
  end
end
