import { defineStore } from "pinia";

export const useScreenStore = defineStore("screen", {
  state: () => ({
    showMobileHeader: true,
  }),
  getters: {
    _showMobileHeader(): boolean {
      return this.showMobileHeader;
    },
  },
  actions: {
    deactivateHeader(param: boolean) {
      this.showMobileHeader = param;
    },
  },
  persist: false,
});
