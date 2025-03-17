import { defineComponent, onUnmounted, onMounted, ref } from 'vue'

const getCurrentTime = () => {

  const timeFormatter = Intl.DateTimeFormat(navigator.language, {
    timeStyle: "medium",
  })
  return timeFormatter.format(Date.now())
}

export default defineComponent({
  name: 'UiClock',

  setup() {
    let intervalId;
    const currentTime = ref(getCurrentTime());

    onMounted(() => {
      intervalId = setInterval(() => currentTime.value = getCurrentTime(), 1000)
    })

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    return {
      currentTime
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
