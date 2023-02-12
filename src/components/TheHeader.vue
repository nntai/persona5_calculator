<template>
  <div
    class="flex flex-col items-center content-start"
  >
    <div>
      Persona 5 Calculator
    </div>
    <nav
      text-xl
      mt-6
      inline-flex
      gap-2
    >
      <template
        v-for="({title, href}, index) in headers"
        :key="title"
      >
        <a
          rel="noreferrer"
          :href="href"
          :title="title"
          class="c-indigo-500"
        >
          {{ title }}
        </a>
        <template v-if="index < headers.length - 1">
          -
        </template>
      </template>
    </nav>
  </div>
</template>
<script setup lang="ts">
const headers = [
    {
        title: 'Personas',
        href: '/personas'
    },
    {
        title: 'Skills',
        href: '/skills'
    },
    {
        title: 'Items',
        href: '/items'
    },
];
</script>
<style>

</style>