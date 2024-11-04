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
  
  const albumStore = useSelectAlbumStore();
  const album_details = ref<IAlbum>(albumStore.album);
  </script>