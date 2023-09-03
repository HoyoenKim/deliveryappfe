import '@/styles/globals.css'
import { useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { AuthRedirect } from '../components/common/AuthRedirect'


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  return (
  <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <AuthRedirect/>
      <Component {...pageProps} />
    </QueryClientProvider>
  </SessionProvider>)
}
