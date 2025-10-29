class ConditionsController < ApplicationController
  def index
    @weather_conditions = WeatherCondition.all.page(params[:page])
  end

  def show
    @weather_condition = WeatherCondition.find(params[:id])
    @readings = @weather_condition.weather_readings.includes(:city).order(recorded_at: :desc).page(params[:page])
  end

  def readings
    @weather_condition = WeatherCondition.find(params[:id])
    @weather_readings = @weather_condition.weather_readings.includes(:city).order(recorded_at: :desc).page(params[:page])
    render "readings/index"
  end
end
