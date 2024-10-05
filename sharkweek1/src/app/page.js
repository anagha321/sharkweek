'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Tracker App</h1>
      <div className="flex space-x-4">
        <Link href="/period-tracker">
          <Button className="w-48 bg-red-500 hover:bg-red-600">
            Period Tracker
          </Button>
        </Link>
        <Link href="/mood-tracker">
          <Button className="w-48 bg-blue-500 hover:bg-blue-600">
            Mood Tracker
          </Button>
        </Link>
      </div>
    </div>
  )
}
