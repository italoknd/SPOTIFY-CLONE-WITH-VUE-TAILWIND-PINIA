<template>
  <div
    v-if="audio"
    id="music-player"
    class="select-none fixed flex items-center justify-between bottom-0 w-full z-50 h-[90px] bg-[#181818] border-t border-t-[#272727]"
  >
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <img
          class="rounded-sm shadow-2xl"
          width="55"
          :src="album.album_cover"
          alt="Album cover"
        />
      </div>
      <div class="ml-3 text-sm cursor-pointer">
        <p class="text-gray-300 hover:text-white">
          <strong>{{ current_track.name }}</strong>
        </p>
        <p class="text-gray-300 hover:text-white">
          {{ current_track.track_artists }}
        </p>
      </div>
      <div class="flex items-center ml-8">
        <Heart fillColor="#1bd760" :size="20"></Heart>
        <PictureInPictureBottomRight fillColor="#ffffff" :size="18" />
      </div>
    </div>
    <div class="max-w-[35%] mx-auto w-2/4 mb-3">
      <div class="flex-col items-center justify-center">
        <div class="flex items-center justify-center h-[30px]">
          <button class="mx-2">
            <SkipBackward
              fillColor="#fff"
              :size="25"
              @click="useSong.prevSong(current_track)"
            ></SkipBackward>
          </button>
          <button
            class="p-1 rounded-full mx-3 bg-white"
            @click="useSong.playOrPauseThisSong(current_artist, current_track)"
          >
            <Play v-if="!is_playing" fillColor="#181818" :size="25"></Play>
            <Pause v-else fillColor="#181818" :size="25"></Pause>
          </button>
          <button class="mx-2">
            <SkipForward
              fillColor="#fff"
              :size="25"
              @click="useSong.nextSong(current_track)"
            ></SkipForward>
          </button>
        </div>
      </div>
    </div>
    <div class="flex items-center h-[25px]" v-if="current_track_time">
      <div class="text-white text-[12px] pr-2 pt-[11px]">
        {{ current_track_time }}
      </div>
      <div class="text-white text-[12px] pr-2 pt-[11px]">
        {{ total_track_time }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//MODULES AND UTILS
import { ref, onMounted, watch } from "vue";

//icons
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";

//STORE STUFF
import { storeToRefs } from "pinia";
import { useSongStore } from "../store/song";
const useSong = useSongStore();
const { is_playing, audio, current_artist, current_track, album } =
  storeToRefs(useSong);
const { loadSong, playOrPauseSong, playOrPauseThisSong, prevSong, nextSong } =
  useSong;

//VARS
let is_hover = ref<boolean>(false);
let current_track_time = ref<any>(null);
let total_track_time = ref<any>(null);
let seeker = ref<any>(null);
let seeker_container = ref<any>(null);
let range = ref<number>(0);

//HOOKS
onMounted(async () => {
  if (audio.value) {
    setTimeout(() => {
      timeupdate();
      loadedMetadata();
    }, 300);
  }

  if (current_track) {
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
});

//WATCHERS
watch(audio.value, (val) => {
  timeupdate();
  loadedMetadata();
});

watch(current_track_time.value, (time) => {
  if (time && time === total_track_time.value) {
    useSong.nextSong(current_track.value);
  }
});

//FUNCTIONS
const timeupdate = () => {
  audio.value.addEventListener("timeupdate", () => {
    const minutes = Math.floor(audio.value.currentTime / 60);
    const seconds = Math.floor(audio.value.currentTime - minutes * 60);

    current_track_time.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });

  const value = (100 / audio.value.duration) * audio.value.currentTime;
  range.value = value;
  seeker.value.value = value;
};

const loadedMetadata = () => {
  audio.value.addEventListener("loadedmetadata", () => {
    const duration = audio.value.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);
    console.log(
      "total duration >>>>",
      `${minutes}:${seconds.toString().padStart(2, "0")}`
    );
    total_track_time.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });
};
</script>
