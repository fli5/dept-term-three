class SearchController < ApplicationController
  def index
    @query = params[:q]
    @category = params[:category]

    if @query.present?
      case @category
      when "city"
        @results = City.where("city_name LIKE ?", "%#{@query}%").page(params[:page])
        @result_type = "Cities"
      when "climate"
        @results = ClimateZone.where("zone_name LIKE ?", "%#{@query}%").page(params[:page])
        @result_type = "Climate Zones"
      when "weather"
        @results = WeatherCondition.where("condition_name LIKE ?", "%#{@query}%").page(params[:page])
        @result_type = "Weather Conditions"
      else
        # Search all models
        @cities = City.where("city_name LIKE ?", "%#{@query}%").page(params[:page])
        @climate_zones = ClimateZone.where("zone_name LIKE ?", "%#{@query}%").page(params[:page])
        @weather_conditions = WeatherCondition.where("condition_name LIKE ?", "%#{@query}%").page(params[:page])
      end
    end
  end
end
