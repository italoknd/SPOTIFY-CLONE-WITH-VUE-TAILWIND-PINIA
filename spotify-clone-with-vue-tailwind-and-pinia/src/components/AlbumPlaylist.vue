<template>
  <div class="-mt-[100px] glass-effect cursor-pointer">
    <div class="flex">
      <div>
        <div class="circle">
          <Play :size="40" fillColor="#fff" />
        </div>
      </div>
      <Heart class="hover:scale-125 duration-300 mt-1 ml-4" :size="40" fillColor="#fff" />
    </div>
    <Songs />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSelectAlbumStore } from "../store/selectAlbum.ts";
import { IAlbum } from "../interfaces/albums";

//components
import Songs from "./Songs.vue";
import Play from "vue-material-design-icons/Play.vue";
import Heart from "vue-material-design-icons/Heart.vue";

//variables
const albumStore = useSelectAlbumStore();
const album_details = ref<IAlbum>(albumStore.album);

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
