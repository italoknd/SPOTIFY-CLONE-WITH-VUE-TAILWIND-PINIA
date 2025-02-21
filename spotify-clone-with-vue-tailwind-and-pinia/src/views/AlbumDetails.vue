<template>
  <div class="-mt-[10px]">
    <AlbumCover
      :style="linear_gradient"
      class="p-8 text-white select-none rounded-t-md"
    />
    <AlbumPlaylist class="p-8 text-white select-none rounded-b-md" />
  </div>
</template>
<script setup lang="ts">
import AlbumCover from "../components/AlbumCover.vue";
import AlbumPlaylist from "../components/AlbumPlaylist.vue";

import { ref, onMounted, watch } from "vue";
import { useSongStore } from "../store/song";
import { IAlbum } from "../interfaces/albums";
import { useRoute } from "vue-router";

const route = useRoute();
const albumStore = useSongStore();
const album_details = ref<IAlbum>();
const linear_gradient = ref<string>("");

//hooks
onMounted(() => {
  validateSection();
});

watch(
  () => route.path,
  () => {
    validateSection();
  }
);

//FUNCTIONS
const validateSection = (): void => {
  if (route.path.includes("liked")) {
    album_details.value = albumStore.liked_songs;
  } else if (route.path.includes("selected-album")) {
    album_details.value = albumStore.album;
  }

  getGradient();
};

const getGradient = (): void => {
  linear_gradient.value = `background-image: linear-gradient(to bottom, ${album_details.value?.main_color_on_top}, ${album_details.value?.main_color_on_bottom})`;
};
</script>
