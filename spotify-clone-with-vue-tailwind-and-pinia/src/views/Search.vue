<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl pl-3 font-semibold hover:underline cursor-pointer pb-4"
    >
      What you want to listen today?
    </button>

    <div class="py-1.5"></div>
    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6"
    >
      <div v-for="(category, index) in categories" :key="index">
        <Category :category="category.category" :image="category.image" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { categories } from "../scripts/categories";
import Category from "../components/Category.vue";
</script>
