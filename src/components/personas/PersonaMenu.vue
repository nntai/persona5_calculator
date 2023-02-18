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
    <menu-item
      appearance-none
      title="Highlight best personas at level:"
      :model-value="personasStore.highlightBestPersonaStatAtLevel"
      type="number"
      @update:model-value="setHighlightBestPersonasLevel"
    />
    <menu-item
      title=" Highlight best personas at their level"
      :model-value="personasStore.highlightBestPersonaStatAtTheirLevel"
      type="checkbox"
      @click="personasStore.toggleBestPersonaAtTheirLevel"
    />
  </div>
</template>
<script setup lang="ts">
import { usePersonasStore } from '~/pinia/personas';

const personasStore = usePersonasStore();
const setHighlightBestPersonasLevel = (value: number) => {
  personasStore.setHighlightBestPersonasLevel(value);
};
</script>
<style lang="scss" scoped>

</style>
