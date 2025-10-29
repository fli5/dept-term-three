class WeatherReading < ApplicationRecord
  belongs_to :city
  belongs_to :weather_condition, foreign_key: "condition_id"

  validates :recorded_at, presence: true
  validates :temp_day, :temp_min, :temp_max, numericality: true, allow_nil: true
  validates :humidity, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }, allow_nil: true
  scope :recent, -> { order(recorded_at: :desc) }
end
