class RenameClimateZoneIdToZoneIdInCityClimates < ActiveRecord::Migration[7.0]
  def change
    remove_foreign_key :city_climates, :climate_zones
    rename_column :city_climates, :climate_zone_id, :zone_id
    add_foreign_key :city_climates, :climate_zones, column: :zone_id
  end
end
