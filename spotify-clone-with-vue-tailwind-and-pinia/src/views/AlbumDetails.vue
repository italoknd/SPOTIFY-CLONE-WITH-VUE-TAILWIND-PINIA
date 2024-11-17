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

import { ref } from "vue";
import { useSongStore } from "../store/song";
import { IAlbum } from "../interfaces/albums";

const albumStore = useSongStore();
const album_details = ref<IAlbum>(albumStore.album);
const linear_gradient = ref<string>(
  `background-image: linear-gradient(to bottom, ${album_details.value.main_color_on_top}, ${album_details.value.main_color_on_bottom})`
);
</script>
