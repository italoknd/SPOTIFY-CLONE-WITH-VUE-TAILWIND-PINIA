import { IAlbum, ITrack } from "./albums";

export interface ISongStore {
  album_id: number;
  is_playing: boolean;
  audio: HTMLAudioElement;
  current_artist: string;
  current_track: ITrack;
  playlist_duration: string;
  acc_duration: number;
  liked_songs: IAlbum;
  album: IAlbum;
  tracks: ITrack[];
  all_albums: IAlbum[];
}
