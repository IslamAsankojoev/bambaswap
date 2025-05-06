import { useEffect, useState } from 'react'

import { ArrowUpDown, Check, MoveRight } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
} from '@/src/shared/shadcn/components/ui/dialog'
import { Input } from '@/src/shared/shadcn/components/ui/input'
import { Label } from '@/src/shared/shadcn/components/ui/label'
import { Separator } from '@/src/shared/shadcn/components/ui/separator'

import { swapFormScheme } from '../model/scheme'
import { SwapSteps } from './SwapForm'
import { Button } from '@/src/shared/shadcn/components/ui/button'
import Image from 'next/image'

interface ConfirmProps {
  openModal?: boolean
  handleStep: (step: SwapSteps) => void
}

export const Confirm = ({ handleStep, openModal }: ConfirmProps) => {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const form = useFormContext<z.infer<typeof swapFormScheme>>()

  const handleSubmit = form.handleSubmit((data) => {
    console.log('Swap Data', data)
    handleStep(SwapSteps.SWAP)
  })

  useEffect(() => {
    if (openModal) {
      setOpen(true)
    }
  }, [openModal])

  useEffect(() => {
    setTimeout(() => {
      setSuccess(true)
    }, 2000)
  }, [])

  return (
    <Dialog open={open} onOpenChange={() => handleStep(SwapSteps.REVIEW)}>
      <DialogContent className="border-none sm:max-w-[425px]">
        {!success && (
          <div>
            <div className="grid gap-4 py-4">
              <h2 className="text-2xl font-bold">Confirm swap</h2>
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
                      width={20}
                      height={20}
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
                      width={20}
                      height={20}
                      className="rounded-full bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-fit space-y-2 rounded-md font-sans text-white">
              {/* Step 1 */}
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#85FA59]">
                    <Check />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Sign message</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-4 w-10 items-center justify-center rounded-full">
                    <Separator
                      className="bg-white/50"
                      orientation="vertical"
                      decorative
                    />
                  </div>
                </div>
                <div />
              </div>
              {/* Step 2 */}
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-400">
                    <ArrowUpDown />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Confirm swap in wallet
                  </p>
                  <p className="text-xs text-gray-400">Learn more about swap</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {success && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div>
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-primary text-primary">
                <Check size={70} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">Swap Success!</h2>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <Image
                  src={form.watch('you_pay_token.logoURI')}
                  alt="pay token"
                  width={20}
                  height={20}
                  className="rounded-full bg-white"
                />
                <p className="text-sm font-medium text-white">
                  {form.watch('you_pay_amount') * 100}{' '}
                  {form.watch('you_pay_token.symbol')}
                </p>
              </div>
              <MoveRight />
              <div className="flex gap-2">
                <Image
                  src={form.watch('you_receive_token.logoURI')}
                  alt="receive token"
                  width={20}
                  height={20}
                  className="rounded-full bg-white"
                />
                <p className="text-sm font-medium text-white">
                  {form.watch('you_receive_amount') * 100}{' '}
                  {form.watch('you_receive_token.symbol')}
                </p>
              </div>
            </div>
            <Button size='lg' className='mt-4 rounded-full px-16 py-6 text-xl' onClick={handleSubmit}>
              Main page
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
