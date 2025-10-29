class WeatherCondition < ApplicationRecord
  has_many :weather_readings, foreign_key: "condition_id", dependent: :destroy

  validates :condition_code, presence: true, uniqueness: true
  validates :condition_name, presence: true
end
