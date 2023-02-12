<template>
  <main
    font-sans
    p="x-4 y-10"
    text="center gray-700 dark:gray-200"
    class="flex flex-col context-start items-center"
  >
    <TheHeader />
    <div class="flex-1">
      <RouterView />
    </div>
    <TheFooter />
  </main>
</template>
<style>
#app main {
  height: 100%;
}
</style>