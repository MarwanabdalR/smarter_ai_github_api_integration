"use client"
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
}

export default function LayoutContainer({ children }: Props) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
                retry: 1,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
                
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}