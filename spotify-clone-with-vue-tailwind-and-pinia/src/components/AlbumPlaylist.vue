<template>
  <div class="-mt-[100px] glass-effect cursor-pointer">
    <div class="flex">
      <div>
        <div class="circle">
          <Play
            :disabled="!tracks.length"
            @click="
              tracks.length ? useSong.playFromTheBeginning() : emptyPlaylist()
            "
            :size="mobileView ? 25 : 40"
            fillColor="#fff"
            v-if="!is_playing"
          />
          <Pause
            @click="useSong.playOrPauseThisSong(current_artist, current_track)"
            :size="mobileView ? 25 : 40"
            fillColor="#fff"
            v-else
          />
        </div>
      </div>
      <Heart
        v-if="!route.path.includes('liked')"
        @click="addTracksToFavoritePlaylist()"
        class="hover:scale-125 duration-300 mt-0.5 md:mt-1 ml-4"
        :size="mobileView ? 30 : 40"
        :fillColor="album.liked_playlist ? '#23CF5F' : '#fff'"
      />
    </div>
    <Songs />
  </div>
</template>
<script setup lang="ts">
//VUE IMPORTS
import { onMounted } from "vue";
import { useRoute } from "vue-router";

//NAIVE UI COMPONENTS
import { useNotification } from "naive-ui";

//COMPONENTS
import Songs from "./Songs.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import Heart from "vue-material-design-icons/Heart.vue";

//STUFF FROM PINIA
import { storeToRefs } from "pinia";
import { useSongStore } from "../store/song";

//INSTANCIES
const route = useRoute();
const useSong = useSongStore();
const notification = useNotification();
let mobileView = $ref<boolean>(false);

onMounted(() => (mobileView = window.innerWidth < 768));

const addTracksToFavoritePlaylist = (): void => {
  useSong.saveOrRemoveAlbumFromLikedPlaylist();

  album.value.liked_playlist
    ? notify("Album added to liked songs")
    : notify("Album removed from liked songs");
};

const notify = (title: string) => {
  notification.success({ title, duration: 1500 });
};

const emptyPlaylist = () => {
  notification.warning({
    title: `The playlist is empty!`,
    duration: 1500,
  });

  const audio = new Audio(
    "../../public/system-sounds/message-notification-103496.mp3"
  );
  audio.volume = 0.2;
  audio.play();
};

const { is_playing, current_track, current_artist, album, tracks } =
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
