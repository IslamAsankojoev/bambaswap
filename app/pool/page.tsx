import { SwapForm } from "@/src/entities/swap";

export default function Pool() {
  return (
    <div className="flex justify-center gap-10">
      <main className="flex flex-col gap-8 items-center w-full">
        <p className="font-extrabold text-5xl w-full text-center bg-gradient-to-r from-purple-300 to-purple-700 bg-clip-text text-transparent">Bamba Swap</p>
        <SwapForm />
      </main>
    </div>
  );
}
