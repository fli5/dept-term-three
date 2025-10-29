## Data Sources
### Source 1 - Cities in Canada (JSON)

The SimpleMaps official website provides a full database of cities around world, which includes `country name`,
`city name`, `latitude` and `longitude` info. I will download the city file (CVS) and extract into my project.
https://simplemaps.com/data/canada-cities

FILE: city.list.json
### Source 2 - Climate Classification Data (CSV)
Climate Classification Data is a fundamental resource that divides climate into different types based on characteristics.
I will load the data into my database to classify the cities in climate zone.

FILE: climate_zone.csv
### Source 3 - Weather Condition Data (CSV)
Weather Condition is the basic data of weather conditions, obtained from OpenWeatherMap. I will load the data into my 
database to categorize the weather condition.
https://openweathermap.org/weather-conditions
FILE: weather_condition.csv

### Source 3 - Daily weather data for the next 16 days (JSON)
Fetch the daily weather data for the next 16 days in a city through the API, including temperature (day, morning, night, min and max), 
wind speed, humidity and weather condition.
https://api.openweathermap.org//data/2.5/forecast/daily?lat={latitude}&lon={longitude}&units=metric&cnt=16&appid=4b2047652a8cb49876e5a83394ffe24f
### Source 4 - Classify the city into climate zone
Use `latitude` and `longitude` to classify cities into a climate zone via API
http://climateapi.scottpinkelman.com/api/v1/location/{latitude}/{longitude}
---
## Data Structure
### CITIES Table:
Store information about city
- Fields: city_name, country_name, coord_lat, coord_lon
- Each city can have many weather readings

### WEATHER_READINGS Table:
Store actual weather measurements
- Fields: temp_day, temp_min, temp_max, humidity, wind_speed, recorded_at, city_id
- Belongs to a city
- Belongs to a weather condition

### WEATHER_CONDITIONS Table:
Categorize weather types (Clear, Cloudy, Rain, Snow, etc.)
- Fields: condition_code, condition_name, condition_desc, condition_icon
- Has many weather readings

### CLIMATE_ZONES Table:
Categorize cities by climate type
- Fields: zone_name, zone_desc,zone_code
- Many-to-many with cities
---
## Data Integration
Centered on the city, the weather conditions and climate characteristics are classified by correlating weather data 
such as temperature and humidity
