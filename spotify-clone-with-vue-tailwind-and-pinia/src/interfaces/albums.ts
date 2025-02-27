export interface IAlbum {
  playlist_id: number;
  liked_playlist: boolean;
  artist_of_the_album?: string;
  artist_picture?: string;
  main_color_on_top?: string;
  main_color_on_bottom?: string;
  album?: string;
  album_category?: string;
  album_cover?: string;
  release_year?: string;
  public_playlist: boolean;
  playlist_name?: string;
  playlist_owner_picture?: string;
  tracks: ITrack[];
}

export interface ITrack {
  playlist_id: number;
  track_cover: string;
  duration: string;
  id: number;
  name: string;
  path: string;
  track_artists: string;
}
