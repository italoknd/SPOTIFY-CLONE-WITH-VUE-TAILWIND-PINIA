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
</script>
<template>
  <li class="flex items-center justify-start pb-1 cursor-pointer">
    <img :src="`/images/icons/${icon}.png`" class="w-5 h-5" />
    <div
      :class="textIsHover ? 'text-white' : 'text-gray-400'"
      class="font-semibold text-[14px] ml-4 mt-0.5"
    >
      <span :class="route.path === props.pageURL ? 'text-white' : ''">
        {{ props.name }}
      </span>
    </div>
  </li>
</template>
