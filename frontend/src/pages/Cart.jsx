import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import CartTotal from '../components/cartTotal';


const Cart = () => {

  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {

    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData);
  }, [cartItems])

  return (
    <div className='border-t pt-14'>

      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'Cart'} />
      </div>

      <div className=''>
        {
          cartData.map((item, index) => {

            const productData = products.find((product) => product._id === item._id);

            return (
              <div key={index} className='py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 rounded' src={productData.image} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='border-1 border-gray-300 bg-slate-50 px-2 sm:px-3 sm:py-1'>Size : {item.size}</p>
                      <p>x{item.quantity}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} onBlur={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, e.target.value)} type="number" min={1} defaultValue={item.quantity} className='border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            )

          })
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
        </div>
      </div>

    </div>
  )
}

export default Cart
