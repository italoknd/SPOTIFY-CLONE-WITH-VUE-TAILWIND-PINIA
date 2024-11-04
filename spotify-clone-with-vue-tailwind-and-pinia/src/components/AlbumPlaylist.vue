<template>
  <div class="flex -mt-[100px] glass-effect">
    <div>
      <div class="circle">
        <Play :size="40" fillColor="#fff" />
      </div>
    </div>
    <Heart class="mt-1 ml-4" :size="40" fillColor="#fff" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSelectAlbumStore } from "../store/selectAlbum.ts";
import { IAlbum } from "../interfaces/albums";

import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";
import Dot from "../components/Dot.vue";

const albumStore = useSelectAlbumStore();
const album_details = ref<IAlbum>(albumStore.album);
const linear_gradient = ref<string>(
  `background-image: linear-gradient(to bottom, ${album_details.value.main_color_on_top}, ${album_details.value.main_color_on_bottom})`
);
</script>
<style scoped>
.glass-effect {
  background-image: linear-gradient(
    to bottom,
    rgba(2, 0, 0, 0.288),
    #101010
  ); /* Fundo branco semi-transparente */
  color: white; /* Cor do texto para contraste */
  backdrop-filter: blur(100px); /* Efeito de blur no fundo */
  -webkit-backdrop-filter: blur(10px); /* Suporte para navegadores WebKit */
}
</style>
