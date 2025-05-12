'use client'

import { Inbox, MoveHorizontal, Plus } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/src/shared/shadcn/components/ui/button'
import { Card } from '@/src/shared/shadcn/components/ui/card'
import { useRouter } from 'next/navigation'

const pools = [
  {
    id: '1',
    name: 'ETH/USDC',
    firstPair: 'ETH',
    secondPair: 'USDC',
    fee: '0.05%',
    minPrice: '0.0001',
    maxPrice: '1000',
    price: '0.5',
    liquidity: '1000',
    volume: '100',
    fees: '0.5',
  },
]

export default function Pool() {
  const router = useRouter()
  return (
    <div className="flex justify-center gap-10">
      <main className="flex w-full flex-col items-center gap-8">
        <Card className="min-h-96 w-full max-w-2xl border-none p-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Positions</h2>
            <Button asChild>
              <Link href="/pool/new-position">
                <Plus /> New Position
              </Link>
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            {pools.length > 0 ? (
              pools.map((pool) => (
                <Card
                  key={pool.id}
                  className="w-full p-4 bg-purple-950/60 hover:bg-purple-950/90 transition border-none flex flex-col gap-2 cursor-pointer"
                  onClick={() => {
                    router.push(`/pool/${pool.id}`)
                  }}
                >
                  <h3 className="text-2xl font-bold">{pool.name}</h3>
                  <div className="flex gap-2 text-sm items-center">
                    <p>
                      Min {pool.minPrice} {pool.firstPair} per {pool.secondPair}
                    </p>
                    <MoveHorizontal />
                    <p>
                      Max {pool.maxPrice} {pool.firstPair} per {pool.secondPair}
                    </p>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Inbox size={70} />
                <p className="text-md text-gray-400">No positions found.</p>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
