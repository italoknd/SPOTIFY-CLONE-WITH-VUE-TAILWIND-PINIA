import { defineStore } from "pinia";
import { ISongStore } from "../interfaces/song";
import { IAlbum, ITrack } from "../interfaces/albums";

import albums from "../../artist.json";

export const useSongStore = defineStore("song", {
  state: () =>
    ({
      is_playing: false,
      audio: {} as HTMLAudioElement,
      current_artist: "",
      current_track: {} as ITrack,
      album: {} as IAlbum,
    } as ISongStore),
  getters: {
    selected_album: (state) => state.album,
  },
  actions: {
    loadSong(artist: string, track: ITrack) {
      this.current_artist = artist;
      this.current_track = track;

      if (this.audio && this.audio.src) {
        this.audio.pause();
        this.is_playing = false;
        this.audio.src = "";
      }

      this.audio = new Audio();
      this.audio.src = track.path;

      setTimeout(() => {
        this.is_playing = true;
        this.audio.play();
      }, 200);
    },

    playOrPauseSong() {
      if (this.audio.paused) {
        this.is_playing = true;
        this.audio.play();
        return;
      }

      this.is_playing = false;
      this.audio.pause();
    },

    playOrPauseThisSong(artist: string, track: ITrack) {
      if (
        !this.audio ||
        !this.audio.src ||
        this.current_track.id !== track.id
      ) {
        this.loadSong(artist, track);
        return;
      }

      this.playOrPauseSong();
    },

    prevSong(current_track: ITrack) {
      let track = this.album.tracks[current_track.id - 2];
      let artist = this.album.tracks[current_track.id - 2].track_artists;
      this.loadSong(artist, track);
    },

    nextSong(current_track: ITrack) {
      if (current_track.id === this.album.tracks.length) {
        this.playFromTheBeginning();
      } else {
        let track = this.album.tracks[current_track.id];
        let artist = this.album.tracks[current_track.id].track_artists;
        this.loadSong(artist, track);
      }
    },

    playFromTheBeginning() {
      this.resetState();
      let track = this.album.tracks[0];
      this.loadSong(track.name, track);
    },

    getSelectedAlbum(payload: IAlbum) {
      this.album = payload;
    },

    resetState() {
      this.is_playing = false;
      this.audio = {} as HTMLAudioElement;
      this.current_artist = "";
      this.current_track = {} as ITrack;
    },
  },
});
