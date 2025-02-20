import { defineStore } from "pinia";
import { ISongStore } from "../interfaces/song";
import { IAlbum, ITrack } from "../interfaces/albums";
import all_albums from "../../artist.json";

export const useSongStore = defineStore("song", {
  state: () =>
    ({
      album_id: 0 as number,
      all_albums: all_albums as IAlbum[],
      is_playing: false,
      audio: {} as HTMLAudioElement,
      current_artist: "",
      current_track: {} as ITrack,
      album: {} as IAlbum,
      playlist_duration: "",
      acc_duration: 0,
      liked_songs: [] as IAlbum[],
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

        localStorage.setItem(
          "song",
          JSON.stringify({
            audio: this.audio,
            current_artist: this.current_artist,
            current_track: this.current_track,
            is_playing: this.is_playing,
          })
        );
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

    playSelectedPlaylist() {
      if (this.audio.src) {
        this.playOrPauseSong();

        this.playFromTheBeginning();
        return;
      }

      this.playFromTheBeginning();
    },

    getSelectedAlbum(payload: IAlbum) {
      this.album = payload;

      this.getTotalTimeOfThePlaylist(this.album.tracks);
    },

    getTotalTimeOfThePlaylist(tracks: ITrack[]) {
      this.acc_duration = 0;
      this.playlist_duration = "";

      for (let audio of tracks) {
        let audio2 = new Audio();
        audio2.src = audio.path;

        audio2.addEventListener("loadedmetadata", () => {
          const duration: number = audio2.duration;
          this.acc_duration += duration;

          const minutes = Math.floor(this.acc_duration / 60);
          const seconds = Math.floor(this.acc_duration - minutes * 60);

          this.playlist_duration = `${minutes}min ${seconds
            .toString()
            .padStart(2, "0")}secs`;
        });
      }
    },

    saveOrRemoveAlbumFromLikedPlaylist() {
      if (this.liked_songs.length) {
        this.album.tracks.forEach((track: IAlbum) => {
          let not_a_saved_album: boolean = !this.liked_songs.some(
            (likedSong: IAlbum) => likedSong.playlist_id === track.playlist_id
          );

          if (not_a_saved_album) {
            this.saveAlbumOnLikedPlaylist();
          } else {
            this.removeAlbumFromLikedPlaylist();
          }
        });
        return;
      }

      this.saveAlbumOnLikedPlaylist();
    },

    saveAlbumOnLikedPlaylist() {
      this.album_id = this.album.playlist_id;
      this.album.liked_playlist = true;
      this.liked_songs.push(...this.album.tracks);
    },

    removeAlbumFromLikedPlaylist() {
      this.album.liked_playlist = false;
      this.album_id = this.album.playlist_id;
      this.liked_songs.forEach((song: IAlbum, index: number) => {
        if (song.playlist_id === this.album.playlist_id) {
          this.liked_songs.splice(index, 1);
        }
      });
    },

    resetState() {
      this.is_playing = false;
      this.audio = {} as HTMLAudioElement;
      this.current_artist = "";
      this.current_track = {} as ITrack;
      this.acc_duration = 0;
      this.playlist_duration = "";
    },
  },
  persist: false,
});
