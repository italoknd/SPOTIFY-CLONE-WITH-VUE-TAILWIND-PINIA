<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import { IMenuItems } from "../interfaces/menuItemsProps";

const route = useRoute();
const props = defineProps<IMenuItems>();

let icon = ref<IMenuItems["iconString"]>("");
let textIsHover = ref(false);

watchEffect(() => {
  if (route.path === props.pageURL) {
    icon.value = props.iconString + "-active";
    textIsHover.value = true;
  } else {
    icon.value = props.iconString + "-inactive";
    textIsHover.value = false;
  }
});

const isHover = () => {
  if (icon.value === props.iconString + "-active") return;

  if (icon.value === props.iconString + "-inactive") {
    icon.value = props.iconString + "-inactive-hover";
    textIsHover.value = true;
  } else {
    icon.value = props.iconString + "-inactive";
    textIsHover.value = false;
  }
};
</script>
<template>
  <div>
    <li
      class="flex items-center justify-start pb-4 cursor-pointer"
      @mouseenter="isHover()"
      @mouseleave="isHover()"
    >
      <img :src="`/images/icons/${icon}.png`" :width="props.iconSize" />

      <div
        :class="textIsHover ? 'text-white' : 'text-gray-400'"
        class="font-semibold text-[14px] ml-4 mt-0.5"
      >
        <span :class="route.path === props.pageURL ? 'text-white' : ''">
          {{ props.name }}
        </span>
      </div>
    </li>
  </div>
</template>
