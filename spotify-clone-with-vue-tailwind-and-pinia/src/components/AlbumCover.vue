<template>
  <div class="flex h-[400px]">
    <img
      class="w-[250px] h-[250px] rounded-md"
      :src="album_details?.album_cover"
      alt="Album cover art"
    />
    <div class="ml-3 w-full relative top-[120px]">
      <p class="ml-2 text-md">{{ album_details?.album_category }}</p>

      <h1
        class="font-extrabold text-6xl pb-5 whitespace-nowrap w-full text-ellipsis"
      >
        {{ album_details?.album }}
      </h1>
      <div class="flex items-center">
        <img
          :src="
            album_details?.artist_picture ||
            album_details?.playlist_owner_picture
          "
          alt="Artist Picture"
          class="w-[25px] h-[25px] rounded-xl object-contain"
        />
        <p class="mx-2 text-md">
          <strong>{{ album_details?.artist_of_the_album }}</strong>
        </p>
        <Dot v-if="album_details?.release_year" />
        <p class="mx-2 text-md">{{ album_details?.release_year }}</p>
        <Dot v-if="album_details?.release_year" />
        <p class="mx-2 text-md" v-if="album_details?.tracks?.length">
          {{ (album_details?.tracks ?? []).length > 1 ? "songs" : "song," }}
          {{ albumStore?.playlist_duration }}
        </p>
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
import Dot from "../components/Dot.vue";
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
