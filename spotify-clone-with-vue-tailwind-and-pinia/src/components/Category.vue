<template>
  <div class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
    <RouterLink to="library" v-for="(category, index) in categories" :key="index">
      <div
        v-if="randColor"
        :style="{ backgroundColor: randColor.color }"
        class="contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden"
      >
        <div class="text-white pt-3 pl-4 font-semibold text-[23px]">
          {{ category.category }}
        </div>
        <img
          :src="category.image"
          class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]"
        />
      </div>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { categories } from "../scripts/categories";
import { IUniqueColor } from "../interfaces/uniqolor";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import uniqolor from "uniqolor";

let randColor = ref<IUniqueColor>({ color: "", isLight: false });
randColor.value = uniqolor.random();
</script>
