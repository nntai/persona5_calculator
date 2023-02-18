<template>
  <div
    flex
    flex-col
  >
    <div
      font-500
      pb-1
      c-green-5
      text-5
    >
      Features toggle
    </div>
    <div
      font-500
      text-4
      flex
      flex-row
      cursor-pointer
      @click="personasStore.toggleHighlightBestPersonas"
    >
      <div>
        Highlight best personas at level
      </div>
      <input
        type="number"
        ml-1
        border-solid
        border-dark
        border-width-1
        border-rounded
        w-10
        appearance-none
        min="1"
        max="99"
        :value="personasStore.highlightBestPersonasLevel"
        @input="setHighlightBestPersonasLevel"
      >
    </div>
    <div />
  </div>
</template>
<script setup>
import { usePersonasStore } from '~/pinia/personas';

const personasStore = usePersonasStore();
const setHighlightBestPersonasLevel = (event) => {
  personasStore.setHighlightBestPersonasLevel(Number(event.target.value));
};
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
