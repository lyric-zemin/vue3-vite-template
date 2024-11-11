<script setup lang="ts">
definePage({ meta: { layout: 'empty' } })
</script>

<template>
  <main p="x4 y10" text="center teal-700 ">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <div>
      Not Found
    </div>
    <div>
      <button text-sm m="3 t8" @click="$router.back()">
        返回
      </button>
    </div>
  </main>
</template>
