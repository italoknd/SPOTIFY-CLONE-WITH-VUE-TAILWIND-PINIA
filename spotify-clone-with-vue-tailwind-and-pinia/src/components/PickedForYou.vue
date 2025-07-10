<template>
  <div>
    <h3 class="text-[20px] my-3"><strong>Picked for you</strong></h3>
    <div
      class="h-[150px] flex bg-neutral-700 rounded-md duration-300 hover:cursor-pointer hover:bg-gray-700"
      @click="selectAlbum(all_albums[9])"
    >
      <img
        :src="all_albums[9].album_cover"
        class="w-[150px] h-[150px] rounded-s-md"
      />
      <div class="ml-2 mt-4 w-full">
        <p class="text-sm">{{ all_albums[9].album_category }}</p>
        <p
          class="font-semibold max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ all_albums[9].album }} by {{ all_albums[9].artist_of_the_album }}
        </p>
        <div class="flex place-items-end h-2/4 justify-end mr-4 mt-4">
          <div
            @click.stop="playSelectedPlaylist(all_albums[9])"
            class="circle w-[30px] h-[30px] bg-[#23CF5F] rounded-full flex items-center justify-center"
          >
            <Play :size="25" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//INTERFACES, DATA AND MODULES
import { IAlbum } from "../interfaces/albums";
import { useSongStore } from "../store/song";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const { all_albums } = storeToRefs(useSongStore());

//ICONS
import Play from "vue-material-design-icons/Play.vue";

//VARS
const router = useRouter();
const albumStore = useSongStore();

//FUNCTIONS
const selectAlbum = (selected_album: IAlbum) => {
  albumStore.getSelectedAlbum(selected_album);
  router.push("/selected-album");
};

const playSelectedPlaylist = (selected_album: IAlbum) => {
  albumStore.getSelectedAlbum(selected_album);
  albumStore.playSelectedPlaylist();
};
</script>
