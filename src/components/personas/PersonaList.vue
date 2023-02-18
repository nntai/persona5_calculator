<template>
  <PersonaTable
    :personas="personas"
    :highlight-best-persona-stat-at-level="personasStore.highlightBestPersonaStatAtLevel"
    :highlight-best-persona-stat-at-their-level="personasStore.highlightBestPersonaStatAtTheirLevel"
  />
</template>
<script setup lang="ts">
import { Ref } from 'vue';
import { usePersonasStore } from '~/pinia/personas';
import { FullPersonaData } from '~/calculators/data';
import { calculateFullPersonaList } from '~/calculators/src/DataUtil';

const personas: Ref<FullPersonaData[]> = ref(calculateFullPersonaList());
const personasStore = usePersonasStore();
</script>