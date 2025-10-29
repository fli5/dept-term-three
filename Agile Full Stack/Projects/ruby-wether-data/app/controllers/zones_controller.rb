class ZonesController < ApplicationController
  def index
    @climate_zones = ClimateZone.all.page(params[:page])
  end

  def show
    @climate_zone = ClimateZone.find(params[:id])
    @cities = @climate_zone.cities.page(params[:page])
  end

  def cities
    @climate_zone = ClimateZone.find(params[:id])
    @cities = @climate_zone.cities.page(params[:page])
    render "cities/index"
  end
end
