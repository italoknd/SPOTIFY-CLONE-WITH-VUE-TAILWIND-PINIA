<template>
  <div>
    <div v-if="tracks.length" :class="!tracks.length ? 'mt-4' : 'mt-2'">
      <div class="flex items-center justify-between px-3md:px-5 pt-2">
        <div class="flex items-center justify-between text-gray-400">
          <div class="mr-7">#</div>
          <div class="text-sm">Title</div>
        </div>
        <div>
          <ClockTimeThreeOutline fillColor="#fff" :size="18" />
        </div>
      </div>
      <div class="border-b border-b-[#2a2a2a] mt-2 md:mt-2 md:mb-4"></div>
      <ul class="w-full">
        <li
          class="flex items-center justify-between rounded-md hover:bg-[#2a2929]"
          v-for="(track, index) in tracks"
          :key="index"
          @dblclick="useSong.playOrPauseThisSong(track.track_artists, track)"
        >
          <div
            @mouseenter="getItem(true, index)"
            @mouseleave="getItem(false, index)"
            class="flex items-center w-full py-1.5"
          >
            <div class="w-[40px] md:ml-[14px] mr-[6px] cursor-pointer">
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
              <div v-else class="md:ml-1 text-sm">
                <p :class="highlightPlayingTrack(current_track, track)">
                  <strong>{{ track.id }}</strong>
                </p>
              </div>
            </div>
            <div class="flex align-center text-sm">
              <img
                :src="track.track_cover"
                alt="Track Cover"
                class="w-[35px] h-[35px] object-cover rounded-sm mx-[-8px] md:mx-[-5px] mr-3 mt-[3px]"
              />
              <div>
                <div>
                  <span
                    :class="[
                      highlightPlayingTrack(current_track, track),
                      'block w-[160px] truncate md:w-auto md:whitespace-normal md:truncate-none',
                    ]"
                  >
                    <strong>{{ track.name }}</strong>
                  </span>
                </div>
                <div class="hover:underline">
                  <span>{{ track.track_artists }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="md:mr-4 flex items-center">
            <Heart
              v-if="verifyHovering(index)"
              fillColor="#1bd760"
              :size="22"
            />
            <div class="pl-3">{{ track.duration }}</div>
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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { ITrack } from "../interfaces/albums";

//ICONS
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";
import EmoticonSad from "vue-material-design-icons/EmoticonSad.vue";

//STUFF FROM PINIA
import { useSongStore } from "../store/song";
const useSong = useSongStore();
const { is_playing, current_track, tracks } = storeToRefs(useSong);

//VARS
let index = ref<number | null>(null);
let is_hover = ref<boolean>(false);

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
</script>
