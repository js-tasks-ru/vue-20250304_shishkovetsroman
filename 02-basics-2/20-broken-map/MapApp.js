import { defineComponent, ref, } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    const x = ref(0)
    const y = ref(0)

    function handleClick(event) {
      x.value = event.offsetX
      y.value = event.offsetY
    }

    return {
      x,
      y,
      handleClick,
    };
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false"  />
      <span class="pin" :style="{ left:x + 'px', top: y + 'px'}">📍</span>
    </div>`,
})
