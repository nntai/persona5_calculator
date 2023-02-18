<template>
  <div p-2>
    <component
      :is="menuComponent"
      v-if="menuComponent"
    />
  </div>
</template>
<script setup lang="ts">
import PersonaMenu from './personas/PersonaMenu.vue';

const route = useRoute();

const currentRoute = computed(() => route.name || 'other');
const personaMenu = {
  personas: PersonaMenu,
};
const menuComponent = computed(() => personaMenu[currentRoute.value] || PersonaMenu);

</script>