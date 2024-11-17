import { IAlbum, ITrack } from "./albums";

export interface ISongStore {
  is_playing: boolean;
  audio: HTMLAudioElement;
  current_artist: string;
  current_track: ITrack;
  album: IAlbum
}
