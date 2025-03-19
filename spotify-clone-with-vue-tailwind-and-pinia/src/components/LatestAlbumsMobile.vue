<template>
  <div class="rounded-md grid grid-cols-2 gap-2">
    <div v-for="(album, index) in all_albums.slice(0, 8)" :key="index">
      <div
        class="flex bg-neutral-700 rounded-md duration-300 hover:cursor-pointer hover:bg-gray-700"
        @click="selectAlbum(album)"
      >
        <img :src="album.album_cover" class="w-[45px] h-[45px] rounded-s-md" />
        <div class="ml-2 mr-5 flex items-center justify-between w-full">
          <p
            class="font-semibold max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis"
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

const verifyHovering = (item_position: number): boolean => {
  return item_position === index.value && is_hovering.value ? true : false;
};
</script>
