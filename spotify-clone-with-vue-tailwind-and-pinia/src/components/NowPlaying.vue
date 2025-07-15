<template>
  <!-- v-if="!Object.keys(audio).length" -->
  <div
    class="select-none z-50 h-full w-full bg-[#181818] border-t border-t-[#272727] p-4"
  >
    <!--HEADER CONTAINER-->
    <div class="flex justify-between items-center">
      <ChevronDown fillColor="#fff" :size="35" @click="hideNowPlaying()" />
      <span class="text-white font-bold text-[18px]">{{ album.album }}</span>
      <div></div>
    </div>
    <!--IMAGE CONTAINER-->
    <div class="flex items-center justify-center my-4">
      <img
        class="w-full h-[calc(100vh-375px)] object-cover rounded-xl shadow-2xl"
        :src="current_track.track_cover"
        alt="Album cover"
      />
    </div>
    <!--TRACK INFOS CONTAINER-->
    <div class="cursor-pointer">
      <n-marquee
        class="text-xl font-extrabold w-[230px]"
        v-if="current_track.name.length > 50"
      >
        <p class="text-gray-300 hover:text-white pr-[200px]">
          <strong>{{ current_track.name }}</strong>
        </p>
      </n-marquee>
      <p v-else class="text-xl font-extrabold text-gray-300 hover:text-white">
        <strong>{{ current_track.name }}</strong>
      </p>
      <p class="text-gray-300 hover:text-white">
        {{ current_track.track_artists }}
      </p>
    </div>
    <div class="mb-3">
      <div class="flex-col items-center justify-center"></div>
      <!--SEEKER CONTAINER & TIME COUNTER-->
      <div>
        <div
          ref="seeker_container"
          class="w-full relative mt-2 mb-3"
          @mouseenter="is_hover = true"
          @mouseleave="is_hover = false"
        >
          <input
            v-model="range"
            ref="seeker"
            type="range"
            class="cursor-pointer absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
            :class="{ rangeDotHidden: !is_hover }"
          />
          <div
            class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
            :style="`width: ${range}%;`"
            :class="is_hover ? 'bg-green-600' : 'bg-green-500'"
          />
          <div
            class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
          />
        </div>
        <div class="flex justify-between pt-2">
          <div class="text-white text-[12px] pr-2 pt-[11px]">
            {{ current_track_time || "0:00" }}
          </div>
          <div
            v-if="current_track?.duration"
            class="text-white text-[12px] pl-2 pt-[11px]"
          >
            {{ current_track.duration }}
          </div>
        </div>
      </div>
      <!--CONTROLS-->
      <div class="flex items-center justify-center h-[30px] gap-5 p-5">
        <button class="mx-2">
          <SkipBackward
            fillColor="#fff"
            :size="35"
            @click="useSong.prevSong(current_track)"
          >
          </SkipBackward>
        </button>
        <button
          class="p-1 rounded-full mx-3 bg-white"
          @click="useSong.playOrPauseThisSong(current_artist, current_track)"
        >
          <Play v-if="!is_playing" fillColor="#181818" :size="35"></Play>
          <Pause v-else fillColor="#181818" :size="35"></Pause>
        </button>
        <button class="mx-2">
          <SkipForward
            fillColor="#fff"
            :size="35"
            @click="useSong.nextSong(current_track)"
          ></SkipForward>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//MODULES AND UTILS
import { ref, onMounted, watch, nextTick } from "vue";
//icons
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";

//STORE STUFF
import { storeToRefs } from "pinia";
import { useSongStore } from "../store/song";
const useSong = useSongStore();
const { is_playing, audio, current_artist, current_track, album } =
  storeToRefs(useSong);

//VARS
let is_hover = ref<boolean>(false);
let current_track_time = ref<any>(null);
let seeker = ref<any>(null);
let seeker_container = ref<any>(null);
let range = ref<number>(0);

//HOOKS
const emit = defineEmits<{
  (e: "toggleNowPlaying", val: boolean): void;
}>();

onMounted(() => {
  if (audio.value) {
    setTimeout(() => timeupdate(), 300);
  }
});

//WATCHERS
watch(
  () => audio.value,
  (val) => {
    if (val) {
      timeupdate();
    }

    nextTick(() => seekerHandler());
  }
);

watch(
  () => current_track_time.value,
  (time) => {
    if (time && time === current_track.value.duration) {
      useSong.nextSong(current_track.value);
    }
  }
);

//FUNCTIONS
const timeupdate = () => {
  if (audio.value instanceof HTMLAudioElement) {
    audio.value.addEventListener("timeupdate", () => {
      const minutes = Math.floor(audio.value.currentTime / 60);
      const seconds = Math.floor(audio.value.currentTime - minutes * 60);

      current_track_time.value = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

      const value = (100 / audio.value.duration) * audio.value.currentTime;
      range.value = value;
      seeker.value.value = value;
    });
  }
};

const seekerHandler = () => {
  if (current_track.value) {
    seeker.value.addEventListener("change", () => {
      const time = audio.value.duration * (seeker.value.value / 100);
      audio.value.currentTime = time;
    });

    seeker.value.addEventListener("mousedown", () => {
      audio.value.pause();
      is_playing.value = false;
    });

    seeker.value.addEventListener("mouseup", () => {
      audio.value.play();
      is_playing.value = true;
    });

    seeker_container.value.addEventListener("click", (e: MouseEvent) => {
      const click_position =
        (e.pageX - seeker_container.value.offsetLeft) /
        seeker_container.value.offsetWidth;
      const time = audio.value.duration * click_position;
      audio.value.currentTime = time;
      seeker.value.value =
        (100 / audio.value.duration) * audio.value.currentTime;
    });
  }
};

const hideNowPlaying = () => {
  emit("toggleNowPlaying", false);
};
</script>
<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 0;
  height: 0;
}
</style>
