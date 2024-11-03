<template>
  <div>
    <RouterLink to="library">
      <div
        v-if="randColor"
        class="contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden"
        :style="{ backgroundColor: randColor.color }"
      >
        <div class="text-white pt-3 pl-4 font-semibold text-[23px]">
          {{ category }}
        </div>
        <img
          :src="image"
          class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[175px] rotate-[20deg]"
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
