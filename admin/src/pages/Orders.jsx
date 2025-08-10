import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { backendUrL } from '../App';

const Orders = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {

    if (!token) {
      return null;
    }

    try {

      const response = await axios.post(
        backendUrL + '/api/order/list',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      console.log(response.data);

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>

    </div>
  )
}

export default Orders
