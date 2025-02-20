<template>
  <div class="-mt-[100px] glass-effect cursor-pointer">
    <div class="flex">
      <div>
        <div class="circle">
          <Play
            @click="useSong.playFromTheBeginning()"
            :size="40"
            fillColor="#fff"
            v-if="!is_playing"
          />
          <Pause
            @click="useSong.playOrPauseThisSong(current_artist, current_track)"
            :size="40"
            fillColor="#fff"
            v-else
          />
        </div>
      </div>
      <Heart
        @click="addTracksToFavoritePlaylist()"
        class="hover:scale-125 duration-300 mt-1 ml-4"
        :size="40"
        :fillColor="album.liked_playlist ? '#23CF5F' : '#fff'"
      />
    </div>
    <Songs />
  </div>
</template>
<script setup lang="ts">
//COMPONENTS
import Songs from "./Songs.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";

//STUFF FROM PINIA
import { storeToRefs } from "pinia";
import { useSongStore } from "../store/song";

const useSong = useSongStore();

const addTracksToFavoritePlaylist = (): void => {
  useSong.saveOrRemoveAlbumFromLikedPlaylist();
};

const { is_playing, current_track, current_artist, album } =
  storeToRefs(useSong);
</script>
<style scoped>
.glass-effect {
  background-image: linear-gradient(to bottom, rgba(2, 0, 0, 0.288), #101010);
  /* Fundo branco semi-transparente */
  color: white;
  /* Cor do texto para contraste */
  backdrop-filter: blur(100px);
  /* Efeito de blur no fundo */
  -webkit-backdrop-filter: blur(10px);
  /* Suporte para navegadores WebKit */
}
</style>
