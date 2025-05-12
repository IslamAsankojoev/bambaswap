'use client'

import clsx from 'clsx'
import { siteConfig } from '@/src/app/config/site'
import { Button } from '../shared/shadcn/components/ui/button'
import { Card } from '../shared/shadcn/components/ui/card'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BadgeCheck, Menu, X } from 'lucide-react'
import { LogoIcon } from '../shared/icons'
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const Header = () => {
  const [open, setOpen] = useState(false)
  const { open: connectWeb3 } = useWeb3Modal()
  const web3 = useWeb3ModalAccount()
  const pathname = usePathname()

  const handleConnect = async () => {
    await connectWeb3()
  }

  console.table(web3)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <Card className="sticky top-0 z-50 shadow rounded-none border-none py-2 gap-0">
        <div className="container flex mx-auto items-center justify-between px-4 py-3 w-full">
          <div className="flex gap-10 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <LogoIcon width="28" height="28" />
                  <p className="text-lg font-bold">BambaSwap</p>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-4">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx('text-sm font-medium')}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {web3.isConnected ? (
                <motion.div className="flex items-center gap-2">
                  <Button variant="secondary" onClick={handleConnect}>
                    <BadgeCheck color="green" />
                    {web3.address?.slice(0, 6)}...{web3.address?.slice(-4)}
                  </Button>
                </motion.div>
              ) : (
                <Button variant="default" onClick={handleConnect}>
                  Connect
                </Button>
              )}
            </AnimatePresence>
            <Button
              variant="outline"
              className="md:hidden"
              size="icon"
              onClick={() => {
                setOpen((prev) => !prev)
              }}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              animate={{
                height: open ? 'auto' : 0,
              }}
              initial={{
                height: 0,
              }}
              exit={{
                height: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-col space-y-2 px-4 py-2 md:hidden items-start pb-4">
                {siteConfig.navMenuItems.map((item, index) => {
                  return (
                    <Button
                      key={`${item.href}-${index}`}
                      variant="link"
                      className="text-white !p-0 h-[initial]"
                    >
                      <Link
                        href={item.href}
                        className="block text-md font-medium"
                      >
                        {item.label}
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </>
  )
}
