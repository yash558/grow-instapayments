"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { CreditCard, DollarSign, Check, X, Clock, BaggageClaim } from 'lucide-react';

const OrderConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = useState('');

  const order = useSelector((state: RootState) => state.order);
  const selectedPaymentMethod = useSelector((state: RootState) => state.payment.selectedMethod);

  useEffect(() => {

    const generateRandomStatus = () => {
      const statuses = ['Success', 'Failure', 'Pending'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      return statuses[randomIndex];
    };

    setOrderStatus(generateRandomStatus());
  }, []);

  const renderPaymentIcon = () => {
    switch (selectedPaymentMethod) {
      case 'Credit Card':
        return <CreditCard className="w-5 h-5 text-gray-600" />;
      case 'Cash on Delivery':
        return <DollarSign className="w-5 h-5 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center md:px-24 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">Order Confirmation</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <p className="mb-2"><span className="font-semibold">Delivery Address:</span> {order?.orderDetails?.address}</p>
          <p className="mb-2"><span className="font-semibold">Phone No:</span> {order?.orderDetails?.phoneNo}</p>
          <p className="mb-2"><span className="font-semibold">Total Amount:</span> ₹{order?.totalAmount.toFixed(2)}</p>
          <p className="mb-2"><span className="font-semibold">Discount Amount:</span> ₹{order?.orderDetails?.discountAmount?.toFixed(2)}</p>
          {/* <p className="mb-2">
            <span className="font-semibold">Paid Amount:</span> ₹
            {(order?.totalAmount - order?.orderDetails?.discountAmount ?? 0).toFixed(2)}
          </p> */}

          <p className="mb-2 flex items-center"><span className="font-semibold mr-2">Selected Payment Method:</span>
            {renderPaymentIcon()}
            <span className="ml-1">{selectedPaymentMethod}</span>
          </p>

          {orderStatus && (
            <div>
              <h3 className="text-xl font-semibold mt-6 flex items-center">Status:
                {orderStatus === 'Success' && <Check className="w-6 h-6 text-green-500 mx-2" />}
                {orderStatus === 'Failure' && <X className="w-6 h-6 text-red-500 mx-2" />}
                {orderStatus === 'Pending' && <Clock className="w-6 h-6 text-yellow-500 mx-2" />}
                {orderStatus}
              </h3>
              {orderStatus === 'Success' && <p className="text-green-500">Your order was successfully processed.</p>}
              {orderStatus === 'Failure' && <p className="text-red-500">There was an issue processing your order. Please try again later.</p>}
              {orderStatus === 'Pending' && <p className="text-yellow-500">Your order is currently pending processing.</p>}
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          {order?.items.map((item: any, index: any) => (
            <div key={index} className="flex items-center mb-4 bg-white rounded-lg shadow-md p-4">
              <BaggageClaim className="w-8 h-8 mr-4 text-gray-600" />
              <div className="flex-grow">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
                <p className="text-gray-600">Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmationPage;
