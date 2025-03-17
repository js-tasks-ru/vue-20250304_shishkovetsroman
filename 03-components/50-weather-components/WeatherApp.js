import { defineComponent, ref } from 'vue'
import { getWeatherData, } from './weather.service.ts'
import './WeatherApp.css'
import WeatherList from './WeatherList.js';


export default defineComponent({
  name: 'WeatherApp',
  components: {
    WeatherList
  },
  setup() {
    const weatherData = ref(getWeatherData())
    return {
      weatherData
    }
  },
  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <WeatherList class="weather-list unstyled-list" :weather-data="weatherData" />
    </div>
  `,
})
