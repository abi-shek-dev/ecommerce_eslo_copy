import React from 'react'

const ProductSkeleton = ({ count = 10 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='animate-pulse'>
          {/* Image skeleton */}
          <div className='overflow-hidden rounded-xl'>
            <div className='w-full aspect-[3/4] bg-gray-200 rounded-xl relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer' />
            </div>
          </div>
          {/* Text skeletons */}
          <div className='pt-3 pb-1'>
            <div className='h-3.5 bg-gray-200 rounded-full w-3/4 relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer' />
            </div>
          </div>
          <div className='h-3.5 bg-gray-200 rounded-full w-1/3 relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer' />
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductSkeleton
