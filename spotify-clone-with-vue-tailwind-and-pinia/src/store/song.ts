import { defineStore } from "pinia";
import { ISong } from "../interfaces/song";
import { IAlbum } from "../interfaces/albums";

import albums from '../../artist.json'

export const useSongStore = defineStore("song", {
  state: () =>
    ({
      is_playing: false,
      audio: {} as HTMLAudioElement,
      current_artist: "",
      current_track: {} as IAlbum,
    } as ISong),
  actions: {    
    loadSong(artist: string, track: IAlbum) {
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

    playOrPauseThisSong(artist, track) {
      if (
        !this.audio ||
        !this.audio.src ||
        this.current_track.id !== track.id
      ) {
        this.loadSong(artist, track);
        return;
      }

      this.playOrPauseSong()
    },

    prevSong(current_track){
        //passo 1: pegar a musica atual do album e voltar 2 indices
        //passo 2: pegar resultado e passar para a função que carrega a musica
        let track = albums.tracks[current_track]- 2]
        this.loadSong(albums, track)
    },

    nextSong(current_track){
        //passo 1: verificar se a musica atual é a ultima, caso seja, retornar para a primeira musica atribuindo a posição 0 da lista de musicas a uma variavel e passar a mesma para a função loadSong

        //passo 2: caso nao seja a ultima musica, pular para a proxima

        if(current_track.id === albums.tracks.length){
            this.playFromTheBeginning()
        }else{
            let track = albums.tracks[current_track.id]
            this.loadSong(albums, track)
        }
    },

    playFromTheBeginning(){
        this.resetState()
        let track = albums.tracks[0]
        this.loadSong(albums, track)
    },

    resetState(){
        this.is_playing = false,
        this.audio = {} as HTMLAudioElement,
        this.current_artist = "",
        this.current_track = {} as IAlbum,
    }
  },
});
