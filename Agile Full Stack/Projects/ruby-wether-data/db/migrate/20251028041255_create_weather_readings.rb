class CreateWeatherReadings < ActiveRecord::Migration[8.0]
  def change
    create_table :weather_readings do |t|
      t.references :city, null: false, foreign_key: true
      t.references :weather_condition, null: false, foreign_key: true
      t.decimal :temp_day
      t.decimal :temp_min
      t.decimal :temp_max
      t.decimal :wind_speed
      t.integer :humidity
      t.datetime :recorded_at

      t.timestamps
    end
  end
end
