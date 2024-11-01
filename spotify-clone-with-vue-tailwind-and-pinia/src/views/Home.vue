<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      Podcasts to make you smarter
    </button>

    <div class="py-1.5"></div>
    <div class="flex items-centers">
      <HomeCard
        v-for="(card, index) in cards"
        :key="index"
        :image="card.image"
        :title="card.title"
        :subtitle="card.subtitle"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { cards } from "../scripts/homeCard";
import HomeCard from "../components/HomeCard.vue";
</script>
