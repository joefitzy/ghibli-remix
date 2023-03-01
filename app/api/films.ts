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

export async function getFilms(): Promise<Films> {
  const response = await fetch("https://ghibli.deno.dev/api/films");
  return response.json();
}
