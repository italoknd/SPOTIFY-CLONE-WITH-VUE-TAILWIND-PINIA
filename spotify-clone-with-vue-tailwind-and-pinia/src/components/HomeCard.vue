<template>
  <div>
    <RouterLink to="library">
      <div
        class="bg-[#111111] p-4 rounded m-2 hover:bg-[#252525] cursor-pointer "
      >
        <img
          :src="image"
          class="rounded-md sm:w-[300px] sm:h-[150px] lg:w-[300px] lg:h-[250px] xl:w-[300px] xl:h-[300px] object-cover"
        />
        <div class="text-white pt-4 font-semibold text-[17px] overflow-hidden text-ellipsis">
          {{ title }}
        </div>
        <div
          class="text-white pt-1 pb-3 text-[14px] xl:h-[45px] lg:h-[35px] md:h-[25px] sm:h-[15px] overflow-hidden text-ellipsis"
        >
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
