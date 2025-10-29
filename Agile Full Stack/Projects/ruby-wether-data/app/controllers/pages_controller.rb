class PagesController < ApplicationController
  def home
    @recent_readings = WeatherReading.includes(:city, :weather_condition).order(recorded_at: :desc).limit(10)
    @total_cities = City.count
    @total_zones = ClimateZone.count
    @total_readings = WeatherReading.count
  end

  def about
  end
end
