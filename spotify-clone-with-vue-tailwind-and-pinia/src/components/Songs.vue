<template>
  <div>
    <div
      v-if="album_details?.tracks.length"
      :class="!album_details?.tracks.length ? 'mt-4' : 'mt-2'"
    >
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
          v-for="(track, index) in album_details?.tracks"
          :key="index"
        >
          <div
            @mouseenter="getItem(true, index)"
            @mouseleave="getItem(false, index)"
            class="flex items-center w-full py-1.5"
          >
            <div class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
              <div v-if="verifyHovering(index)">
                <Play
                  v-if="!is_playing"
                  @click="
                    useSong.playOrPauseThisSong(track.track_artists, track)
                  "
                  fillColor="#fff"
                  :size="25"
                />
                <Play
                  v-else-if="is_playing && current_track.name !== track.name"
                  @click="useSong.loadSong(track.track_artists, track)"
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
            <Heart
              v-if="verifyHovering(index)"
              fillColor="#1bd760"
              :size="22"
            />
            <div class="pl-3">{{ duration }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="flex justify-center">
      <p class="text-center text-base font-semibold text-white">
        No music added yet.
      </p>
      <EmoticonSad class="ms-2" />
    </div>
  </div>
</template>
<script setup lang="ts">
//MODULES AND INTERFACES
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { IAlbum, ITrack } from "../interfaces/albums";

//ICONS
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";
import EmoticonSad from "vue-material-design-icons/EmoticonSad.vue";

//STUFF FROM PINIA
import { useSongStore } from "../store/song";
const useSong = useSongStore();
const { is_playing, current_track } = storeToRefs(useSong);

//VARS
const route = useRoute();
const album_details = ref<IAlbum>();

let index = ref<number | null>(null);
let is_hover = ref<boolean>(false);
let duration = ref<string | null>(null);

//HOOKS
onMounted(() => {
  validateSection();

  for (const track of album_details.value?.tracks ?? []) {
    const audio = new Audio(track.path);

    audio.addEventListener("loadedmetadata", () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      duration.value = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    });
  }
});

watch(
  () => route.path,
  () => {
    validateSection();
  }
);

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

const getItem = (hovering: boolean, item_position: number) => {
  index.value = item_position;
  hovering ? (is_hover.value = true) : (is_hover.value = false);
};

const verifyHovering = (item_position: number): boolean => {
  return item_position === index.value && is_hover.value ? true : false;
};

const validateSection = (): void => {
  if (route.path.includes("liked")) {
    album_details.value = useSong.liked_songs;
  } else if (route.path.includes("selected-album")) {
    album_details.value = useSong.album;
  }
};
</script>
