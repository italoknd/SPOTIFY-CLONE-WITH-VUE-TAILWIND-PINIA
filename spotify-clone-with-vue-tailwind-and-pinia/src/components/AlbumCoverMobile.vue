<template>
  <div class="h-[500px] w-full">
    <div class="flex justify-center items-center flex-col w-full">
      <img
        class="w-[300px] h-[300px] rounded-sm shadow-2xl"
        :src="album_details?.album_cover"
        alt="Album cover art"
      />
      <span
        class="font-extrabold text-2xl mt-2 whitespace-nowrap w-full text-ellipsis"
      >
        {{ album_details?.album }}
      </span>
      <div class="flex items-center justify-start w-full gap-2 mt-2">
        <img
          :src="album_details?.artist_picture"
          alt=""
          class="w-5 h-5 rounded-full"
        />
        <span
          class="font-semibold text-md whitespace-nowrap w-full text-ellipsis"
        >
          {{ album_details?.artist_of_the_album }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useSongStore } from "../store/song";
import { IAlbum } from "../interfaces/albums";

import { useRoute } from "vue-router";

//components
const route = useRoute();
const albumStore = useSongStore();
const album_details = ref<IAlbum>();

//HOOKS
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
};
</script>
