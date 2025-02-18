export interface IAlbum {
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
  playlist_cover?: string;
  playlist_owner_picture?: string;
  tracks: ITrack[];
}

export interface ITrack {
  id: number;
  name: string;
  path: string;
  track_artists: string;
}
