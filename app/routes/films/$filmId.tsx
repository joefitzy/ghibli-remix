import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getFilmById, Film } from "~/api/films";
import FilmBanner from "~/components/FilmBanner";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, "expected params.filmId");

  const film = await getFilmById(params.filmId);

  console.log("filmId fetch results --> ", film.title);

  return film;
};

export default function FilmId() {
  const film = useLoaderData<Film>();
  return (
    <div>
      <FilmBanner film={film}></FilmBanner>

      <div className="p-10">
        <p>{film.description}</p>
      </div>
    </div>
  );
}
