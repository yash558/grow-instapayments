import axios, { AxiosResponse } from 'axios';

interface OrderDetails {
  products: any[];
  paymentMethods: string[];
}

interface BrandMetadata {
  [x: string]: Record<string, string>;
  
}

const cache: {
  orderDetails?: OrderDetails;
  brandMetadata?: BrandMetadata;
} = {};

export const fetchOrderDetails = async (): Promise<OrderDetails> => {
  try {
    if (!cache.orderDetails) {
      const response: AxiosResponse<OrderDetails> = await axios.get('https://groww-intern-assignment.vercel.app/v1/api/order-details');
      cache.orderDetails = response.data;
    }
    return cache.orderDetails;
  } catch (error) {
    throw new Error('Failed to fetch order details');
  }
};

export const fetchBrandMetadata = async (): Promise<BrandMetadata> => {
  try {
    if (!cache.brandMetadata) {
      const response: AxiosResponse<BrandMetadata> = await axios.get('https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata');
      cache.brandMetadata = response.data;
    }
    return cache.brandMetadata;
  } catch (error) {
    console.error('Failed to fetch brand metadata:', error);
    throw error; // Rethrow the error to propagate it
  }
};
