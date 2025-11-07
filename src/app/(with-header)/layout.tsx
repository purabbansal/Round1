import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

/**
 * Layout component wraps all pages with Header and Footer.
 * Children components will be rendered between Header and Footer.
 */
export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header at the top */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  )
}
