<template>
  <div class="p-8 text-white">
    <!-- {{ album_details }} -->
    <div class="flex">
      <img
        class="w-[250px] h-[250px]"
        :src="album_details.album_cover"
        alt="Album cover art"
      />
      <div class="ml-3 w-full">
        <p class="ml-2 text-md">{{ album_details.album_category  }}</p>
        <h1 class="font-extrabold text-8xl pb-5">
          {{ album_details.album || "2" }}
        </h1>
        <div class="flex items-center">
          <p class="mx-2 text-md">
            <strong>{{ album_details.artist_of_the_album }}</strong>
          </p>
          <Dot />
          <p class="mx-2 text-md">{{ album_details.release_year }}</p>
          <Dot />
          <p class="mx-2 text-md">{{ album_details.tracks.length }} {{album_details.tracks.length > 1 ? 'songs' : 'song'}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSelectAlbumStore } from "../store/selectAlbum.ts";
import { IAlbum } from "../interfaces/albums";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";

import Dot from "../components/Dot.vue";

const albumStore = useSelectAlbumStore();
const album_details = ref<IAlbum>(albumStore.album);
</script>
