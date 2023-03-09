export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
};

export type Films = Film[];

const BASE_URL = "https://ghibli.deno.dev/api";
const FILMS_URL = `${BASE_URL}/films`;
const PEOPLE_URL = `${BASE_URL}/people`;

export async function getFilms(title?: string | null) {
  const response = await fetch(FILMS_URL);
  const films: Films = await response.json();
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}

export async function getFilmById(filmId: string) {
  const response = await fetch(`${FILMS_URL}/${filmId}`);
  const film: Film = await response.json();
  const characters = await Promise.all(
    film.people
      .filter((url) => url !== PEOPLE_URL)
      .map((url) => fetch(url).then((res) => res.json()))
  );
  return { ...film, characters };
}
