import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const MIN_VALUE = 0;
    const MAX_VALUE = 5;

    const counter = ref(0);

    function incrementValue() {

      if (counter.value < MAX_VALUE) counter.value++
    }
    function decrementValue() {
      if (counter.value > MIN_VALUE) counter.value--
    }

    return {
      counter,
      incrementValue,
      decrementValue,
      MAX_VALUE,
      MIN_VALUE
    }
  },

  template: `
    <div class="counter">
      <button @click="decrementValue"
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter == MIN_VALUE"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button @click="incrementValue"
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter == MAX_VALUE"
      >➕</button>
    </div>
  `,
})
