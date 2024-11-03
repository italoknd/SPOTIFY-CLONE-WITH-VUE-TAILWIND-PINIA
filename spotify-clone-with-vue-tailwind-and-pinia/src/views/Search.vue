<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl pl-3 font-semibold hover:underline cursor-pointer"
    >
      Seek new vibes for you!
    </button>

    <div class="py-1.5"></div>
    <Category />
  </div>
</template>
<script setup lang="ts">
import Category from "../components/Category.vue";
</script>
