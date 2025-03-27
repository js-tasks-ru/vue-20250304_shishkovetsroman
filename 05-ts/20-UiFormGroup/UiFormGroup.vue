<script setup lang="ts">
import type { Slot } from 'vue'

const props = defineProps<{
  for?: string
  label?: string
  description?: string
  hint?: string
  showHint?: boolean
  invalid?: boolean
}>()

defineSlots<{
  default: Slot
  label: Slot
  description: Slot
}>()
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label :for="props.for" class="form-group__label">
        <template v-if="!$slots.label"> {{ label }} </template>
        <slot name="label"></slot>
      </label>
      <div class="form-group__description">
        <template v-if="!$slots.description"> {{ description }} </template>
        <slot name="description"></slot>
      </div>
    </div>
    <div class="form-group__control">
      <slot name="default"></slot>
    </div>
    <div v-if="hint" class="form-group__hint" :class="{ 'form-group__hint--invalid': invalid }">
      {{ showHint || invalid ? hint : '' }}
    </div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
