// src/pages/_app.tsx

import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { Press_Start_2P } from 'next/font/google'

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={pressStart.className}>
      <Component {...pageProps} />
    </main>
  )
}
