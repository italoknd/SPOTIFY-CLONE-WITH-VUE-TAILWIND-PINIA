<template>
  <div
    class="p-8 text-white rounded-md grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
  >
    <div v-for="(album, index) in all_albums" :key="index">
      <div
        class="flex bg-gray-600 rounded-md duration-300 hover:cursor-pointer hover:bg-gray-700"
        @mouseenter="getItem(true, index)"
        @mouseleave="getItem(false, index)"
        @click="selectAlbum(album)"
      >
        <img :src="album.album_cover" class="w-[60px] h-[60px] rounded-s-md" />
        <div class="ml-3 mr-5 flex items-center justify-between w-full">
          <p
            class="font-semibold w-[60px] xl:max-w-[160px] md:max-w-[100px] sm:w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ album.album }}
          </p>
          <div
            @click.stop="playSelectedPlaylist(album)"
            v-if="verifyHovering(index)"
            class="circle"
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
import { ref } from "vue";
import { storeToRefs } from "pinia";

const { all_albums } = storeToRefs(useSongStore());

//ICONS
import Play from "vue-material-design-icons/Play.vue";

//VARS
let index = ref<number | null>(null);
let is_hovering = ref<boolean>(false);
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

const getItem = (hovering: boolean, item_position: number) => {
  index.value = item_position;
  hovering ? (is_hovering.value = true) : (is_hovering.value = false);
};

const verifyHovering = (item_position: number): boolean => {
  return item_position === index.value && is_hovering.value ? true : false;
};
</script>
