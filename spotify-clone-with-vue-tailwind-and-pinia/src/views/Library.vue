<template>
  <div
    class="p-8 text-white rounded-md grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6"
  >
    <div v-for="(album, index) in albums" :key="index">
      <div
        class="flex bg-gray-600 rounded-md duration-300 hover:cursor-pointer hover:bg-gray-700"
      > 
        <img
          @click="selectAlbum(album)"
          :src="album.album_cover"
          class="w-[60px] h-[60px] rounded-s-md"
        />
        <div class="ml-3 mr-5 flex items-center justify-between w-full">
          <p
            @click="selectAlbum(album)"
            class="font-semibold w-[60px] xl:max-w-[160px] md:max-w-[100px] sm:w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ album.album }}
          </p>
          <div class="circle">
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
import all_albums from "../../artist.json";

//ICONS
import Play from "vue-material-design-icons/Play.vue";

//VARS
const router = useRouter();
const albums = ref<IAlbum[]>(all_albums);
const albumStore = useSongStore();

//FUNCTIONS
const selectAlbum = (selected_album: IAlbum) => {
  albumStore.getSelectedAlbum(selected_album);
  router.push("/selected-album");
};
</script>
