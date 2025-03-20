import { computed, defineComponent } from "vue";
import './WeatherApp.css'
import { WeatherConditionIcons } from './weather.service.ts'
import UiDetailsList from "./UiDetailsList.js";
import UiAlert from "./UiAlert.js";

const FREEZING_POINT = 273.15;
const HPA_VALUE = 0.75;

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

function getWeatherIcon(id) {
  return WeatherConditionIcons[id]
}

const formatKelvinToCelsius = (temperature) => (+temperature - FREEZING_POINT).toFixed(1)
const formatPressure = (pressure) => (pressure * HPA_VALUE).toFixed(0)



export default defineComponent({
  name: 'WeatherListItem',
  components: {
    UiDetailsList, UiAlert
  },
  props: {
    weatherItemData: {
      required: true,
      type: Object,
    }
  },
  setup(props) {
    const weatherDetails = computed(() => [
      { label: 'Давление, мм рт. ст.', value: formatPressure(props.weatherItemData.current.pressure) },
      { label: 'Влажность, %', value: props.weatherItemData.current.humidity },
      { label: 'Облачность, %', value: props.weatherItemData.current.clouds },
      { label: 'Ветер, м/с', value: props.weatherItemData.current.wind_speed },
    ])
    return {
      getWeatherIcon,
      formatKelvinToCelsius,
      formatPressure,
      weatherDetails,
      isNightNow
    }
  },
  template: `
        <li class="weather-card" :class="{'weather-card--night': isNightNow(weatherItemData.current.dt, weatherItemData.current.sunrise, weatherItemData.current.sunset) }">
          <UiAlert v-if="weatherItemData.alert" class="weather-alert" alert-icon="⚠️" :alert-sender="weatherItemData.alert.sender_name" :alert-description="weatherItemData.alert.description" />

          <div>
            <h2 class="weather-card__name">
              {{ weatherItemData.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherItemData.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherItemData.current.weather.description">{{ getWeatherIcon([weatherItemData.current.weather.id]) }} </div>
            <div class="weather-conditions__temp">{{ formatKelvinToCelsius(weatherItemData.current.temp) }} °C</div>
          </div>
          <UiDetailsList class="weather-details" :list-data="weatherDetails" />
        </li>`
})