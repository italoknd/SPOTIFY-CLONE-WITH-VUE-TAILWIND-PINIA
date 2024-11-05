<template>
  <div class="mt-2">
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <div class="mr-7">#</div>
        <div class="text-sm">Title</div>
      </div>
      <div>
        <ClockTimeThreeOutline fillColor="#fff" :size="18" />
      </div>
    </div>
    <div class="border-b border-b-[#2a2a2a] mt-2 mb-4"></div>
    <ul class="w-full">
      <li
        class="flex items-center justify-between rounded-md hover:bg-[#2a2929]"
        @mouseenter="is_hover = true"
        @mouseleave="is_hover = false"
        v-for="(track, index) in album_details.tracks"
        :key="index"
      >
        <div class="flex items-center w-full py-1.5">
          <div
            class="w-[40px] ml-[14px] mr-[6px] cursor-pointer"
            @click="toggleMusic()"
          >
            <Play v-if="!play_music" fillColor="#fff" :size="25" />
            <Pause v-else fillColor="#fff" :size="25" />
          </div>
          <div class="text-sm">
            <div>
              <span>
                <strong>{{ track.name }}</strong>
              </span>
            </div>
            <div class="hover:underline">
              <span>{{ track.track_artists }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSelectAlbumStore } from "../store/selectAlbum.ts";
import { IAlbum } from "../interfaces/albums";

//components

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";

const albumStore = useSelectAlbumStore();
const album_details = ref<IAlbum>(albumStore.album);

let is_hover = ref<boolean>(false);
let is_track_time = ref<string | null>(null);
let play_music = ref<boolean>(false);

const toggleMusic = () => {
  play_music.value = !play_music.value;
};
</script>
