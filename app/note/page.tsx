import { Editor } from "novel";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'dashboard',
}
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Editor />
    </main>
  );
}
