import React from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const LatestCollection = () => {

    const { products } = React.useContext(ShopContext);    

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'} />
      </div>
    </div>
  )
}

export default LatestCollection
