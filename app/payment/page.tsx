"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../lib/api';
import { RootState } from '../../lib/store';
import { setMethods, setSelectedMethod } from '../../lib/features/payment/paymentSlice';
import Link from 'next/link';

const Payment = () => {
  const dispatch = useDispatch();
  const paymentMethods = useSelector((state: RootState) => state.payment.methods);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const selectedMethod = useSelector((state: RootState) => state.payment.selectedMethod);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        const data = await fetchOrderDetails();
        dispatch(setMethods(data.paymentMethods));

        if (data.paymentMethods.length > 0) {
          dispatch(setSelectedMethod(data.paymentMethods[0]));
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMethodSelect = (method: string) => {
    dispatch(setSelectedMethod(method));
  };

  const renderPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'CARDS':
        return <img src="/icons/credit-card.png" alt="Credit Card" className="h-8" />;
      case 'UPI':
        return <img src="/icons/upi.png" alt="PayPal" className="h-8" />;
      case 'bank_transfer':
        return <img src="/icons/bank_transfer_icon.svg" alt="Bank Transfer" className="h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:py-12 flex flex-col justify-center items-center">
      <Link href="/">
        <button className="mb-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
          Back
        </button>
      </Link>
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-center text-3xl font-semibold mb-6">Payment</h1>
        <h2 className="text-center text-2xl font-semibold mb-6">Choose Payment Options</h2>
        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className={`flex items-center p-4 cursor-pointer rounded-lg transition duration-300 ease-in-out ${
                selectedMethod === method
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-white hover:bg-gray-100 border-gray-300'
              }`}
              onClick={() => handleMethodSelect(method)}
            >
              <div className="flex-shrink-0 mr-4">{renderPaymentMethodIcon(method)}</div>
              <span className="text-lg font-semibold">{method}</span>
            </div>
          ))}
        </div>
        <h2 className="text-center text-xl my-6">Total Amount: ₹{totalAmount}</h2>
        <Link href="/orderConfirm">
          <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
