'use client'

/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import { ChevronLeft, Settings } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { L1_CHAIN_IDS } from '@/src/shared/constants/chains'
import { getChainInfo } from '@/src/shared/lib/chainInfo'
import { Button } from '@/src/shared/shadcn/components/ui/button'
import { Card } from '@/src/shared/shadcn/components/ui/card'
import { Input } from '@/src/shared/shadcn/components/ui/input'
import { Label } from '@/src/shared/shadcn/components/ui/label'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/src/shared/shadcn/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/shadcn/components/ui/select'
import { Separator } from '@/src/shared/shadcn/components/ui/separator'

import { poolCreateFormScheme } from '@/src/entities/pool/model/scheme'
import { SwapSelectToken } from '@/src/entities/swap'

const fees = [
  { value: 0.01, label: '0.01%', title: 'Best for very stable pairs' },
  { value: 0.05, label: '0.05%', title: 'Best for stable pairs' },
  { value: 0.3, label: '0.3%', title: 'Best for most pairs' },
  { value: 1, label: '1%', title: 'Best for exotic pairs' },
]

export default function NewPosition() {
  const form = useForm<z.infer<typeof poolCreateFormScheme>>({
    defaultValues: {
      chain: L1_CHAIN_IDS[0],
      firstPair: undefined,
      secondPair: undefined,
      fee: 0.3,
      lowPrice: 0,
      highPrice: 0,
      amount: 0,
      depositFirstTokenAmount: 0,
      depositSecondTokenAmount: 0,
    },
  })

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
            <h2 className="text-2xl font-bold">Add liquidity</h2>
            <div className="flex gap-2">
              <Button variant="link">Clear all</Button>
              <Button variant="link">
                <Settings size={30} />
              </Button>
            </div>
          </div>
          <Separator className="bg-white/10" />
          <div className="flex flex-col gap-4">
            <Select
              onValueChange={(value) => form.setValue('chain', Number(value))}
              value={form.watch('chain').toString()}
            >
              <SelectTrigger className="py-6">
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {L1_CHAIN_IDS.map((chainId) => {
                    const chainInfo = getChainInfo(chainId)
                    const imageUrl = (chainInfo.circleLogoUrl ||
                      chainInfo.defaultListUrl ||
                      chainInfo.logoUrl ||
                      '') as {
                      src: string
                    }
                    return (
                      <SelectItem key={chainId} value={chainId.toString()}>
                        <div className="flex items-center gap-2">
                          <img
                            src={imageUrl.src}
                            width={20}
                            height={20}
                            alt="chain-logo"
                          />
                          <p>{chainInfo.label}</p>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Label className="ml-2 flex">Set pairs</Label>
            <div className="flex w-full justify-stretch gap-4">
              <div className="grow">
                <SwapSelectToken
                  handleToken={(value) => {
                    form.setValue('firstPair', value)
                  }}
                  token={form.watch('firstPair')!}
                />
              </div>
              <div className="grow">
                <SwapSelectToken
                  handleToken={(value) => {
                    form.setValue('secondPair', value)
                  }}
                  token={form.watch('secondPair')!}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <Label className="ml-2 flex">Fee</Label> */}
              <div className="relative flex items-center gap-2">
                <Input
                  className="py-6 pb-10"
                  inputMode="numeric"
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue('fee', Number(value))
                  }}
                  value={
                    form.watch('fee')
                      ? `${form.watch('fee')}% fee tier`
                      : 'Fee tier'
                  }
                />
                <p className="text-muted-foreground absolute bottom-3 left-3 text-[10px]">
                  The % you will earn in fees.
                </p>
              </div>
            </div>
            <div>
              <RadioGroup defaultValue="option-one">
                <div className="grid grid-cols-4 justify-between gap-2">
                  {fees.map((fee) => (
                    <div
                      key={fee.value}
                      className={clsx(
                        'bg-input/30 flex grow col-span-2 md:col-span-1 cursor-pointer flex-col gap-2 rounded-sm border p-2 hover:border-white',
                        form.watch('fee') === fee.value
                          ? 'border-primary'
                          : 'border-transparent',
                      )}
                      onClick={() => {
                        form.setValue('fee', fee.value)
                      }}
                    >
                      <RadioGroupItem
                        id={`fee-${fee.value}`}
                        value={fee.value.toString()}
                        className="hidden"
                      />
                      <p className="cursor-pointer text-sm">{fee.label}</p>
                      <p className="text-xs">{fee.title}</p>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center gap-2">
                <Label className="left-3 flex absolute top-3 text-[10px]">
                  Low price
                </Label>
                <Input
                  className="py-10 !font-bold !text-xl"
                  inputMode="numeric"
                  {...form.register('lowPrice')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue('lowPrice', Number(value))
                  }}
                />
                <p className="absolute bottom-3 left-3 text-[10px]">
                  {form.watch('secondPair')?.symbol} per{' '}
                  {form.watch('firstPair')?.symbol}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative flex items-center gap-2">
                <Label className="left-3 flex absolute top-3 text-[10px]">
                  Hight price
                </Label>
                <Input
                  className="py-10 !font-bold !text-xl"
                  inputMode="numeric"
                  {...form.register('highPrice')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue('highPrice', Number(value))
                  }}
                />
                <p className="absolute bottom-3 left-3 text-[10px]">
                  {form.watch('secondPair')?.symbol} per{' '}
                  {form.watch('firstPair')?.symbol}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <Label className="ml-2 flex">Hight price</Label> */}
              <div className="relative flex items-center gap-2">
                <Input
                  className="py-6 !font-bold !text-xl"
                  inputMode="numeric"
                  {...form.register('amount')}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue('amount', Number(value))
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-sm px-4">
                <span>Starting MATIC Price:</span> <span>3 AAVE per MATIC</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label className="ml-2 flex">Deposit amounts</Label>
                <div className="relative flex items-center gap-2">
                  <Input
                    className="py-6 pb-10 !font-bold !text-xl"
                    inputMode="numeric"
                    {...form.register('depositFirstTokenAmount')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, '')
                      form.setValue('depositFirstTokenAmount', Number(value))
                    }}
                  />
                  <p className="text-muted-foreground absolute bottom-3 left-3 text-[10px]">
                    {form.watch('depositFirstTokenAmount') * 100} USD
                  </p>
                  <div className="absolute top-0 right-0 mr-2 flex h-full items-center justify-center pointer-events-none [&>.chevron-icon]:hidden">
                    <SwapSelectToken
                      handleToken={() => {}}
                      chevron={<></>}
                      token={form.watch('firstPair')!}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="relative flex items-center gap-2">
                  <Input
                    className="py-6 pb-10 !font-bold !text-xl"
                    inputMode="numeric"
                    {...form.register('depositSecondTokenAmount')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g, '')
                      form.setValue('depositSecondTokenAmount', Number(value))
                    }}
                  />
                  <p className="text-muted-foreground absolute bottom-3 left-3 text-[10px]">
                    {form.watch('depositSecondTokenAmount') * 100} USD
                  </p>
                  <div className="absolute top-0 right-0 mr-2 flex h-full items-center justify-center pointer-events-none [&>.chevron-icon]:hidden">
                    <SwapSelectToken
                      handleToken={() => {}}
                      chevron={<></>}
                      token={form.watch('firstPair')!}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button size="lg" className='py-6'>Preview</Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
