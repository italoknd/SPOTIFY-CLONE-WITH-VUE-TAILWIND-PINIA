<script setup lang="ts">
//COMPONENTS
import MusicPlayer from "./components/MusicPlayer.vue";
import MenuItem from "./components/MenuItem.vue";
import HeaderDesktop from "./components/Header/HeaderDesktop.vue";
import HeaderMobile from "./components/Header/HeaderMobile.vue";
import MenuItemsMobile from "./components/MenuItemsMobile.vue";

//MODULES
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, watch } from "vue";

//SCRIPTS
import { side_items, side_items_p2 } from "./scripts/sideItems";

//STUFF FROM PINIA
import { useSongStore } from "./store/song";
import FloatingMusicPlayer from "./components/FloatingMusicPlayer.vue";
const useSong = useSongStore();
const { is_playing, current_track } = storeToRefs(useSong);

//VARIABLES
const router = useRouter();
let isMobile = $ref(window.innerWidth < 768);

//HOOKS
onMounted(() => {
  is_playing.value = false;
  setTimeout(() => useSong.verifyAndApplyNavigatorMediaSession(), 1000);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});

watch(
  () => window.innerWidth,
  () => {
    checkScreenSize();
  }
);

//FUNCTIONS
const routeTo = (toRoute: string): void => {
  router.push(toRoute);
};

const checkScreenSize = () => {
  isMobile = window.innerWidth < 768;
};
</script>

<template>
  <div>
    <n-notification-provider>
      <!--HEADER-->
      <component :is="isMobile ? HeaderMobile : HeaderDesktop" />

      <!--SIDEBAR-->
      <div
        class="h-[100%] p-6 w-[240px] fixed z-50 bg-black hidden lg:block"
        id="sideNav"
      >
        <div class="w-[200px] cursor-pointer">
          <div class="mb-4" @click="routeTo('/')">
            <img
              width="124"
              height="100"
              src="/images/icons/spotify-logo.png"
              alt="Home Icon"
            />
          </div>

          <div class="my-8" />
          <ul>
            <RouterLink
              v-for="(
                { iconSize, iconString, name, pageURL, style }, index
              ) in side_items"
              :key="index"
              :to="pageURL"
            >
              <MenuItem
                :iconSize="iconSize"
                :name="name"
                :iconString="iconString"
                :pageURL="pageURL"
                :class="style"
              />
            </RouterLink>
            <div class="py-3.5" />
            <RouterLink
              v-for="(
                { iconSize, iconString, name, pageURL, style }, index
              ) in side_items_p2"
              :key="index"
              :to="pageURL"
            >
              <MenuItem
                :iconSize="iconSize"
                :name="name"
                :iconString="iconString"
                :pageURL="pageURL"
                :class="style"
              />
            </RouterLink>
          </ul>
          <div class="border-b border-b-gray-700" />
          <ul class="text-white">
            <li class="font-semibold text-[15px] mt-3 hover:text-white">
              My Playlist #1
            </li>
            <li class="font-semibold text-[15px] mt-3 hover:text-white">
              My Playlist #2
            </li>
            <li class="font-semibold text-[15px] mt-3 hover:text-white">
              My Playlist #3
            </li>
            <li class="font-semibold text-[15px] mt-3 hover:text-white">
              My Playlist #4
            </li>
          </ul>
        </div>
      </div>
      <div
        class="fixed right-0 top-0 w-full lg:w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1c1c1c] to-black"
      >
        <div class="mt-[70px]" />
        <RouterView />
        <div class="mb-[55px] md:mb-[100px]" />
        <span
          v-if="isMobile"
          class="p-3 flex justify-between items-center fixed bottom-0 w-full z-50 h-[55px] bg-[#181818] border-t border-t-[#272727]"
        >
          <RouterLink
            v-for="(
              { iconSize, iconString, name, pageURL, style }, index
            ) in side_items"
            :key="index"
            :to="pageURL"
          >
            <MenuItemsMobile
              :iconSize="iconSize"
              :name="name"
              :iconString="iconString"
              :pageURL="pageURL"
              :class="style"
            />
          </RouterLink>
        </span>
      </div>
      <MusicPlayer v-if="Object.keys(current_track).length && !isMobile" />
      <FloatingMusicPlayer
        v-if="Object.keys(current_track).length && isMobile"
      />
    </n-notification-provider>
  </div>
</template>
