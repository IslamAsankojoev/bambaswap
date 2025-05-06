export interface Token {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
  extensions: {
    bridgeInfo: BridgeInfo
  }
}

type BridgeInfo = {
  [chainId: string]:
    | {
        tokenAddress: string
      }
    | undefined
}
