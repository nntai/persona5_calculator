<template>
  <PersonaTable
    :personas="personas"
    :highlight-best-personas-level="personasStore.highlightBestPersonasLevel"
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