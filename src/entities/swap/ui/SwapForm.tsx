'use client'

import { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { L1_CHAIN_IDS } from '@/src/shared/constants/chains'
import { Card } from '@/src/shared/shadcn/components/ui/card'

import { swapFormScheme } from '../model/scheme'
import { Confirm } from './Confirm'
import { Review } from './Review'
import { Swap } from './Swap'

export enum SwapSteps {
  SWAP = 0,
  REVIEW = 1,
  CONFIRM = 2,
  SUCCESS = 3,
}

export const SwapForm = () => {
  const [step, setStep] = useState<SwapSteps>(SwapSteps.SWAP)
  const form = useForm<z.infer<typeof swapFormScheme>>({
    defaultValues: {
      chain: L1_CHAIN_IDS[0],
      you_pay_token: undefined,
      you_receive_token: undefined,
      you_pay_amount: 0,
      you_receive_amount: 0,
    },
  })

  const handleStep = (step: SwapSteps) => {
    setStep(step)
  }

  useEffect(() => {
    console.log('step', step)
  }, [step])

  return (
    <Card className="w-full max-w-lg border-none p-6 py-10 shadow-md">
      <FormProvider {...form}>
        {step === SwapSteps.SWAP && <Swap handleStep={handleStep} />}
        {(step === SwapSteps.REVIEW || step === SwapSteps.CONFIRM) && <Review handleStep={handleStep} />}
        {step === SwapSteps.CONFIRM && <Confirm handleStep={handleStep} openModal />}
      </FormProvider>
    </Card>
  )
}
