import { defineComponent } from "vue";
import './WeatherApp.css'
import UiDetailItem from "./UiDetailItem";



export default defineComponent({
    name: 'UiDetailsList',
    components: {
      UiDetailItem
    },
    props: {
        listData: {
            required: true,
            type: Array,
        }
    },

    template: `<div>
            <UiDetailItem class="weather-details__item" v-for="item in listData" :label="item.label" :detailValue="String(item.value)" />
          </div>`
})