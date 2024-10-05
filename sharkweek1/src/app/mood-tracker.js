'use client'

import { useState, useCallback, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { format } from 'date-fns'

const moodColors = {
  'Very Happy': '#4CAF50',
  'Happy': '#8BC34A',
  'Neutral': '#FFC107',
  'Sad': '#FF9800',
  'Very Sad': '#F44336'
}

export default function MoodTracker() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [moodData, setMoodData] = useState({})
  const [key, setKey] = useState(0) // Add this line

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date)
  }, [])

  const handleMoodSelect = useCallback((mood) => {
    if (selectedDate) {
      const dateKey = format(selectedDate, 'yyyy-MM-dd')
      setMoodData(prevData => ({
        ...prevData,
        [dateKey]: mood
      }))
      setKey(prevKey => prevKey + 1) // Add this line
    }
  }, [selectedDate])

  const getMoodForDate = useCallback((date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return moodData[dateKey]
  }, [moodData])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Mood Tracker</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Mood Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              key={key} // Add this line
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              modifiers={{
                mood: (date) => getMoodForDate(date) !== undefined,
              }}
              modifiersStyles={{
                mood: (date) => ({
                  backgroundColor: moodColors[getMoodForDate(date) || ''],
                  color: 'white',
                  fontWeight: 'bold',
                }),
              }}
            />
          </CardContent>
        </Card>

        {/* ... rest of the component remains the same ... */}
      </div>
    </div>
  )
}