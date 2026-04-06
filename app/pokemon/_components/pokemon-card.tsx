import Link from "next/link";

type PokemonCardProps = {
  id: number;
  name: string;
};

export default function PokemonCard({ id, name }: PokemonCardProps) {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="group relative flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm border border-zinc-100 transition-all hover:-translate-y-2 hover:shadow-xl dark:bg-zinc-900 dark:border-zinc-800">
        <span className="absolute top-4 right-6 text-zinc-900 font-black text-2xl group-hover:text-red-400 transition-colors">
          #{id.toString().padStart(3, "0")}
        </span>

        <img
          src={imageUrl}
          alt={name}
          className="h-32 w-32 drop-shadow-md z-10"
        />

        <h2 className="mt-4 text-xl font-bold capitalize text-zinc-900 dark:text-zinc-800">
          {name}
        </h2>

        <div className="mt-2 h-1 w-10 bg-red-500 rounded-full transition-all group-hover:w-20" />
      </div>
    </Link>
  );
}
