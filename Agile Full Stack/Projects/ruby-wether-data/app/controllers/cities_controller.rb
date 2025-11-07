class CitiesController < ApplicationController
  def index
    @cities = City.includes(:climate_zones).page(params[:page])
  end

  def show
    @city = City.includes(:climate_zones, :weather_readings).find(params[:id])
    @recent_readings = @city.weather_readings.includes(:weather_condition).recent.limit(10)
  end

  def readings
    @city = City.find(params[:id])
    @weather_readings = @city.weather_readings.includes(:weather_condition).recent.page(params[:page])
    render "readings/index"
  end


end
