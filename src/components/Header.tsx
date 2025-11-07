import Link from "next/link"
import { ButtonLink } from "./ButtonLink"
import { Logo } from "./Logo"
import { createClient } from "@/prismicio"

type Props = Record<string, never>

export async function Header({}: Props) {
  const client = createClient()
  const settings = await client.getSingle("settings")

  // Map Prismic navigation items to actual URLs with fallbacks
  const navItems = settings.data.navigation.map((item) => {
    let href = "/"
    if (item.link.url) href = item.link.url
    else if (item.link.type === "team") href = "/team"
    else if (item.link.type === "about") href = "/about"

    return {
      text: item.link.text,
      href,
    }
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pink bg-opacity-80 backdrop-blur-md shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="h-14 w-auto text-white" />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="hidden md:flex md:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className="text-white text-lg font-semibold uppercase tracking-wider hover:text-brand-purple transition-colors duration-300"
            >
              {item.text}
            </Link>
          ))}
        </nav>

        {/* Cart & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <ButtonLink
            href="/cart"
            icon="cart"
            color="purple"
            aria-label="Cart (1)"
            className="relative text-white hover:text-brand-purple transition-colors duration-300"
          >
            <span className="hidden md:inline">Cart (1)</span>
            <span className="md:hidden">1</span>
          </ButtonLink>

          {/* Mobile menu button */}
          <button className="md:hidden focus:outline-none" aria-label="Open menu">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-md shadow-lg">
        <nav aria-label="Mobile Menu" className="flex flex-col gap-4 px-6 py-4">
          {navItems.map((item) => (
            <Link
              key={item.text}
              href={item.href}
              className="text-white text-lg font-semibold uppercase tracking-wide hover:text-brand-purple transition-colors duration-300"
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
