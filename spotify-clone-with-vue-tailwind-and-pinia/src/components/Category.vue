<template>
  <div>
    <RouterLink to="library">
      <div
        v-if="randColor"
        class="contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden hover:opacity-80"
        :style="{ backgroundColor: randColor.color }"
      >
        <div class="text-white pt-3 pl-4 font-semibold text-[23px] sm:pt-0.5 overflow-hidden text-ellipsis">
          {{ category }}
        </div>
        <img
          :src="image"
          class="absolute contrast-[0.55] -right-3.5 bottom-0 rotate-[20deg] duration-300 hover:rotate-[0deg] hover:scale-150 hover:rounded-md 2xl:max-w-[175px] 2xl:min-w-[155px] 2xl:hover:scale-110 xl:w-[115px] lg:w-[120px] lg:hover:scale-100 md:max-w-[110px] md:min-w-[50px] md:hover:scale-120 sm:max-w-[125px] "
        />
      </div>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { IUniqueColor } from "../interfaces/uniqolor";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import uniqolor from "uniqolor";
import { ICategory } from "../interfaces/category";

let randColor = ref<IUniqueColor>({ color: "", isLight: false });
randColor.value = uniqolor.random();
const props = defineProps<ICategory>();
</script>
