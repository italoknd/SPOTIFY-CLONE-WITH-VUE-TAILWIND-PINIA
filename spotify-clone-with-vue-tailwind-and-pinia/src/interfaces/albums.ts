export interface IAlbum {
  artist_of_the_album?: string;
  album?: string;
  album_category?: string;
  album_cover?: string;
  release_year?: string;
  public_playlist?: boolean;
  playlist_name?: string;
  playlist_cover?: string;
  tracks: ITrack[];
}

export interface ITrack {
  id: number;
  name: string;
  path: string;
}