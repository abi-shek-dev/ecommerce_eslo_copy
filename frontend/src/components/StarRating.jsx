import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const StarRating = ({ productId, initialAverage = 0, initialCount = 0, initialUserRating = 0, totalStars = 5, onSaved }) => {
  const { backendUrl, token } = useContext(ShopContext);

  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(initialUserRating || 0);
  const [average, setAverage] = useState(initialAverage || 0);
  const [count, setCount] = useState(initialCount || 0);

  useEffect(() => {
    setAverage(initialAverage || 0);
    setCount(initialCount || 0);
    setSelected(initialUserRating || 0);
  }, [initialAverage, initialCount, initialUserRating]);

  const handleRate = async (value) => {
    if (!token) {
      // keep UI same: prompt login — you can change this to toast or navigate
      alert('Please login to rate this product');
      return;
    }

    setSelected(value);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/product/rate`,
        { productId, rating: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setAverage(data.average);
        setCount(data.count);
        if (onSaved) onSaved(data);
      }
    } catch (err) {
      console.error('Error saving rating', err);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }).map((_, i) => {
        const val = i + 1;
        const filled = val <= (hover || selected || Math.round(average));
        return (
          <img
            key={i}
            src={filled ? assets.star_icon : assets.star_dull_icon}
            alt={filled ? 'star' : 'star-empty'}
            className="w-3 cursor-pointer"
            onMouseEnter={() => setHover(val)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRate(val)}
          />
        );
      })}
      <p className="pl-2">{count}</p>
    </div>
  );
};

export default StarRating;
