import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen content-center bg-neutral-90/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neutral-60 border-t-primary-50 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-primary-50/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  )
}
