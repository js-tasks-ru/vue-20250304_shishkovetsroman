import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

const FREEZING_POINT = 273.15;
const HPA_VALUE = 0.75;


function getWeatherIcon(id) {
  return WeatherConditionIcons[id]
}

const formatKelvinToCelsius = (temperature) => (+temperature - FREEZING_POINT).toFixed(1)

const formatPressure = (pressure) => (pressure * HPA_VALUE).toFixed(0)

const isNightNow = (currentTime, sunriseTime, sunsetTime) => {
  const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  const [sunriseHours, sunriseMinutes] = sunriseTime.split(':').map(Number);
  const [sunsetHours, sunsetMinutes] = sunsetTime.split(':').map(Number);

  const currentDate = new Date();
  currentDate.setHours(currentHours, currentMinutes, 0, 0);

  const sunriseDate = new Date();
  sunriseDate.setHours(sunriseHours, sunriseMinutes, 0, 0);

  const sunsetDate = new Date();
  sunsetDate.setHours(sunsetHours, sunsetMinutes, 0, 0);

  if (currentDate >= sunriseDate && currentDate < sunsetDate) return false

  return true
}

export default defineComponent({
  name: 'WeatherApp',
  setup() {

    return {
      weatherData: getWeatherData(),
      getWeatherIcon: getWeatherIcon,
      formatKelvinToCelsius: formatKelvinToCelsius,
      formatPressure: formatPressure,
      isNightNow: isNightNow
    }
  },
  template: `
    <div>

      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherItem in weatherData" class="weather-card" :class="{'weather-card--night': isNightNow(weatherItem.current.dt, weatherItem.current.sunrise, weatherItem.current.sunset) }">
          <div v-if="weatherItem.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherItem.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherItem.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">{{ getWeatherIcon([weatherItem.current.weather.id]) }} </div>
            <div class="weather-conditions__temp">{{ formatKelvinToCelsius(weatherItem.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ formatPressure(weatherItem.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherItem.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
