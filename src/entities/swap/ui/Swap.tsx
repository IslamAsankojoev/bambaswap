/* eslint-disable @next/next/no-img-element */
'use client'

import { ArrowDownUp } from 'lucide-react'
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
import { Token } from '../model/types'
import { SwapSteps } from './SwapForm'
import { SwapSelectToken } from './SwapSelectToken'

interface SwapProps {
  handleStep: (step: SwapSteps) => void
}

export const Swap = ({ handleStep }: SwapProps) => {
  const form = useFormContext<z.infer<typeof swapFormScheme>>()
  const handleSetPayToken = (token: Token) => {
    form.setValue('you_pay_token', token)
  }

  const handleSetReceiveToken = (token: Token) => {
    form.setValue('you_receive_token', token)
  }

  const handleSwapTokens = () => {
    const youPayToken = form.getValues('you_pay_token')
    const youReceiveToken = form.getValues('you_receive_token')
    const youPayAmount = form.getValues('you_pay_amount')
    const youReceiveAmount = form.getValues('you_receive_amount')
    if (youPayToken && youReceiveToken) {
      form.setValue('you_pay_token', youReceiveToken)
      form.setValue('you_receive_token', youPayToken)
      form.setValue('you_pay_amount', youReceiveAmount)
      form.setValue('you_receive_amount', youPayAmount)
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Swap Data', data)
    handleStep(SwapSteps.REVIEW)
  })

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label className="ml-2 flex">Выберите сеть</Label>
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
                const imageUrl = (chainInfo.circleLogoUrl || chainInfo.defaultListUrl || chainInfo.logoUrl || '') as {
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
            <div className="absolute top-0 right-0 mr-2 flex h-full items-center justify-center">
              <SwapSelectToken
                handleToken={handleSetPayToken}
                token={form.watch('you_pay_token')!}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            size="icon"
            className="rounded-full"
            onClick={handleSwapTokens}
          >
            <ArrowDownUp />
          </Button>
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
            <div className="absolute top-0 right-0 mr-2 flex h-full items-center justify-center">
              <SwapSelectToken
                handleToken={handleSetReceiveToken}
                token={form.watch('you_receive_token')!}
              />
            </div>
          </div>
        </div>
        <Button size="lg">Swap</Button>
      </form>
      {form.watch('chain') &&
        form.watch('you_pay_token') &&
        form.watch('you_receive_token') && (
          <div className="flex flex-col gap-1 text-xs">
            <p className="mb-2"> 1 USDC = 1.0065 USDT ($1.00)</p>
            <div className="flex items-center justify-between">
              <p>Price impact</p>
              <span> ~0.03%</span>
            </div>

            <div className="flex items-center justify-between">
              <p>Max.slippage</p>
              <span>5%</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Fee</p>
              <span>$0</span>
            </div>

            <div className="flex items-center justify-between">
              <p>Network cost</p>
              <span>$2.86</span>
            </div>
            <div className="flex items-center justify-between">
              <p>Order routing</p>
              <span>Uniswap API</span>
            </div>
          </div>
        )}
    </div>
  )
}
