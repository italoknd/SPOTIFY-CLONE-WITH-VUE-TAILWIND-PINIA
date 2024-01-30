<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";

//ICONS
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";

//HOOKS

//SPECIAL VARIABLES
const router = useRouter();

//VARIABLES
let openMenu = $ref<boolean>(false);

const username = $ref("Italo Pedroza");
const userProfilePicture = $ref(
  "https://lh3.googleusercontent.com/a/ACg8ocJ-zkH1FfQwQhEAJa5_07Pp2q_HVmFnXS_ce9xYtPHGbnk=s96-c-rg-br100"
);

//FUNCTIONS
const toggleOpeness = (param: boolean): void => {
  openMenu = param;
};

const routeTo = (toRoute: string): void => {
  router.push(toRoute);
};
</script>

<template>
  <div>
    <div
      class="w-[calc(100%-230px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
    >
      <div class="flex items-center ml-6">
        <button
          type="button"
          class="rounded-full bg-black p-[1px] cursor-pointer"
        >
          <ChevronLeft fillColor="#fff" :size="30" />
        </button>
        <button
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
            :src="userProfilePicture"
            alt="Profile Picture"
          />
          <div class="text-white text-[14px] mx-1.5 font-semibold">
            {{ username }}
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

    <!--SIDEBAR-->
    <div class="h-[100%] p-6 w-[240px] fixed z-50 bg-black" id="sideNav">
      <div class="w-[200px]">
        <div class="mb-4" @click="routeTo('/')">
          <img
            width="124"
            height="100"
            src="/images/icons/spotify-logo.png"
            alt="Home Icon"
          />
        </div>

        <div class="my-8"/>
<ul>
  <li></li>
</ul>


        <div class="flex mb-4" @click="routeTo('/')">
          <img width="27" src="/images/icons/home-active.png" alt="Home Icon" />
          <p class="text-white font-semibold">Home</p>
        </div>
        <div class="flex">
          <img
            width="27"
            src="/images/icons/search-active.png"
            alt="Search Icon"
          />
          <p class="text-white font-semibold">Search</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
