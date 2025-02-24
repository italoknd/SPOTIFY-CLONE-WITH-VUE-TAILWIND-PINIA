<template>
  <VolumeMute
    class="cursor-pointer"
    v-if="Number(vol) === 0"
    @click="muteOrUnmuteTrack"
    fillColor="#fff"
    :size="20"
  ></VolumeMute>
  <VolumeHigh
    class="cursor-pointer"
    v-else
    @click="muteOrUnmuteTrack"
    fillColor="#fff"
    :size="20"
  ></VolumeHigh>
  <div
    class="flex items-center ml-2 w-[150px] relative mt-2 mb-[23px]"
    @mouseenter="is_hovering = true"
    @mouseleave="is_hovering = false"
  >
    <input
      v-model="vol"
      ref="volume"
      type="range"
      class="mt-[24px] cursor-pointer absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
      :class="{ rangeDotHidden: !is_hovering }"
    />
    <div
      class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
      :style="`width: ${vol}%;`"
      :class="is_hovering ? 'bg-green-600' : 'bg-green-500'"
    />
    <div
      class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
    />
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";

import VolumeMute from "vue-material-design-icons/VolumeMute.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";

import { useSongStore } from "../store/song";
import { storeToRefs } from "pinia";

const useSong = useSongStore();
const { audio } = storeToRefs(useSong);

let is_muted = $ref<boolean>(false);
let last_volume_saved = $ref<number>(0);
let is_hovering = $ref<boolean>(false);
let vol = $ref<number>(80);
let volume = $ref(null);

watch(
  () => vol,
  (val) => {
    audio.value.volume = Number(val) / 100;
  }
);

const muteOrUnmuteTrack = () => {
  is_muted = !is_muted;

  if (is_muted) {
    last_volume_saved = vol;
    audio.value.volume = 0;
    vol = 0;
  } else {
    vol = last_volume_saved;
    audio.value.volume = last_volume_saved / 100;
    last_volume_saved = 0;
  }
};
</script>
