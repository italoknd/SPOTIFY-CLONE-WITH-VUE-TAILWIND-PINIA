<template>
  <div class="p-2.5 pb-0 text-white">
    <LatestAlbumsMobile />
    <PickedForYou />
    <Recents class="mt-4" />
  </div>
</template>
<script setup lang="ts">
import LatestAlbumsMobile from "../components/LatestAlbumsMobile.vue";
import PickedForYou from "../components/PickedForYou.vue";
import Recents from "../components/Recents.vue";
</script>
