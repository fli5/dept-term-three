class ClimateZone < ApplicationRecord
  has_many :city_climates, foreign_key: "zone_id", dependent: :destroy
  has_many :cities, through: :city_climates

  validates :zone_name, presence: true
  validates :zone_code, presence: true, uniqueness: true
end
