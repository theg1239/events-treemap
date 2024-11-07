import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Event Seat Registrations Treemap',
  description: 'Dynamic treemap visualization of event seat registrations',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-900 text-white">
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Event Seat Registrations</h1>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
