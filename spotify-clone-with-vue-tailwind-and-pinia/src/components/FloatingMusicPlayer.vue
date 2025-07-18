<template>
  <div>
    <div
      v-if="!Object.keys(audio).length && !show_current_track"
      @click="toggleNowPlaying(true)"
      class="rounded-t-md select-none fixed flex items-center justify-between bottom-[65px] w-full z-50 h-[60px] bg-[#181818]"
    >
      <div class="flex items-center">
        <div class="flex items-center ml-2">
          <img
            class="rounded-sm shadow-2xl"
            width="45"
            :src="current_track.track_cover"
            alt="Album cover"
          />
        </div>
        <div class="ml-1 text-sm cursor-pointer">
          <n-marquee
            class="max-w-[250px]"
            v-if="current_track.name.length > 50"
          >
            <p class="text-gray-300 hover:text-white pr-[50px]">
              <strong>{{ current_track.name }}</strong>
            </p>
          </n-marquee>
          <p v-else class="text-gray-300 hover:text-white">
            <strong>{{ current_track.name }}</strong>
          </p>
          <p class="text-gray-300 hover:text-white">
            {{ current_track.track_artists }}
          </p>
        </div>
      </div>
      <button
        class="p-1 rounded-full mx-3 bg-white"
        @click.stop="useSong.playOrPauseThisSong(current_artist, current_track)"
      >
        <Play v-if="!is_playing" fillColor="#181818" :size="25"></Play>
        <Pause v-else fillColor="#181818" :size="25"></Pause>
      </button>
      <!--DURATION SEEKER-->
      <div
        ref="seeker_container"
        class="w-full absolute bottom-1.5"
        @mouseenter="is_hover = true"
        @mouseleave="is_hover = false"
      >
        <div
          class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
          :style="`width: ${range}%;`"
          :class="is_hover ? 'bg-green-600' : 'bg-green-500'"
        />
        <div
          class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
        />
      </div>
    </div>
    <transition name="now-playing">
      <NowPlaying
        v-if="show_current_track"
        @toggleNowPlaying="toggleNowPlaying"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
//MODULES AND UTILS
import { ref, onMounted, watch, nextTick } from "vue";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";

//STORE STUFF
import { storeToRefs } from "pinia";

import { useScreenStore } from "../store/screen";
import { useSongStore } from "../store/song";

import NowPlaying from "./NowPlaying.vue";

const useScreen = useScreenStore();
const useSong = useSongStore();
const { is_playing, audio, current_artist, current_track } =
  storeToRefs(useSong);

//VARS
let current_track_time = ref<any>(null);
let seeker = ref<any>(null);
let seeker_container = ref<any>(null);
let range = ref<number>(0);
let is_hover = ref<boolean>(false);
let show_current_track = $ref<boolean>(false);

//HOOKS
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

const toggleNowPlaying = (param: boolean) => {
  useScreen.deactivateHeader(!param);
  show_current_track = param;
};
</script>
<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 0;
  height: 0;
}

/* Estado de entrada (antes de aparecer) */
.now-playing-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.now-playing-enter-active {
  transition: all 0.3s ease-out;
}

/* Estado final de entrada */
.now-playing-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* Estado de saída (antes de sumir) */
.now-playing-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/* Estado ativo durante a transição de saída */
.now-playing-leave-active {
  transition: all 0.3s ease-in;
}

/* Estado final de saída */
.now-playing-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
