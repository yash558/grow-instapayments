"use client";

import { fetchBrandMetadata, fetchOrderDetails } from '@/lib/api';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setTotalAmount, updateItemQuantity } from '../lib/features/cart/cartSlice';
import { RootState } from '@/lib/store';
import Link from "next/link";
import ProductList from '@/components/ProductList';

const Home = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const orderTotal = useSelector((state: RootState) => state.cart.totalAmount);
  const[products , setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderDetails();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    fetchData();
  }, [dispatch]);


  return (
    <div className={` px-20 py-16`}>
      <h2 className="text-4xl font-bold p-4">Grow InstaPayments</h2>
      <div className=" border border-gray-300 rounded-lg  dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden">
        <div className="bg-slate-100 dark:bg-gray-800 py-3 px-6 font-semibold border-b border-gray-300 dark:border-gray-600 text-slate-800 dark:text-slate-100 flex justify-between items-center">
          <h2>Products</h2>
          <Link
            className="bg-lime-600 hover:bg-lime-800 duration-300 transition-all text-slate-50 rounded-md px-4 py-2"
            href="/checkout"
          >
            View Cart (0)
          </Link>
        </div>
        <div className="bg-white dark:bg-slate-700 p-4">
          <ProductList products={products} />
        </div>
      </div>
    </div>
  )
}

export default Home;