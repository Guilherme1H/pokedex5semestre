import PokemonCard from "./_components/pokemon-card";
import Link from "next/link";

export default async function PokedexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const searchTerm = q?.toLowerCase() || "";

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=300");
  const data = await response.json();

  const pokemons = data.results.filter((p: any) => {
    const id = p.url.split("/").filter(Boolean).pop();
    return p.name.includes(searchTerm) || id === searchTerm;
  });

  return (
    <div className="mx-auto max-w-5xl p-6 min-h-screen bg-white dark:bg-zinc-950">
      <header className="flex flex-col items-center mb-10 pb-6 border-b border-zinc-100 dark:border-zinc-800">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
          Pokédex
        </h1>

        <form action="/pokemon" className="w-full max-w-md flex gap-2">
          <input
            name="q"
            defaultValue={searchTerm}
            placeholder="Nome ou ID"
            className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 focus:border-red-400 focus:ring-1 focus:ring-red-400 outline-none transition-all dark:bg-zinc-900 dark:border-zinc-800"
          />
          <button className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Buscar
          </button>
        </form>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemons.map((pokemon: any) => {
          const id = pokemon.url.split("/").filter(Boolean).pop();
          return <PokemonCard key={id} id={Number(id)} name={pokemon.name} />;
        })}
      </div>

      {pokemons.length === 0 && (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl mt-10">
          <p className="text-zinc-800 text-lg">
            Nenhum Pokémon encontrado para "{searchTerm}".
          </p>
          <Link
            href="/pokemon"
            className="text-red-800 hover:underline mt-2 inline-block"
          >
            Limpar busca
          </Link>
        </div>
      )}
    </div>
  );
}
