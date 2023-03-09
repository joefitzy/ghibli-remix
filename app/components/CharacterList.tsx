import { Link } from "@remix-run/react";
import { FilmCharacter } from "~/api/films";

type CharacterListProps = {
  characters?: FilmCharacter[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="flex-1 max-w-md">
      <h3 className="text-3xl">Characters</h3>

      <ul className="flex flex-col space-y-3 my-3">
        {characters?.map((char) => (
          <li>
            <Link
              to={`characters/${char.id}`}
              className="w-full hover:underline p-3 rounded border border-slate-400 inline-block"
            >
              {char.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
