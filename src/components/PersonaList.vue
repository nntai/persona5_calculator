<template>
  <PersonaTable
    :personas="personas"
  />
</template>
<script setup lang="ts">
import { Ref } from 'vue';
import { FullPersonaData } from '~/calculators/data';
import { calculateFullPersonaList } from '../calculators/src/DataUtil';

const personas: Ref<FullPersonaData[]> = ref(calculateFullPersonaList());
</script>