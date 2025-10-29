class CreateWeatherConditions < ActiveRecord::Migration[8.0]
  def change
    create_table :weather_conditions do |t|
      t.string :condition_code
      t.string :condition_name
      t.text :condition_desc
      t.string :condition_icon

      t.timestamps
    end
  end
end
