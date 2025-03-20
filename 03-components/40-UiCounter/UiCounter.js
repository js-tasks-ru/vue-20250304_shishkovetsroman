import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',


  components: {
    UiButton,
  },
  props: {
    count: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },


  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    function increment() {
      emit('update:count', props.count + 1)
    }
    
    function decrement() {
      emit('update:count', props.count - 1)
    }
    return {
      decrement,
      increment
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count == min" @click="decrement">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="count == max" @click="increment">➕</UiButton>
    </div>
  `,
})
