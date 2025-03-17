import { computed, defineComponent } from "vue";
import './WeatherApp.css'
import { WeatherConditionIcons } from './weather.service.ts'
import UiDetailsList from "./UiDetailsList.js";

const FREEZING_POINT = 273.15;
const HPA_VALUE = 0.75;


function getWeatherIcon(id) {
  return WeatherConditionIcons[id]
}

const formatKelvinToCelsius = (temperature) => (+temperature - FREEZING_POINT).toFixed(1)
const formatPressure = (pressure) => (pressure * HPA_VALUE).toFixed(0)



export default defineComponent({
  name: 'WeatherListItem',
  components: {
    UiDetailsList
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
      weatherDetails
    }
  },
  template: `
        <li>
          <slot></slot>
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