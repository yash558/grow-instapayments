"use client";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/store';
import { CreditCard, DollarSign, Check, X, Clock, BaggageClaim } from 'lucide-react';

const OrderConfirmationPage = () => {
  const [orderStatus, setOrderStatus] = useState('');

  const order = useSelector((state: RootState) => state.order);
  const selectedPaymentMethod = useSelector((state: RootState) => state.payment.selectedMethod);
  const themeColors = useSelector((state: RootState) => state.darkMode.themeColors);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
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
  const paidAmount = order?.totalAmount - order?.discountAmount ?? 0;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center md:px-24 px-8" style={{ background: darkMode ? themeColors['--background'] : "" }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center" style={{ color: darkMode ? "white" : "black" }}>Order Confirmation</h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Details</h2>
          <div className="mb-6">
            <p className="mb-2"><span className="font-semibold text-gray-700">Delivery Address:</span> {order?.orderDetails?.address}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Phone No:</span> {order?.orderDetails?.phoneNo}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Total Amount:</span> ₹{order?.totalAmount.toFixed(2)}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Discount Amount:</span> ₹{order?.discountAmount?.toFixed(2)}</p>
            <p className="mb-2"><span className="font-semibold text-gray-700">Paid Amount:</span> ₹{paidAmount.toFixed(2)}</p>
          </div>

          <div className="mb-6 flex items-center">
            <span className="font-semibold text-gray-700 mr-2">Selected Payment Method:</span>
            <div className="flex items-center">
              {renderPaymentIcon()}
              <span className="ml-2">{selectedPaymentMethod}</span>
            </div>
          </div>

          {orderStatus && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">Status:
                {orderStatus === 'Success' && <Check className="w-6 h-6 text-green-500 ml-2" />}
                {orderStatus === 'Failure' && <X className="w-6 h-6 text-red-500 ml-2" />}
                {orderStatus === 'Pending' && <Clock className="w-6 h-6 text-yellow-500 ml-2" />}
                <span className="ml-2">{orderStatus}</span>
              </h3>
              {orderStatus === 'Success' && <p className="text-green-500">Your order was successfully processed.</p>}
              {orderStatus === 'Failure' && <p className="text-red-500">There was an issue processing your order. Please try again later.</p>}
              {orderStatus === 'Pending' && <p className="text-yellow-500">Your order is currently pending processing.</p>}
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: darkMode ? "white" : "black" }}>Order Items</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {order?.items.map((item: any, index: any) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                  </div>

                </div>
              </div>

            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmationPage;
