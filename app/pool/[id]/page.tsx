'use client'

import { Button } from '@/src/shared/shadcn/components/ui/button'
import { Card } from '@/src/shared/shadcn/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

const mockPoolData = {
  id: 118740,
  pair: 'ETH/USDT',
  fee: '0.05%',
  liquidityUSD: 4.08,
  liquidity: {
    ETH: {
      amount: 0.711,
      percent: 17,
    },
    USDT: {
      amount: 0.006,
      percent: 83,
    },
  },
  unclaimedFeesUSD: 0.00000069,
  unclaimedFees: {
    ETH: '<0.001',
    USDT: '<0.001',
  },
  priceRange: {
    minPrice: 0.002,
    maxPrice: 0.002,
    unit: 'USDT per ETH',
    descriptionMin: 'Your position will be 100% composed of USDT at this price',
    descriptionMax: 'Your position will be 100% composed of USDT at this price',
  },
  currentPrice: 0.00174,
  currentPriceUnit: 'USDT per ETH',
  ticketRange: {
    minTicket: -36598,
    maxTicket: -36598,
  },
  inRange: true,
}

export default function PoolPage() {
  const data = mockPoolData
  return (
    <div className="flex justify-center gap-10">
      <main className="flex w-full flex-col items-center gap-8">
        <Card className="flex min-h-96 w-full max-w-2xl flex-col border-none p-6">
          <div className="flex justify-between">
            <Button asChild variant="link" size="icon" className="text-primary">
              <Link href="/pool">
                <ChevronLeft />
              </Link>
            </Button>
            <Button variant='link'>
                In range
            </Button>
          </div>
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-purple-700 to-purple-900 text-white p-6 rounded-xl flex flex-col gap-2">
              <div className="text-xl font-semibold">{data.pair}</div>
              <div className="text-sm opacity-70">{data.fee}</div>
              <div className="mt-4 text-sm opacity-70">
                <p>ID: {data.id}</p>
                <p>Min Ticket: {data.ticketRange.minTicket}</p>
                <p>Max Ticket: {data.ticketRange.maxTicket}</p>
              </div>
            </Card>

            <div className="flex flex-col gap-4">
              <Card className="p-4 bg-purple-950/40 border-none">
                <div className="text-sm font-semibold">Liquidity</div>
                <div className="text-xl font-bold">
                  ${data.liquidityUSD.toFixed(2)}
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <div>ETH</div>
                  <div>
                    {data.liquidity.ETH.amount} ({data.liquidity.ETH.percent}%)
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>USDT</div>
                  <div>
                    {data.liquidity.USDT.amount} ({data.liquidity.USDT.percent}
                    %)
                  </div>
                </div>
              </Card>

              <Card className="p-4 flex flex-col gap-2 bg-purple-950/40 border-none">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-semibold">Unclaimed fees</div>
                  <Button variant="secondary" className="text-xs px-3 py-1">
                    Collect Fees
                  </Button>
                </div>
                <div className="text-xl font-bold">
                  ${data.unclaimedFeesUSD}
                </div>
                <div className="flex justify-between text-sm">
                  <div>ETH</div>
                  <div>{data.unclaimedFees.ETH}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>USDT</div>
                  <div>{data.unclaimedFees.USDT}</div>
                </div>
              </Card>
            </div>

            <div className="col-span-full grid grid-cols-2 gap-4">
              <Card className="p-4 bg-purple-950/40 border-none">
                <div className="text-sm">Min price</div>
                <div className="text-2xl font-bold">
                  {data.priceRange.minPrice}
                </div>
                <div className="text-xs opacity-70">{data.priceRange.unit}</div>
                <div className="text-xs mt-1">
                  {data.priceRange.descriptionMin}
                </div>
              </Card>
              <Card className="p-4 bg-purple-950/40 border-none">
                <div className="text-sm">Max price</div>
                <div className="text-2xl font-bold">
                  {data.priceRange.maxPrice}
                </div>
                <div className="text-xs opacity-70">{data.priceRange.unit}</div>
                <div className="text-xs mt-1">
                  {data.priceRange.descriptionMax}
                </div>
              </Card>
            </div>

            <Card className="p-4 col-span-full text-center bg-purple-950/40 border-none">
              <div className="text-sm">Current price</div>
              <div className="text-2xl font-bold">{data.currentPrice}</div>
              <div className="text-xs opacity-70">{data.currentPriceUnit}</div>
            </Card>
          </div>
        </Card>
      </main>
    </div>
  )
}
