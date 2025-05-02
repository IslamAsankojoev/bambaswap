export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'Next.js + HeroUI',
  description: 'Make beautiful websites regardless of your design experience.',
  navItems: [
    {
      label: 'Swap',
      href: '/',
      removeOrder: 4,
    },
    {
      label: 'Pool',
      href: '/pool',
      removeOrder: 3,
    },
    {
      label: 'Listing',
      href: '/listing',
      removeOrder: 2,
    },
    {
      label: 'Buy crypto',
      href: '/buy-crypto',
      removeOrder: 1,
    },
  ],
  navMenuItems: [
    {
      label: 'Swap',
      href: '/',
      removeOrder: 4,
    },
    {
      label: 'Pool',
      href: '/pool',
      removeOrder: 3,
    },
    {
      label: 'Listing',
      href: '/listing',
      removeOrder: 2,
    },
    {
      label: 'Buy crypto',
      href: '/buy-crypto',
      removeOrder: 1,
    },
  ],
  links: {
    github: 'https://github.com/heroui-inc/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
}
