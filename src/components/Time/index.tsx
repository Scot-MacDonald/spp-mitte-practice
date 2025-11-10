'use client'

import React, { useState, useEffect } from 'react'
import Clock from 'react-live-clock'

export default function Time() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true) // Ensure this runs only on the client

    const checkOpeningHours = () => {
      const berlinTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }))
      const now = new Date()
      const day = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const time = hours * 100 + minutes // Convert time to 24-hour integer format (e.g., 8:30 -> 830)

      const openingHours: Record<number, [number, number][]> = {
        1: [[800, 1300]],
        2: [
          [800, 1300],
          [1500, 1900],
        ],
        3: [[800, 1300]],
        4: [
          [800, 1300],
          [1500, 1900],
        ],
        5: [[800, 1300]],
      }

      const todayHours = openingHours[day] || []
      const openNow = todayHours.some(([start, end]) => time >= start && time <= end)
      setIsOpen(openNow)
    }

    checkOpeningHours()
    const interval = setInterval(checkOpeningHours, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null // Prevents hydration mismatch

  return (
    <div className="flex flex-col mt-4 mb-2 ">
      {/* Wrapper around the Clock component */}
      <div
        style={{
          display: 'inline-block', // Ensures clock element does not stretch
          width: '8em', // Fixed width (enough space for the longest string "23:59:59")
          whiteSpace: 'nowrap', // Prevents text from wrapping
          fontFamily: 'monospace', // Use a monospace font to prevent width shifting
        }}
      >
        <Clock
          format={'HH:mm:ss.A'} // Time format with AM/PM
          style={{
            fontSize: '16px',
            color: isOpen ? '#7eb36a' : '#ec0b08',
          }}
          ticking={true}
        />
      </div>
      {/* Add space after the clock text */}
      <span className="ml-1"> </span>
      <p className=" text-gray-600">Berlin, Germany</p>
    </div>
  )
}
