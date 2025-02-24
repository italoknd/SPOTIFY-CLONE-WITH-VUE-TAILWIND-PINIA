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
        album_cover: "/images/icons/liked-active.png",
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

        this.verifyAndApplyNavigatorMediaSession();
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

      this.getTotalTimeOfThePlaylist();
    },

    getTotalTimeOfThePlaylist() {
      this.acc_duration = 0;
      this.playlist_duration = "";

      for (let audio of this.tracks) {
        let audioElement = new Audio();
        audioElement.src = audio.path;

        audioElement.addEventListener("loadedmetadata", () => {
          const duration: number = audioElement.duration;
          this.acc_duration += duration;

          const acc_minutes = Math.floor(this.acc_duration / 60);
          const acc_seconds = Math.floor(this.acc_duration - acc_minutes * 60);

          const minutes = Math.floor(duration / 60);
          const seconds = Math.floor(duration - minutes * 60);

          const extended_duration = `${acc_minutes}min ${acc_seconds
            .toString()
            .padStart(2, "0")}secs`;
          const short_duration = `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;

          this.playlist_duration = extended_duration;
          audio.duration = short_duration;
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

    verifyAndApplyNavigatorMediaSession(): void {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: this.current_track.name,
          artist: this.current_track.track_artists,
          album: this.album.album,
          artwork: [{ src: this.current_track.track_cover }],
        });

        navigator.mediaSession.setActionHandler("play", () => {
          this.playOrPauseSong();
        });

        navigator.mediaSession.setActionHandler("pause", () => {
          this.playOrPauseSong();
        });

        navigator.mediaSession.setActionHandler("previoustrack", () => {
          this.prevSong(this.current_track);
        });

        navigator.mediaSession.setActionHandler("nexttrack", () => {
          this.nextSong(this.current_track);
        });
      }
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
