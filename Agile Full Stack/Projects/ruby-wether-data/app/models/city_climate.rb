class CityClimate < ApplicationRecord
  belongs_to :city
  belongs_to :climate_zone, foreign_key: "zone_id"

  validates :city_id, uniqueness: { scope: :climate_zone_id }
end
