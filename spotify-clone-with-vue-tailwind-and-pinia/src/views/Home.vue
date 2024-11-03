<template>
  <div v-for="(section, index) in sections" :key="index">
    <div class="p-8">
      <button
        type="button"
        class="text-white text-2xl pl-3 font-semibold hover:underline cursor-pointer"
      >
        {{ section.section_name }}
      </button>

      <div class="py-1.5"></div>
      <div class="flex items-centers overflow-hidden">
        <HomeCard
          v-for="(card, index) in section.card"
          :key="index"
          :image="card.image"
          :title="card.title"
          :subtitle="card.subtitle"
          :class="card.styles"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { sections } from "../scripts/sections";
import HomeCard from "../components/HomeCard.vue";
</script>
