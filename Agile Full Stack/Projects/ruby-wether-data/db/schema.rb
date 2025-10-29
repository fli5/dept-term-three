# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_29_175242) do
  create_table "cities", force: :cascade do |t|
    t.string "city_name"
    t.string "country_name"
    t.decimal "coord_lon"
    t.decimal "coord_lat"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "city_climates", force: :cascade do |t|
    t.integer "city_id", null: false
    t.integer "zone_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_city_climates_on_city_id"
    t.index ["zone_id"], name: "index_city_climates_on_zone_id"
  end

  create_table "climate_zones", force: :cascade do |t|
    t.string "zone_name"
    t.text "zone_desc"
    t.string "zone_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weather_conditions", force: :cascade do |t|
    t.string "condition_code"
    t.string "condition_name"
    t.text "condition_desc"
    t.string "condition_icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "weather_readings", force: :cascade do |t|
    t.integer "city_id", null: false
    t.integer "condition_id", null: false
    t.decimal "temp_day"
    t.decimal "temp_min"
    t.decimal "temp_max"
    t.decimal "wind_speed"
    t.integer "humidity"
    t.datetime "recorded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["city_id"], name: "index_weather_readings_on_city_id"
    t.index ["condition_id"], name: "index_weather_readings_on_condition_id"
  end

  add_foreign_key "city_climates", "cities"
  add_foreign_key "city_climates", "climate_zones", column: "zone_id"
  add_foreign_key "weather_readings", "cities"
  add_foreign_key "weather_readings", "weather_conditions", column: "condition_id"
end
