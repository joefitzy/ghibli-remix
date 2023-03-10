import { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { FilmCharacter, getFilmCharacter } from "~/api/films";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, "expected params.charactersId");

  return getFilmCharacter(params.characterId);
};

function CharacterWrapper({ title, colors, children }: any) {
  return (
    <div className="mb-3">
      <div className="text-3xl mb-2">{title}</div>
      <div className={`p-4 rounded shadow-lg border ${colors}`}>{children}</div>
    </div>
  );
}

export default function CharacterDetails() {
  const { name, gender, age, eye_color, hair_color } =
    useLoaderData<FilmCharacter>();
  return (
    <CharacterWrapper title="Character Details">
      <div className="text-gray-700 font-bold text-xl mb-2">{name}</div>
      <ul className="py-2">
        <li key={"1"}>Gender: {gender}</li>
        <li key={"2"}>Age: {age}</li>
        <li key={"3"}>Eye Color: {eye_color}</li>
        <li key={"4"}>Hair Color: {hair_color}</li>
      </ul>
    </CharacterWrapper>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <CharacterWrapper
        title="Caught Error"
        colors="bg-orange-200 border-orange-600"
      >
        <div className="text-gray-700 font-bold text-xl-mb-2">
          {caught.statusText}
        </div>
        <p>
          {caught.status} {caught.status}
        </p>
      </CharacterWrapper>
    );
  }

  throw new Error("Unknown Error!");
}

export function ErrorBoundary({ error }: any) {
  console.error(error);

  return (
    <CharacterWrapper
      title="Unhandled Error"
      colors="bg-rose-200 border-rose-600"
    >
      <div className="text-gray-700 font-bold text-xl mb-2">
        Uh oh... Sorry something went wrong!
      </div>
      <p>{error?.message}</p>
    </CharacterWrapper>
  );
}
