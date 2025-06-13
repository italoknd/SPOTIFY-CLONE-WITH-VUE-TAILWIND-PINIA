<script setup lang="ts">
import { watchEffect, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { IMenuItems } from "../interfaces/menuItemsProps";
import { useSongStore } from "../store/song";

const route = useRoute();
const props = defineProps<IMenuItems>();
const songStore = useSongStore();

let icon = ref<IMenuItems["iconString"]>("");
let textIsHover = ref(false);

watchEffect(() => {
  if (route.path === props.pageURL) {
    icon.value = props.iconString + "-active-enhanced";
    textIsHover.value = true;
  } else {
    icon.value = props.iconString + "-inactive-enhanced";
    textIsHover.value = false;
  }
});

watch(
  () => route.path,
  (val) => {
    if (val.includes("liked") && songStore.album !== songStore.liked_songs) {
      songStore.getSelectedAlbum(songStore.liked_songs);
    }
  }
);

const isHover = () => {
  if (icon.value === props.iconString + "-active-enhanced") return;

  if (icon.value === props.iconString + "-inactive-enhanced") {
    icon.value = props.iconString + "-inactive-hover-enhanced";
    textIsHover.value = true;
  } else {
    icon.value = props.iconString + "-inactive-enhanced";
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
