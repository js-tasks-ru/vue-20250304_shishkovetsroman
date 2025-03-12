import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0);
    const secondOperand = ref(0);
    const currentOperator = ref('sum');

    const result = computed(() => {
      switch (currentOperator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value;
        case 'subtract':
          return firstOperand.value - secondOperand.value;
        case 'multiply':
          return firstOperand.value * secondOperand.value;
        case 'divide':
          return firstOperand.value / secondOperand.value;
      }
    })


    return {
      firstOperand,
      secondOperand,
      result,
      currentOperator
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="currentOperator" />➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="currentOperator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="currentOperator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="currentOperator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand" />
      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
