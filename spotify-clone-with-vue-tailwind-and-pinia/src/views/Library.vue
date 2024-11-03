<template>
  <div
    class="p-8 rounded-md grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
  >
    <div v-for="(album, index) in albums" :key="index">
      <div
        class="flex bg-gray-600 rounded-md duration-300 hover:cursor-pointer hover:bg-gray-300"
      >
        <img :src="album.album_cover" class="w-[60px] h-[60px] rounded-s-md" />
        <div class="ml-3 mr-5 flex items-center justify-between w-full">
          <p
            class="font-semibold w-[60px] xl:max-w-[160px] md:max-w-[100px] sm:w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ album.album }}
          </p>
          <div class="circle">
            <Play :size="25" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import all_albums from "../../artist.json";
import { IAlbum } from "../interfaces/albums";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";

const albums = ref<IAlbum[]>(all_albums);
</script>
