'use client'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardLayout({
    children, // will be a page or nested layout
    auth
  }: {
    children: React.ReactNode,
    auth: React.ReactNode
  }) {
    const loginSegments = useSelectedLayoutSegment('auth')
    console.log(loginSegments)
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        {children}
        {auth}
      </section>
    )
  }