class ReadingsController < ApplicationController
  def index
    @weather_readings = WeatherReading.includes(:city, :weather_condition).recent.page(params[:page])
  end

  def show
    @weather_reading = WeatherReading.includes(:city, :weather_condition).find(params[:id])
  end
end
