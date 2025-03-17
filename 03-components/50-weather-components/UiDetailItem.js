import { defineComponent } from "vue";
import './WeatherApp.css'

export default defineComponent({
    name: 'UiDetailItem',

    props: {
        label: {
            required: true,
            type: String,
        },
        detailValue: {
            required: true,
            type: String
        }
    },

    template: `
            <div>
              <div class="weather-details__item-label">{{ label }}.</div>
              <div class="weather-details__item-value">{{ detailValue }}</div>
            </div>`
})