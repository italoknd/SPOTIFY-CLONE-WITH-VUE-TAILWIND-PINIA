<template>
  <div>
    <h3 class="text-[20px] my-3"><strong>Recents</strong></h3>
    <div class="flex overflow-x-auto whitespace-nowrap scrollbar-hide">
      <div
        v-for="(album, index) in all_albums.slice(8, 16)"
        :key="index"
        class=""
      >
        <div class="w-[120px] mr-4" @click="selectAlbum(album)">
          <img :src="album.album_cover" class="w-[120px] h-[120px] rounded-md" />
          <p
            class="font-semibold max-w-[90px] whitespace-nowrap overflow-hidden text-ellipsis mt-2"
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
