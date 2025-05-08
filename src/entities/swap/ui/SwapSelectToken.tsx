/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'

import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { useTokens } from '@/src/shared/hooks/useTokens'
import { Button } from '@/src/shared/shadcn/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/shared/shadcn/components/ui/dialog'
import { Input } from '@/src/shared/shadcn/components/ui/input'
import { ScrollArea } from '@/src/shared/shadcn/components/ui/scroll-area'
import { Separator } from '@/src/shared/shadcn/components/ui/separator'

import { Token } from '../model/types'

interface SwapSelectTokenProps {
  handleToken: (token: Token) => void
  token?: Token
}

export function SwapSelectToken({ handleToken, token }: SwapSelectTokenProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([])

  const { tokens } = useTokens()

  const handleSearch = (value: string) => {
    setSearch(value)
    const filtered = tokens.filter((token) =>
      token.name.toLowerCase().includes(value.toLowerCase()),
    )
    setFilteredTokens(filtered)
  }

  useEffect(() => {
    if (search.length === 0) {
      setFilteredTokens(tokens)
    } else {
      const filtered = tokens.filter((token) =>
        token.name.toLowerCase().includes(search.toLowerCase()),
      )
      setFilteredTokens(filtered)
    }
  }, [tokens, search])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-sm">
          {token ? (
            <div className="flex items-center gap-2">
              <img
                src={token.logoURI}
                alt={token.name}
                width={20}
                height={20}
                className="rounded-full bg-white"
              />
              <p>{token.name}</p>
              <ChevronDown />
            </div>
          ) : (
            'Select a token'
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 overflow-hidden border-none p-0 sm:max-w-[350px]">
        <DialogHeader className="flex flex-col gap-4 p-4">
          <DialogTitle>Select a token</DialogTitle>
          <Input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search name or paste address"
          />
        </DialogHeader>
        <Separator className="bg-neutral-900" />
        <div className="grid gap-4">
          <ScrollArea className="h-96 overflow-hidden">
            <div className="flex flex-col gap-2 overflow-hidden">
              <AnimatePresence>
                {filteredTokens.map((token, index) => {
                  const address = `${token.address.slice(0, 6)}...${token.address.slice(-4)}`
                  return (
                    <motion.div
                      key={index}
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex cursor-pointer items-center gap-2 p-2 px-4 hover:bg-purple-950/30"
                      onClick={() => {
                        handleToken(token)
                        setOpen(false)
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={token.logoURI.includes('https://') ? token.logoURI : ''}
                        alt={token.name}
                        width={30}
                        height={30}
                        className="rounded-full bg-white"
                      />
                      <div className="flex flex-col">
                        <p>{token.name}</p>
                        <p className="text-xs">
                          {token.symbol}{' '}
                          <span className="text-muted-foreground">
                            {address}
                          </span>
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
