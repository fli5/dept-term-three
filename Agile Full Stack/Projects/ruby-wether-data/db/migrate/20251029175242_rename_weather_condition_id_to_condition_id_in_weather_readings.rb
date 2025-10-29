class RenameWeatherConditionIdToConditionIdInWeatherReadings < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :weather_readings, :weather_conditions
    rename_column :weather_readings, :weather_condition_id, :condition_id
    add_foreign_key :weather_readings, :weather_conditions, column: :condition_id
  end
end
