<template>
  <div>
    <RouterLink to="library">
      <div
        class="bg-[#111111] p-4 rounded m-2 hover:bg-[#252525] cursor-pointer"
      >
        <img
          :src="image"
          class="rounded-md w-[300px] h-[150px] sm:w-[300px] sm:h-[150px] lg:w-[300px] lg:h-[250px] xl:w-[300px] xl:h-[300px] object-cover"
        />
        <div
          class="text-white pt-2 xl:pt-4 lg:pt-3 md:pt-0.5 sm:p-[6px] font-semibold text-[17px] w-[100px] h-[60px] xl:h-[40px] lg:h-[40px] md:h-[25px] sm:h-[25px] xl:w-[270px] sm:w-[170px] overflow-hidden text-ellipsis"
        >
          {{ title }}
        </div>
        <div
          class="text-white pt-1 pb-3 text-[14px] w-[100px] max-h-[50px] xl:h-[45px] lg:h-[35px] md:h-[25px] sm:h-[15px] xl:w-[270px] lg:w-[180px] md:w-[150px] sm:w-[100px] overflow-hidden text-ellipsis xl:pl-1 md:pl-1 md:block hidden"
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
const debug_css =
  "xl:bg-green-500 lg:bg-blue-500 md:bg-yellow-400 sm:bg-red-500";
</script>
