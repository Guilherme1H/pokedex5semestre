import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Pokédex App</h1>
      <Link
        href="/pokemon"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-colors"
      >
        Entrar na Pokédex
      </Link>
    </div>
  );
}
