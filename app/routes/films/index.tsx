import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "react-router";
import { getFilms } from "~/api/films";

// SERVER SIDE CODE
export const loader: LoaderFunction = async () => {
  return getFilms();
};

export const meta: MetaFunction = () => {
  return { title: "Studio Ghibli | Films" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};

// CLIENT SIDE
export default function FilmsIndex() {
  const films = useLoaderData();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>

      <form className="py-5">
        <label className="font-bold">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Search
          </button>{" "}
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3"
          />
        </label>
      </form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((f) => {
          return (
            <div className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer">
              <div>{f.title}</div>
              <img src={f.image} alt={f.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
