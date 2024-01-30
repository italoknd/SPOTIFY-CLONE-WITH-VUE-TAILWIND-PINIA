<script setup lang="ts">
import { useRoute } from "vue-router";
import { IMenuItems } from "../interfaces/menuItemsProps";

const route = useRoute();
const props = defineProps<IMenuItems>();
</script>
<template>
  <div></div>
</template>
