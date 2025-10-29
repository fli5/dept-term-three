# ============================================
# WEATHER IMPORT SCRIPT (已有 weather_conditions, SSL处理)
# ============================================

require 'net/http'
require 'json'
require 'openssl'

puts "\n🌤 Importing 16-day weather forecast for cities..."

API_KEY = "4b2047652a8cb49876e5a83394ffe24f"
BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=16&appid=#{API_KEY}"

# 清空表
WeatherReading.delete_all
ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='weather_readings'")

City.find_each do |city|
  lat = city.coord_lat
  lon = city.coord_lon

  next unless lat && lon

  url = "#{BASE_URL}&lat=#{lat}&lon=#{lon}"
  uri = URI(url)

  begin
    # 使用 Net::HTTP 手动处理 SSL
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE # 开发/测试可用，生产建议使用 VERIFY_PEER

    request = Net::HTTP::Get.new(uri)
    response = http.request(request)

    unless response.is_a?(Net::HTTPSuccess)
      puts "⚠️  API returned #{response.code} for city #{city.city_name}"
      next
    end

    data = JSON.parse(response.body)
    daily_forecasts = data["list"]
    unless daily_forecasts.is_a?(Array)
      puts "⚠️  No daily forecast for city #{city.city_name}"
      next
    end

    daily_forecasts.each do |day|
      recorded_at = Time.at(day["dt"]).to_datetime
      temp_day = day.dig("temp", "day")
      temp_min = day.dig("temp", "min")
      temp_max = day.dig("temp", "max")
      wind_speed = day["speed"]
      humidity = day["humidity"]

      # 使用 weather[0]["id"] 查找已存在的 weather_condition
      weather_id = day.dig("weather", 0, "id") || 0
      weather_condition = WeatherCondition.find_by(condition_code: weather_id)

      unless weather_condition
        puts "⚠️  WeatherCondition with code #{weather_id} not found, skipping"
        next
      end

      # 避免重复记录
      next if WeatherReading.exists?(city_id: city.id, recorded_at: recorded_at)

      WeatherReading.create!(
        city_id: city.id,
        weather_condition_id: weather_condition.id,
        temp_day: temp_day,
        temp_max: temp_max,
        temp_min: temp_min,
        wind_speed: wind_speed,
        humidity: humidity,
        recorded_at: recorded_at
      )
    end

    puts "✅ Imported 16-day forecast for #{city.city_name}"
    sleep(1) # 控制 API 请求速率

  rescue OpenSSL::SSL::SSLError => e
    puts "⚠️ SSL error for city #{city.city_name}: #{e.message}"
    next
  rescue JSON::ParserError => e
    puts "⚠️ Failed to parse JSON for city #{city.city_name}: #{e.message}"
    next
  rescue => e
    puts "⚠️ API request failed for city #{city.city_name}: #{e.message}"
    next
  end
end

puts "🌤 Weather import completed!"
