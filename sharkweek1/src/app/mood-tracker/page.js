'use client'

import { useState, useCallback } from 'react'
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

        <div className="space-y-6">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Add/Update Mood</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Selected Date: {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'None'}</p>
              <Select 
                onValueChange={handleMoodSelect} 
                value={selectedDate ? getMoodForDate(selectedDate) || '' : ''}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your mood" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(moodColors).map(([mood, color]) => (
                    <SelectItem key={mood} value={mood}>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: color }}
                        />
                        {mood}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-400">
                Select a date and mood to update the calendar
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Mood Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(moodColors).map(([mood, color]) => (
                  <div key={mood} className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    />
                    {mood}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}