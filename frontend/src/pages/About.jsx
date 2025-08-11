import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-between gap-6 md:w-2/4 text-gray-600'>
          <p>ESLO is more than a label — it’s a movement. Inspired by the strength of the rhinoceros, we design bold, streetwear-inspired apparel for those who stand out and value authenticity over trends.</p>
          {/* <b className='text-gray-800'>Our Vision</b> */}
          <p>To become a global streetwear icon that empowers young people to express their individuality, wear their strength with pride, and move with the unstoppable force of their own style.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Design without compromise — delivering unique, high-quality apparel that stands out in a sea of sameness.</p>
          {/* <p>Empower self-expression — encouraging the youth to embrace their identity and wear their confidence.</p> */}
          {/* <p>Sustain the future — committing to responsible sourcing and production practices that respect both people and the planet.</p> */}
          {/* <p>Build a culture — connecting a community of bold thinkers, dreamers, and doers through style, art, and collaboration.</p> */}
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      <NewsLetterBox />


    </div>
  )
}

export default About
