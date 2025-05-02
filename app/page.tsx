import { SwapForm } from "@/src/entities/swap";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] p-8 pb-20 justify-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <SwapForm />
      </main>
    </div>
  );
}
