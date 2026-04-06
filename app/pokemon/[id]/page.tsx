import Link from "next/link";

export default async function PokemonDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok)
    return <div className="p-10 text-center">Pokémon não encontrado!</div>;

  const pokemon = await response.json();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/pokemon"
          className="inline-flex items-center text-zinc-750 hover:text-red-500 mb-8 transition-colors font-bold"
        >
          ← Voltar para a lista
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-100 dark:border-zinc-800">
          <div className="bg-red-500 p-12 flex justify-center relative">
            <span className="absolute top-10 left-10 text-black-900 text-8xl font-black opacity-50">
              #{id.toString().padStart(3, "0")}
            </span>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-64 h-64 z-10 drop-shadow-2xl"
            />
          </div>

          <div className="p-10 flex flex-col items-center">
            <h1 className="text-5xl font-black capitalize text-zinc-900 dark:text-white mb-4">
              {pokemon.name}
            </h1>

            <div className="flex gap-3 mb-10">
              {pokemon.types.map((t: any) => (
                <span
                  key={t.type.name}
                  className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-sm font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                <p className="text-zinc-900 text-xs font-bold uppercase mb-1">
                  Peso
                </p>
                <p className="text-lg font-bold">{pokemon.weight / 10}kg</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                <p className="text-zinc-900 text-xs font-bold uppercase mb-1">
                  Altura
                </p>
                <p className="text-lg font-bold">{pokemon.height / 10}m</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                <p className="text-zinc-900 text-xs font-bold uppercase mb-1">
                  Habilidade
                </p>
                <p className="text-lg font-bold capitalize">
                  {pokemon.abilities[0].ability.name}
                </p>
              </div>
            </div>

            <div className="w-full mt-10">
              <p className="text-zinc-900 text-xs font-bold uppercase mb-4 text-center">
                Status Base
              </p>
              {pokemon.stats.map((s: any) => (
                <div key={s.stat.name} className="mb-3">
                  <div className="flex justify-between text-sm mb-1 capitalize">
                    <span className="font-medium">{s.stat.name}</span>
                    <span className="font-bold">{s.base_stat}</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${(s.base_stat / 150) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
