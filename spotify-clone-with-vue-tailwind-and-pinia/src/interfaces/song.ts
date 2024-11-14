import { IAlbum, ITrack } from "./albums";

export interface ISong {
  is_playing: boolean;
  audio: HTMLAudioElement;
  current_artist: string;
  current_track: ITrack;
}
