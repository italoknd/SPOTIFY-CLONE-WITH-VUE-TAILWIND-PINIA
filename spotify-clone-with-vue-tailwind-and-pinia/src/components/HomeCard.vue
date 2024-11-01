<template>
  <div>
    <RouterLink to="library">
      <div
        class="bg-[#111111] p-4 rounded m-2 hover:bg-[#252525] cursor-pointer"
      >
        <img :src="image" class="rounded-md" />
        <div class="text-white pt-4 font-semibold text-[17px]">
          {{ title }}
        </div>
        <div class="text-white pt-1 pb-3 text-[14px]">
          {{ subtitle }}
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { IHomeCard } from "../interfaces/homeCard";
import { RouterLink } from "vue-router";
const props = defineProps<IHomeCard>();
</script>
