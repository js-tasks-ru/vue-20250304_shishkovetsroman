import { defineComponent } from "vue";
import './WeatherApp.css'
import WeatherListItem from "./WeatherListItem.js";



export default defineComponent({
  name: 'WeatherList',
  components: {
    WeatherListItem
  },
  props: {
    weatherData: {
      required: true,
      type: Array,
    }
  },

  template: `<ul class="weather-list unstyled-list">
        <WeatherListItem v-for="weatherItem in weatherData" :key="weatherItem.geographic_name" :weather-item-data="weatherItem" />
      </ul>`
})