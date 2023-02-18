<template>
  <div
    font-500
    text-4
    flex
    flex-row
    justify-between
    mt-1
    cursor-pointer
    @click="emits('click')"
  >
    <div>
      {{ title }}
    </div>
    <div>
      <input
        :type="type"
        ml-1
        border-solid
        border-dark
        border-width-1
        border-rounded
        w-10
        h-full
        min="1"
        max="99"
        :value="modelValue"
        :class="{'appearance-none': appearanceNone}"
        @input="input"
      >
    </div>
  </div>
</template>
<script setup lang="ts">

defineProps<{
  title: string,
  type: string,
  modelValue: any,
  appearanceNone?: boolean
}>();

const emits = defineEmits(['update:model-value', 'click']);
const input = (event) => {
  emits('update:model-value', event.target.value);
};

</script>
<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input.appearance-none {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
  }
}
</style>