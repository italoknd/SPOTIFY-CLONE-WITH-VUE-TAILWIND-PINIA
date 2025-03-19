<template>
  <div
    class="w-full h-[60px] pl-2 fixed gap-2 right-0 z-20 bg-[#101010] flex items-center text-[10px]"
  >
    <button
      @click="toggleOpeness(!openMenu)"
      :class="openMenu ? 'bg-secondary' : 'bg-black'"
      class="mt-2 bg-neutral-700 hover:bg-secondary rounded-full p-[1px] mr-2 cursor-pointer"
    >
      <img
        class="rounded-full"
        width="35"
        :src="userStore.userProfilePicture"
        alt="Profile Picture"
      />
    </button>
    <button
      class="p-2 rounded-full text-white"
      @click="router.push('/')"
      :class="route.path === '/' ? 'bg-[#23CF5F]' : 'bg-neutral-700'"
    >
      Home
    </button>
    <button
      class="p-2 rounded-full text-white"
      @click="router.push('/library')"
      :class="route.path === '/library' ? 'bg-[#23CF5F]' : 'bg-neutral-700'"
    >
      Library
    </button>
    <button
      class="p-2 rounded-full text-white"
      @click="router.push('/liked')"
      :class="route.path === '/liked' ? 'bg-[#23CF5F]' : 'bg-neutral-700'"
    >
      Liked Songs
    </button>
  </div>
</template>
<script setup lang="ts">
//MODULES
import { useUserStore } from "../../store/user";
import { useRoute, useRouter } from "vue-router";

//VARIABLES
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
let openMenu = $ref<boolean>(false);

//FUNCTIONS
const toggleOpeness = (param: boolean): void => {
  openMenu = param;
};
</script>
