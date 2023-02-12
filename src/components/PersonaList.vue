<template>
  <div
    v-for="(persona, index) in personas"
    :key="index"
  >
    {{ persona.name }}
  </div>
</template>
<script setup lang="ts">
import { Ref } from 'vue';
import { PersonaData } from '~/calculators/data';
import { calculateFullPersonaList } from '../calculators/src/DataUtil';

const personas: Ref<PersonaData[]> = ref(calculateFullPersonaList());
</script>