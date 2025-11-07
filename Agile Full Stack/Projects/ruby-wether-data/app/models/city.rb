class City < ApplicationRecord
  has_many :weather_readings, dependent: :destroy
  has_many :city_climates, dependent: :destroy
  has_many :climate_zones, through: :city_climates

  validates :city_name, presence: true, uniqueness: { case_sensitive: false }
  validates :country_name, presence: true
  validates :coord_lon, :coord_lat, presence: true, numericality: true

  scope :recent, -> { order(created_at: :desc) }

end
