import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import StarRating from '../components/StarRating';
import axios from 'axios';
import { toast } from 'react-toastify'; // <-- 1. IMPORT TOAST

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // rating state
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [userRating, setUserRating] = useState(0);

  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
      return null;
    });
  };

  // fetch rating info from backend
  const fetchRatings = async () => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${backendUrl}/api/product/ratings/${productId}`, { headers });
      if (response.data && response.data.success) {
        setAvgRating(response.data.average || 0);
        setRatingCount(response.data.count || 0);
        setUserRating(response.data.userRating || 0);
      }
    } catch (err) {
      console.error('Error fetching ratings', err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Fetch ratings after productData set
  useEffect(() => {
    if (productData) {
      fetchRatings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productData]);

  // <-- 2. CREATE A HANDLER FUNCTION FOR THE BUTTON
  const handleAddToCart = () => {
    // Check if a size has been selected. The 'size' state is '' initially.
    if (!size) {
      toast.error("Please select a size"); // Show error toast
      return; // Stop the function here
    }

    // If a size is selected, call the original function from context and show a success toast
    addToCart(productData._id, size);
    toast.success("Added to Cart!");
  };

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* ------------------ Product data ------------------- */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ---------------------- Product Images  --------------------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className=' flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* ---------------------- Product Details ----------------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>

          {/* REPLACE static stars with interactive rating component */}
          <div className='flex items-center gap-1 mt-2'>
            <StarRating
              productId={productId}
              initialAverage={avgRating}
              initialCount={ratingCount}
              initialUserRating={userRating}
            />
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`cursor-pointer border py-2 px-4 bg-gray-100${item === size ? ' border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          {/* <-- 3. UPDATE THE BUTTON'S onClick HANDLER */}
          <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy returns and exchange policy within 7 days of receiving the product.</p>
          </div>
        </div>
      </div>

      {/* ------------------------ Product Description & Review -------------------------- */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm'> Reviews ({ratingCount})</p>
        </div>
        <div className=' border flex flex-col gap-4 px-6 py-6 text-gray-500'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>

      {/* ------------------------- Related Products ------------------------------------ */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;