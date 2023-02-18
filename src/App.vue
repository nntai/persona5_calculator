<template>
  <main
    font-sans
    p="x-2 y-2"
    text="center gray-700 dark:gray-200"
    class="flex flex-col context-start items-center w-screen"
  >
    <TheHeader />
    <RouterView class="flex-1 w-full flex flex-col mt-4" />
    <TheFooter />
  </main>
</template>
<style>
#app main {
  height: 100%;
}
</style>