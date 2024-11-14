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
        v-for="(track, index) in album_details.tracks"
        :key="index"
      >
        <div
          class="flex items-center w-full py-1.5"
          @mouseenter="is_hover = true"
          @mouseleave="is_hover = false"
        >
          <div class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
            <div @click="toggleMusic()" v-if="is_hover">
              <Play
                v-if="!is_playing"
                @click="useSong.playOrPauseThisSong(track.name, track)"
                fillColor="#fff"
                :size="25"
              />
              <Play
                v-else-if="is_playing && current_track.name !== track.name"
                @click="useSong.loadSong(track.name, track)"
                fillColor="#fff"
                :size="25"
              />
              <Pause
                v-else
                @click="useSong.playOrPauseSong()"
                fillColor="#fff"
                :size="25"
              />
            </div>
            <div v-else class="ml-1 text-sm">
              <p :class="highlightPlayingTrack(current_track, track)">
                <strong>{{ track.id }}</strong>
              </p>
            </div>
          </div>
          <div class="text-sm">
            <div>
              <span :class="highlightPlayingTrack(current_track, track)">
                <strong>{{ track.name }}</strong>
              </span>
            </div>
            <div class="hover:underline">
              <span>{{ track.track_artists }}</span>
            </div>
          </div>
        </div>
        <div class="mr-4 flex items-center">
          <Heart v-if="is_hover" fillColor="#1bd760" size="22" />
          <div class="pl-3">{{ duration }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSelectAlbumStore } from "../store/selectAlbum.ts";
import { IAlbum, ITrack } from "../interfaces/albums";

//STUFF FROM PINIA
import { useSongStore } from "../store/song";
const useSong = useSongStore();
const { is_playing, current_track } = storeToRefs(useSong);

//components
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";

const albumStore = useSelectAlbumStore();
const album_details = ref<IAlbum>(albumStore.album);

let is_hover = ref<boolean>(false);
let duration = ref<string | null>(null);
let play_music = ref<boolean>(false);

const toggleMusic = () => {
  play_music.value = !play_music.value;
};

onMounted(() => {
  for (const track of album_details.value.tracks) {
    const audio = new Audio(track.path);

    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      duration.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    });
  }
});

//FUNCTIONS
const highlightPlayingTrack = (
  current_track: ITrack,
  track: ITrack
): string => {
  let applied_class = "";

  if (current_track && current_track.name === track.name) {
    applied_class = "text-green-500";
  }

  return applied_class;
};
</script>
