<template>
  <div
    v-if="audio"
    id="music-player"
    class="fixed flex items-center justify-between bottom-0 w-full z-50 h-[90px] bg-[#181818] border-t border-t-[#272727]"
  >
    hey there
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

//icons
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";

//store imports
import { useSongStore } from "../store/song";
const useSong = useSongStore();
const { is_playing, audio, current_artist, current_track } =
  storeToRefs(useSong);
const { loadSong, playOrPauseSong, playOrPauseThisSong, prevSong, nextSong } =
  useSong;

//vars
let is_hover = ref<boolean>(false);
let current_track_time = ref<any>(null);
let total_track_time = ref<any>(null);
let seeker = ref<any>(null);
let seeker_container = ref<any>(null);
let range = ref<number>(0);

onMounted(() => {
  if (audio.value) {
    setTimeout(() => {
      timeupdate();
      loadedmetadata();
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

//watchers
watch(audio.value, () => {
  timeupdate();
  loadedmetadata();
});

watch(current_track_time.value, (time) => {
  if (time && time === total_track_time.value) {
    nextSong(current_track);
  }
});

const timeupdate = () => {
  console.log("audio >>>>", audio.value);

  audio.value.addEventListener("timeupdate", () => {
    console.log("aaaaa");
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

const loadedmetadata = () => {
  audio.value.addEventListener("loadedmetadata", () => {
    const duration = audio.value.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

    total_track_time.value = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  });
};
</script>
