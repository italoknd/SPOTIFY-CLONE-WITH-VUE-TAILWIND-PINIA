<template>
  <div
    class="hidden w-[calc(100%-230px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 lg:flex items-center justify-between"
  >
    <div class="flex items-center ml-6">
      <button
        @click="router.go(-1)"
        type="button"
        class="rounded-full bg-black p-[1px] cursor-pointer"
      >
        <ChevronLeft fillColor="#fff" :size="30" />
      </button>
      <button
        @click="router.go(1)"
        type="button"
        class="rounded-full bg-black p-[1px] cursor-pointer ml-4"
      >
        <ChevronRight fillColor="#fff" :size="30" />
      </button>
    </div>

    <!--PROFILE INFOS-->
    <button
      @click="toggleOpeness(!openMenu)"
      :class="openMenu ? 'bg-secondary' : 'bg-black'"
      class="bg-black hover:bg-secondary rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer"
    >
      <div class="flex items-center">
        <img
          class="rounded-full"
          width="27"
          :src="userStore.userProfilePicture"
          alt="Profile Picture"
        />
        <div class="text-white text-[14px] mx-1.5 font-semibold">
          {{ userStore.username }}
        </div>
        <ChevronDown v-if="openMenu" fillColor="#fff" :size="25" />
        <ChevronUp v-else fillColor="#fff" :size="25" />
      </div>
    </button>
    <span
      v-if="openMenu"
      class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
    >
      <ul class="text-gray-200 font-semibold text-[14px]">
        <li class="px-3 py-2.5 hover:bg-[#3e3d3d] border-b-gray-600">
          Profile
        </li>
        <li class="px-3 py-2.5 hover:bg-[#3e3d3d] border-b-gray-600">
          Log out
        </li>
      </ul>
    </span>
  </div>
</template>
<script setup lang="ts">
//ICONS
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";

//MODULES
import { useUserStore } from "../../store/user";
import { useRouter } from "vue-router";

//VARIABLES
const router = useRouter();
const userStore = useUserStore();
let openMenu = $ref<boolean>(false);

//FUNCTIONS
const toggleOpeness = (param: boolean): void => {
  openMenu = param;
};
</script>
