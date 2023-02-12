<template>
  <main
    font-sans
    p="x-4 y-10"
    text="center gray-700 dark:gray-200"
    class="flex flex-col context-start items-center w-screen"
  >
    <TheHeader />
    <RouterView class="flex-1 w-screen flex flex-col mt-4" />
    <TheFooter />
  </main>
</template>
<style>
#app main {
  height: 100%;
}
</style>