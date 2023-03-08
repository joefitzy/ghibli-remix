export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
};

export type Films = Film[];

const BASE_URL = "https://ghibli.deno.dev/api";
const FILMS_URL = `${BASE_URL}/films`;

export async function getFilms(title?: string | null): Promise<Films> {
  const response = await fetch(FILMS_URL);
  const films: Films = await response.json();
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}

export async function getFilmById(filmId: string) {
  const response = await fetch(`${FILMS_URL}/${filmId}`);
  const film = await response.json();
  return film;
}
