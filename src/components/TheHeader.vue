<template>
  <div
    class="flex flex-col items-start justify-start w-full"
  >
    <div
      c-red-500
      font-500
      text-6
    >
      Persona 5 Calculator
    </div>
    <div
      text-xl
      mt-2
      inline-flex
      gap-2
      w-full
      class="flex flex-row items-center justify-between"
    >
      <nav>
        <template
          v-for="({title, href}, index) in headers"
          :key="title"
        >
          <router-link
            rel="noreferrer"
            :to="href"
            :title="title"
            active-class="c-green-500"
            class="text-5"
          >
            {{ title }}
          </router-link>
          <template v-if="index < headers.length - 1">
            -
          </template>
        </template>
      </nav>
      <button
        icon-btn
        class="flex"
      >
        <div
          i-carbon-menu
        />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router';

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
<style lang="scss" scoped>
.router-link-exact-active  {
}
</style>
