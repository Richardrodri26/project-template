

import React from 'react'
import { TanstackQueryProvider } from './TanstackQueryProvider'
import { ThemeProvider } from './theme-provider'

export const Providers = ({ children: children }: { children: React.ReactNode }) => {
  return (
    <TanstackQueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </TanstackQueryProvider>
  )
}
