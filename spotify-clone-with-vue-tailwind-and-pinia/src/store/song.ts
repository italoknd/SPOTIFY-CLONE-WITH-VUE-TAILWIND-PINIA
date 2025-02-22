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
      tracks: [] as ITrack[],
      album: {} as IAlbum,
      playlist_duration: "",
      acc_duration: 0,
      liked_songs: {
        playlist_id: 99999,
        liked_playlist: true,
        public_playlist: true,
        artist_of_the_album: "Italo Pedroza",
        album: "Liked Songs",
        album_category: "Playlist",
        album_cover: "../../public/images/icons/liked-active.png",
        release_year: "",
        main_color_on_top: "#847AEA",
        main_color_on_bottom: "#5C34F1",
        artist_picture:
          "https://lh3.googleusercontent.com/a/ACg8ocJ-zkH1FfQwQhEAJa5_07Pp2q_HVmFnXS_ce9xYtPHGbnk=s96-c-rg-br100",
        tracks: [],
      } as IAlbum,
    } as ISongStore),
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
      let track = this.tracks[current_track.id - 2];
      let artist = this.tracks[current_track.id - 2].track_artists;
      this.loadSong(artist, track);
    },

    nextSong(current_track: ITrack) {
      if (current_track.id === this.tracks.length) {
        this.playFromTheBeginning();
      } else {
        let track = this.tracks[current_track.id];
        let artist = this.tracks[current_track.id].track_artists;
        this.loadSong(artist, track);
      }
    },

    playFromTheBeginning() {
      this.resetState();
      let track = this.tracks[0];
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
      this.tracks = payload.tracks;

      this.getTotalTimeOfThePlaylist(this.tracks);
    },

    getTotalTimeOfThePlaylist() {
      this.acc_duration = 0;
      this.playlist_duration = "";

      for (let audio of this.tracks) {
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
      if (this.liked_songs.tracks.length) {
        this.tracks.forEach((track: ITrack) => {
          let not_a_saved_album: boolean = !this.liked_songs.tracks.some(
            (likedSong: ITrack) => likedSong.playlist_id === track.playlist_id
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
      this.liked_songs.tracks.push(...this.album.tracks);

      this.liked_songs.tracks = this.liked_songs.tracks.map(
        (track: ITrack, index: number) => {
          return {
            ...track,
            id: index + 1,
          };
        }
      );
    },

    removeAlbumFromLikedPlaylist() {
      this.album.liked_playlist = false;
      this.album_id = this.album.playlist_id;
      this.liked_songs.tracks.forEach((song: ITrack, index: number) => {
        if (song.playlist_id === this.album.playlist_id) {
          this.liked_songs.tracks.splice(index, 1);
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
  persist: true,
});
