import { defineComponent } from "vue";
import './WeatherApp.css'
import UiAlert from "./UiAlert.js";
import WeatherListItem from "./WeatherListItem.js";


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
  name: 'WeatherList',
  components: {
    UiAlert, WeatherListItem
  },
  props: {
    weatherData: {
      required: true,
      type: Array,
    }
  },
  setup() {
    return {
      isNightNow
    }
  },
  template: `<ul>
        <WeatherListItem v-for="weatherItem in weatherData" :key="weatherItem.geographic_name" :weather-item-data="weatherItem" class="weather-card" :class="{'weather-card--night': isNightNow(weatherItem.current.dt, weatherItem.current.sunrise, weatherItem.current.sunset) }">
          <UiAlert v-if="weatherItem.alert" class="weather-alert" alert-icon="⚠️" :alert-sender="weatherItem.alert.sender_name" :alert-description="weatherItem.alert.description" />
        </WeatherListItem>
      </ul>`
})