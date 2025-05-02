import { useState } from 'react'
import TOKENS_LIST from '@/src/shared/constants/tokens.json'
import { Token } from '@/src/entities/swap/model/types'


export const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>(TOKENS_LIST.tokens as Token[])
  return {
    tokens,
    setTokens,
  }
}
