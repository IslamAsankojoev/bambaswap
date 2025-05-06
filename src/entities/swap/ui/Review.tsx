'use client'

import Image from 'next/image'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { L1_CHAIN_IDS } from '@/src/shared/constants/chains'
import { getChainInfo } from '@/src/shared/lib/chainInfo'
import { Button } from '@/src/shared/shadcn/components/ui/button'
import { Input } from '@/src/shared/shadcn/components/ui/input'
import { Label } from '@/src/shared/shadcn/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/shadcn/components/ui/select'

import { swapFormScheme } from '../model/scheme'
import { SwapSteps } from './SwapForm'

interface ReviewProps {
  handleStep: (step: SwapSteps) => void
}

export const Review = ({ handleStep }: ReviewProps) => {
  const form = useFormContext<z.infer<typeof swapFormScheme>>()

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Swap Data', data)
    handleStep(SwapSteps.CONFIRM)
  })

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Review swap</h2>
      <div className="flex flex-col gap-4">
        <Select
          {...form.register('chain')}
          value={form.watch('chain').toString()}
        >
          <SelectTrigger className="py-6">
            <SelectValue placeholder="Выберите сеть" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {L1_CHAIN_IDS.map((chainId) => {
                const chainInfo = getChainInfo(chainId)
                return (
                  <SelectItem key={chainId} value={chainId.toString()}>
                    <div className="flex items-center gap-2">
                      <Image
                        width={20}
                        height={20}
                        src={
                          chainInfo.circleLogoUrl ||
                          chainInfo.defaultListUrl ||
                          chainInfo.logoUrl
                        }
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
        <div className="flex flex-col gap-2">
          <Label className="ml-2 flex">You Pay</Label>
          <div className="relative flex items-center gap-2">
            <Input
              className="py-6 pb-10"
              inputMode="numeric"
              {...form.register('you_pay_amount')}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '')
                form.setValue('you_pay_amount', Number(value))
              }}
            />
            <p className="text-muted-foreground absolute bottom-3 left-3 text-[10px]">
              {form.watch('you_pay_amount') * 100} USD
            </p>
            <div className="absolute top-0 right-0 mr-4 flex h-full items-center justify-center">
              <Image
                src={form.watch('you_pay_token.logoURI')}
                alt="token logo"
                width={30}
                height={30}
                className="rounded-full bg-white"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label className="ml-2 flex">You Receive</Label>
          <div className="relative flex items-center gap-2">
            <Input
              className="py-6 pb-10"
              inputMode="numeric"
              {...form.register('you_receive_amount')}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '')
                form.setValue('you_receive_amount', Number(value))
              }}
            />
            <p className="text-muted-foreground absolute bottom-3 left-3 text-[10px]">
              {form.watch('you_receive_amount') * 100} USD
            </p>
            <div className="absolute top-0 right-0 mr-4 flex h-full items-center justify-center">
              <Image
                src={form.watch('you_receive_token.logoURI')}
                alt="token logo"
                width={30}
                height={30}
                className="rounded-full bg-white"
              />
            </div>
          </div>
        </div>
        <Button size="lg" onClick={handleSubmit}>Swap</Button>
      </div>
      {form.watch('chain') &&
        form.watch('you_pay_token') &&
        form.watch('you_receive_token') && (
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center justify-between">
              <p>Rate</p>
              <span className='text-[#85FA59]'>1 USDC = 1.00065 USDT ($1.00)</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Fee</p>
              <span>$0</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Network cost</p>
              <span>$2.86</span>
            </div>
          </div>
        )}
    </div>
  )
}
