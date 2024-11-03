export interface IAlbum {
  artist_of_the_album: string;
  album: string;
  album_category: string;
  album_cover: string;
  release_year: string;
  tracks: ITrack[];
}

export interface ITrack {
  id: number;
  name: string;
  path: string;
}
