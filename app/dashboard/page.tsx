// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'dashboard',
  }
export default function Page() {
    return <h1>Hello, Dashboard Page!</h1>
  }