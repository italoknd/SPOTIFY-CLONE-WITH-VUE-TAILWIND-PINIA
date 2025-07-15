<template>
  <div class="p-2 text-white md:mb-0 mb-[120px]">
    <div v-for="(album, index) in all_albums" :key="index">
      <div
        class="flex rounded-md duration-300 hover:cursor-pointer pb-3"
        @mouseenter="getItem(true, index)"
        @mouseleave="getItem(false, index)"
        @click="selectAlbum(album)"
      >
        <img :src="album.album_cover" class="w-14 h-14" />
        <div class="ml-3 mr-5 flex items-center justify-between w-full">
          <div>
            <p class="text-md font-semibold w-full">
              {{ album.album }}
            </p>
            <p
              class="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[300px]"
            >
              {{ album.album_category }} • {{ album.artist_of_the_album }}
            </p>
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

const getItem = (hovering: boolean, item_position: number) => {
  index.value = item_position;
  hovering ? (is_hovering.value = true) : (is_hovering.value = false);
};
</script>
