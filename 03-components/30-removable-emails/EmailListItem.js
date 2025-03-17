import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailListItem',
  emits: ['delete'],
  props: {
    email: {
      type: String,
      required: true,
    },
    marked: {
      type: Boolean,
      default: false,
    },
  },
  

  template: `
    <li :class="{ marked }">
      {{ email }}
      <button type="button" aria-label="Удалить" @click="$emit('delete')">❌</button>
    </li>
  `,
})
