'use client'

import { L1_CHAIN_IDS } from '@/src/shared/constants/chains'
import { getChainInfo } from '@/src/shared/lib/chainInfo'
import { Button } from '@/src/shared/shadcn/components/ui/button'
import { Card } from '@/src/shared/shadcn/components/ui/card'
import { Input } from '@/src/shared/shadcn/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/shadcn/components/ui/select'
import { ArrowDownUp } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SwapSelectToken } from './SwapSelectToken'
import { Token } from '../model/types'

export const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
  { key: 'tiger', label: 'Tiger' },
  { key: 'giraffe', label: 'Giraffe' },
  { key: 'dolphin', label: 'Dolphin' },
  { key: 'penguin', label: 'Penguin' },
  { key: 'zebra', label: 'Zebra' },
  { key: 'shark', label: 'Shark' },
  { key: 'whale', label: 'Whale' },
  { key: 'otter', label: 'Otter' },
  { key: 'crocodile', label: 'Crocodile' },
]

export const SwapForm = () => {
  const form = useForm({
    defaultValues: {
      chain: L1_CHAIN_IDS[0],
      you_pay_token: undefined,
      you_receive_token: undefined,
      you_pay_amount: 0,
      you_receive_amount: 0,
    },
  })

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

  useEffect(() => {
    console.log('form', form.watch('chain'))
  }, [form])

  return (
    <Card className="w-full p-6 shadow-md min-w-lg border-none">
      <Select {...form.register('chain')}>
        <SelectTrigger className="py-6">
          <SelectValue placeholder="Выберите сеть" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {L1_CHAIN_IDS.map((chainId) => {
              const chainInfo = getChainInfo(chainId)
              return (
                <SelectItem key={chainId} value={chainId.toString()}>
                  <div className="flex gap-2 items-center">
                    <Image
                      width={20}
                      height={20}
                      src={chainInfo.circleLogoUrl || chainInfo.defaultListUrl || chainInfo.logoUrl}
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
      <div className="flex relative items-center gap-2">
        <Input className="py-6" {...form.register('you_pay_amount')} />
        <div className="absolute top-0 right-0 h-full mr-2 flex items-center justify-center">
          <SwapSelectToken handleToken={handleSetPayToken} token={form.watch('you_pay_token')!} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button size="icon" className="rounded-full" onClick={handleSwapTokens}>
          <ArrowDownUp />
        </Button>
      </div>
      <div className="flex relative items-center gap-2">
        <Input className="py-6" {...form.register('you_receive_amount')} />
        <div className="absolute top-0 right-0 h-full mr-2 flex items-center justify-center">
          <SwapSelectToken
            handleToken={handleSetReceiveToken}
            token={form.watch('you_receive_token')!}
          />
        </div>
      </div>
    </Card>
  )
}
