import React from 'react'
import { assets } from '../assets/assets'

const ProductSize = () => {
  return (
    <div className='w-full border border-gray-600 mt-20 mb-20 rounded-2xl'>
      <div className='flex flex-col justify-around md:flex-row items-center mt-20 mb-20'>
        <img className=' w-[50vw] md:w-[25vw]' src={assets.regularfitroundneck} alt="" />
        <img className=' w-[50vw] md:w-[25vw]' src={assets.hoodiessweatshirts} alt="" />
        <img className=' w-[50vw] md:w-[25vw]' src={assets.dropshoulder} alt="" />
      </div>
    </div>
  )
}

export default ProductSize
