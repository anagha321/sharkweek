'use client'

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { addDays, differenceInDays, format, isSameDay, isWithinInterval } from 'date-fns'

export default function PeriodTracker() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [periodDates, setPeriodDates] = useState([])
  const [cycleLength, setCycleLength] = useState(29)
  const [periodLength, setPeriodLength] = useState(7)
  var periodStarted = false;
  var periodEnded = false;

  useEffect(() => {
    if (startDate) {
      const dates = Array.from({ length: endDate ? differenceInDays(endDate, startDate) : periodLength }, (_, i) => addDays(startDate, i))
      setPeriodDates(dates)
    }
  }, [startDate, periodLength])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  const handleSetStartDate = () => {
    if (selectedDate) {
      setStartDate(selectedDate)
    }
  }

  const handleSetEndDate = () => {
    if (selectedDate) {
      setEndDate(selectedDate)
      if (startDate) {
        const dates = Array.from({ length: endDate ? differenceInDays(endDate, startDate) : periodLength }, (_, i) => addDays(startDate, i))
        setPeriodDates(dates)
      }
    }
  }

  const handlePeriodLengthChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setPeriodLength(value)
    }
  }

  const handleCycleLengthChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      setCycleLength(value)
    }
  }

  const getExpectedEndDate = () => {
    return startDate ? addDays(startDate, periodLength - 1) : null
  }

  const formatDate = (date) => {
    return date ? format(date, 'MMMM d, yyyy') : ''
  }

  const isDateInPeriod = (date) => {
    return periodDates.some(periodDate => isSameDay(periodDate, date))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Menstruation Tracker</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Period Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border"
              modifiers={{
                period: (date) => isDateInPeriod(date),
              }}
              modifiersStyles={{
                period: { color: 'white', backgroundColor: 'red' },
              }}
            />
            <Button 
              onClick={handleSetStartDate} 
              className="mt-4 w-full"
              disabled={!selectedDate}
            >
              Set as start Date
            </Button>
            <Button 
              onClick={handleSetEndDate} 
              className="mt-4 w-full"
              disabled={!selectedDate}
            >
              Set as end Date
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Period Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Selected Date: {formatDate(selectedDate)}</p>
              <p>Start Date: {formatDate(startDate)}</p>
              {startDate && (
                <>
                  <p className="text-red-400">Period is expected to end on {formatDate(getExpectedEndDate())}</p>
                  <p className="text-gray-400">This period lasts for a total of {periodLength} days</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-800">
            <CardHeader>
              <CardTitle>Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="periodLength" className="w-1/2">Avg period duration:</Label>
                <Input
                  id="periodLength"
                  type="number"
                  value={periodLength}
                  onChange={handlePeriodLengthChange}
                  min="1"
                  className="w-1/2 bg-gray-700 text-white"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Label htmlFor="cycleLength" className="w-1/2">Avg cycle length:</Label>
                <Input
                  id="cycleLength"
                  type="number"
                  value={cycleLength}
                  onChange={handleCycleLengthChange}
                  min="1"
                  className="w-1/2 bg-gray-700 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" variant="default">
            Period hasn't ended
          </Button>
        </div>
      </div>
    </div>
  )
}