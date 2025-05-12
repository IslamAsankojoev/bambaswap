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

export const poolCreateFormScheme = z.object({
  chain: z.number().min(1),
  firstPair: tokenSchema.optional(),
  secondPair: tokenSchema.optional(),
  fee: z.number().min(0),
  lowPrice: z.number().min(0),
  highPrice: z.number().min(0),
  amount: z.number().min(0),
  depositFirstTokenAmount: z.number().min(0),
  depositSecondTokenAmount: z.number().min(0),
})
