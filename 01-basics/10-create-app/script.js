import { defineComponent, createApp } from 'vue'


function formatToLocaleDate(date) {
    return date.toLocaleDateString("en-EN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

const App = defineComponent({
    name: 'App',
    setup() {
        return {
            currentDate: new Date(),
            formatToLocaleDate: formatToLocaleDate
        }
    },

    template: `Сегодня {{ formatToLocaleDate(currentDate) }}`
})

const app = createApp(App).mount('#app')