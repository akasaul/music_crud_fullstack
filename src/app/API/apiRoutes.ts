const bases = {
  auth: "/auth",
  stats: "/stats",
  song: "/songs",
};

const user = {
  signin: `${bases.auth}/login`,
  signup: `${bases.auth}/signup`,
};

const stats = {
  overview: `${bases.stats}/overview`,
  songsPerGenre: `${bases.stats}/songs-per-genre`,
  songperAlbumsPerArtist: `${bases.stats}/songs-albums-per-artist`,
  songsPerAlbum: `${bases.stats}/songs-per-album`,
};

const song = {
  base: `${bases.song}`,
  library: `${bases.song}/library`,
  favorites: `${bases.song}/favorites`,
  mySongs: `${bases.song}/library/my-songs`,
  searchSongs: `${bases.song}/search`,
};

const apiRoutes = { user, stats, song };
export default apiRoutes;
