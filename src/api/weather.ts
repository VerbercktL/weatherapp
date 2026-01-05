import { fetchWeatherApi } from "openmeteo";

const params = {
  latitude: 51.2205,
  longitude: 4.4003,
  daily: [
    "sunrise",
    "sunset",
    "temperature_2m_max",
    "temperature_2m_min",
    "rain_sum",
    "snowfall_sum",
    "uv_index_max",
  ],
  timezone: "Europe/Berlin",
  forecast_days: 5,
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
  `\nCoordinates: ${latitude}°N ${longitude}°E`,
  `\nElevation: ${elevation}m asl`,
  `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
  `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
);

const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(0)!;
const sunset = daily.variables(1)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
export const weatherData = {
  daily: {
    time: Array.from(
      {
        length:
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
      },
      (_, i) =>
        new Date(
          (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
            1000
        )
    ),
    // Map Int64 values to according structure
    sunrise: [...Array(sunrise.valuesInt64Length())].map(
      (_, i) =>
        new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
    ),
    // Map Int64 values to according structure
    sunset: [...Array(sunset.valuesInt64Length())].map(
      (_, i) =>
        new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
    ),
    temperature_2m_max: daily.variables(2)!.valuesArray(),
    temperature_2m_min: daily.variables(3)!.valuesArray(),
    rain_sum: daily.variables(5)!.valuesArray(),
    snowfall_sum: daily.variables(6)!.valuesArray(),
    uv_index_max: daily.variables(7)!.valuesArray(),
  },
};

// The 'weatherData' object now contains a simple structure, with arrays of datetimes and weather information
console.log("\nDaily data:\n", weatherData.daily);
