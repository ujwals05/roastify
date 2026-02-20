export const buildArtistContext = (artists: any[]) => {
  return artists
    .map(
      (artist, index) =>
        `${index + 1}. ${artist.name} 
Genres: ${artist.genres.join(", ")} 
Popularity: ${artist.popularity}`,
    )
    .join("\n\n");
};
