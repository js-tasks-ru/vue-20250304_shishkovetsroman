import { defineComponent } from "vue";
import './WeatherApp.css'

export default defineComponent({
    name: 'UiAlert',
    props: {
        alertSender: {
            type: String,
            required: true,
        },
        alertDescription: {
            type: String,
            required: true,
        },
        alertIcon: {
            type: String,
            required: true
        }
    },
    template: `
    <div>
      <span class="weather-alert__icon">{{ alertIcon }}</span>
      <span class="weather-alert__description">{{ alertSender }}: {{ alertDescription }}</span>
    </div>`
})