"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setTotalAmount, updateItemQuantity } from '../lib/features/cart/cartSlice';
import { setOrderDetails, setOrderAmount, setOrderItems, setDiscountAmount } from '../lib/features/orders/orderSlice';
import { RootState } from '@/lib/store';
import { fetchOrderDetails, fetchBrandMetadata } from '../lib/api';
import { useRouter } from 'next/navigation';


export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const orderTotal = useSelector((state: RootState) => state.cart.totalAmount);
  const themeColors = useSelector((state: RootState) => state.darkMode.themeColors);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  const [address, setAddress] = useState<string>('');
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [visible, setVisible] = useState(0);

  const [addressError, setAddressError] = useState<string>('');
  const [phoneNoError, setPhoneNoError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrderDetails();
        const brand = await fetchBrandMetadata();
        if (data.products.length > 0) {
          dispatch(setItems(data.products));
          const total = data.products.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
          dispatch(setTotalAmount(total));
          dispatch(setOrderItems(data.products));
          dispatch(setOrderAmount(total));
        } else {
          console.warn('Empty product list received from API');
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleQuantityChange = (itemId: string, quantity: number) => {
    dispatch(updateItemQuantity({ itemId, quantity }));
  };

  const handleApplyPromo = () => {
    if (promoCode === 'EARLYBIRD') {
      const discountAmount = orderTotal * 0.1;
      setDiscount(discountAmount);
      setAppliedPromo(promoCode);
      setVisible(1);
    } else {
      setDiscount(0);
      setAppliedPromo('');
      setVisible(2);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-semibold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600">Please add items to your cart before proceeding.</p>
      </div>
    );
  }

  const discountedTotal = orderTotal - discount;

  const handleProceedToPayment = () => {
    setAddressError('');
    setPhoneNoError('');
    if (!address.trim()) {
      setAddressError('Address is required');
      return;
    }
    if (!phoneNo.trim()) {
      setPhoneNoError('Phone number is required');
      return;
    }
    if (!isValidPhoneNumber(phoneNo)) {
      setPhoneNoError('Invalid phone number format');
      return;
    }
    dispatch(setOrderDetails({ address, phoneNo}));
    dispatch(setDiscountAmount( discount ))
    router.push("/payment");
  };

  const handleRemoveItem = (id: any) => {
    const newItems = cartItems.filter((item: any) => item.id !== id);
    dispatch(setItems(newItems));
    const total = newItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    dispatch(setTotalAmount(total));
    dispatch(setOrderItems(newItems));
    dispatch(setOrderAmount(total));
  }

  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    return /^\d{10}$/i.test(phoneNumber);
  };

  return (
    <div className={`px-4 md:px-8 lg:px-12 xl:px-20 py-8  min-h-[90vh]`} style={{ background: darkMode ? themeColors['--background'] : "gray" }}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 bg-white border border-gray-300 rounded-lg text-slate-800 overflow-hidden p-5 font-bold ">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Delivery Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block mb-1">Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
                {addressError && <p className="text-red-500 mt-1">{addressError}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Phone No:</label>
                <input
                  type="tel"
                  value={phoneNo}
                  maxLength={10}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  className="border rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
                {phoneNoError && <p className="text-red-500 mt-1">{phoneNoError}</p>}
              </div>
            </div>
          </div>

          <h2 className="text-2xl py-2 mb-6">Your Cart</h2>

          <div className="flex items-center justify-between border-b border-slate-400 text-slate-400 pb-3 font-semibold text-sm mb-4">
            <h2 className="uppercase flex-1">Product</h2>
            <h2 className="uppercase w-1/4 text-center">Rate/Pc</h2>
            <h2 className="uppercase w-1/4 text-center">Quantity</h2>
            <h2 className="uppercase w-1/4 text-center">Price</h2>
          </div>
          <div className="">
            {cartItems.map((item: any, index: any) => (
              <div key={index} className="flex items-center justify-between border-b border-slate-400 pb-3 font-semibold text-sm mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Image
                    src={item.image}
                    width={249}
                    height={249}
                    alt="Alt text"
                    className="rounded-xl w-20 h-20"
                  />
                  <div className="flex flex-col">
                    <h2>{item.title.split(' ').slice(0, 3).join(' ')}{item.title.split(' ').length > 3 ? ' ...' : ''}</h2>
                  </div>
                </div>
                <div className="w-1/4 text-center">
                  <h2>₹{item.price}</h2>
                </div>
                <div className="w-1/4 text-center">
                  <div className="flex items-center justify-center">
                    <div className="rounded-xl border border-gray-400 flex items-center">
                      <button className="border-r border-gray-400 py-2 px-3" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                        <Minus />
                      </button>
                      <p className="py-2 px-3">{item.quantity}</p>
                      <button className="border-l border-gray-400 py-2 px-3" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                        <Plus />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-1/4 text-center flex items-center justify-end gap-2">
                  <h4>₹{item.price * item.quantity}</h4>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    <Trash2 className="text-red-600 w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="bg-white border border-gray-300 rounded-lg text-slate-800 overflow-hidden p-5 font-bold">
            <h2 className="text-2xl pb-3">Cart Total</h2>
            <div className="flex items-center justify-between border-b border-slate-500 pb-6">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-green-600 font-semibold">₹{orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pb-4 mt-2">
              <span className="text-gray-600">Discount</span>
              <span className="text-red-600 font-semibold">₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pb-4 mt-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-600">₹0</span>
            </div>
            <div className="flex items-center justify-between pb-4">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-600">₹10</span>
            </div>
            <div className="flex items-center gap-2 py-4">
              <input
                type="text"
                id="coupon"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4"
                placeholder="Enter Coupon"
              />
              <button className="shrink-0 py-2 px-3 rounded-lg bg-lime-600 text-white hover:bg-lime-700 focus:outline-none focus:ring focus:ring-lime-300" onClick={handleApplyPromo}>
                Apply Coupon
              </button>
            </div>
            {promoCode && appliedPromo && visible === 1 ? (
              <p className="text-green-500 text-sm mb-4">
                Promo code <strong>{appliedPromo}</strong> applied! Discount: ₹{(discount).toFixed(2)}
              </p>
            ) : promoCode && !appliedPromo && visible === 2 ? (
              <p className="text-red-500 mb-4">
                Promo code <strong>{promoCode}</strong> is not applicable.
              </p>
            ) : null}
            <div className="flex items-center justify-between py-4 font-bold">
              <span className="text-xl text-gray-600">Total</span>
              <span className="text-2xl text-green-700 font-semibold">₹{(discountedTotal + 10).toFixed(2)}</span>
            </div>
            <button className="bg-blue-500 text-white rounded-lg py-2 px-6 font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" onClick={handleProceedToPayment}>
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
