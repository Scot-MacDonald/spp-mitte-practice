'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/utilities/cn'
import { useTranslations } from 'next-intl'

function parseTime(str: string): Date {
  const [hours, minutes] = str.split(':').map(Number)
  const now = new Date()
  now.setHours(hours)
  now.setMinutes(minutes)
  now.setSeconds(0)
  return now
}

function isTimeInRange(range: string, now: Date): boolean {
  if (range === 'closed') return false
  const [start, end] = range.split(' - ').map(parseTime)
  return now >= start && now <= end
}

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'

export const OpeningHours = () => {
  const [now, setNow] = useState(new Date())
  const t = useTranslations()

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const dayKeys: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const fullDayKeys = ['sunday', ...dayKeys, 'saturday']
  const currentDayIndex = now.getDay()
  const currentDayKey = fullDayKeys[currentDayIndex] as DayKey

  const weekdays: { key: DayKey; times: string[] }[] = [
    { key: 'monday', times: ['8:00 - 13:00'] },
    { key: 'tuesday', times: ['8:00 - 13:00', '15:00 - 19:00'] },
    { key: 'wednesday', times: ['8:00 - 13:00'] },
    { key: 'thursday', times: ['8:00 - 13:00', '15:00 - 19:00'] },
    { key: 'friday', times: ['8:00 - 13:00'] },
  ]

  const today = weekdays.find((day) => day.key === currentDayKey)
  const isOpenNow = today ? today.times.some((range) => isTimeInRange(range, now)) : false

  return (
    <div className="opening-hours pr-[49px]">
      {/* <h2
        className={cn(
          "text-xs font-normal mb-4",
          isOpenNow ? "text-[#7eb36a]" : "text-[#e15555]"
        )}
      >
        {isOpenNow ? t("open") : t("closed")}
      </h2> */}
      <div className="flex flex-col gap-2 ">
        {weekdays.map((day) => {
          const [morning, afternoon] = day.times
          const isToday = day.key === currentDayKey

          const isMorningNow = morning && isTimeInRange(morning, now) && isToday
          const isAfternoonNow = afternoon && isTimeInRange(afternoon, now) && isToday

          return (
            <div key={day.key} className="flex items-start w-full">
              <p className="w-1/3 text-[1rem] text-left">
                {t(`days.${day.key}` as `days.${DayKey}`)}
              </p>

              <p className="w-1/3 text-[1rem] text-left">
                {morning && <span className={cn(isMorningNow && 'text-[#7eb36a]')}>{morning}</span>}
              </p>

              <p className="w-1/3 text-[1rem] text-left sm:text-right">
                {afternoon && (
                  <span className={cn(isAfternoonNow && 'text-[#7eb36a]')}>{afternoon}</span>
                )}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
