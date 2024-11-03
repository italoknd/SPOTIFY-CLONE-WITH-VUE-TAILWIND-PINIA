import { IAlbum } from "../interfaces/albums";
import { defineStore } from "pinia";

export const useSelectAlbumStore = defineStore("selected_album", {
  state: () => ({ album: {} as IAlbum }),
  getters: {
    selected_album: (state) => state.album,
  },
  actions: {
    getSelectedAlbum(payload: IAlbum) {
      this.album = payload;
    },
  },
});
