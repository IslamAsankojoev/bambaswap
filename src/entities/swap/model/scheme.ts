import { z } from 'zod'

const tokenSchema = z.object({
  chainId: z.number(),
  address: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  logoURI: z.string(),
  extensions: z.object({
    bridgeInfo: z.record(
      z.union([
        z.object({
          tokenAddress: z.string(),
        }),
        z.undefined(),
      ]),
    ),
  }),
})

export const swapFormScheme = z.object({
  chain: z.number().min(1),
  you_pay_token: tokenSchema.optional(),
  you_receive_token: tokenSchema.optional(),
  you_pay_amount: z.number().min(0),
  you_receive_amount: z.number().min(0),
})
