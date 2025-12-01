import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  // Set default to eager + high priority for header logo
  const loading = loadingFromProps || 'eager'
  const priority = priorityFromProps || 'high'

  return (
    <div className={clsx('flex items-center', className)}>
      <img
        alt="SPP-Mitte Logo"
        width={193}
        height={54}
        loading={loading}
        fetchPriority={priority}
        decoding="auto" // change from async to auto for immediate decoding
        className="h-[54px] w-auto object-contain mr-2"
        src="/api/media/file/spp_logo.png"
      />
      <span className="text-lg font-semibold whitespace-nowrap">SPP-Mitte</span>
    </div>
  )
}
