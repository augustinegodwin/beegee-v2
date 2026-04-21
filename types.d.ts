type User = {
  _id: string;
  name: string;
  phoneNumber: string;
  address: string;
  level: string;
  school: string;
  profileImage: string;
  appartment: string;
  walletBalance: number;
  verified: boolean;
  walletDebt: number;
  suspended: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Product = {
  _id: string;
  user: string;
  title: string;
  description: string;
  category: string;
  image: productImage[];
  price: number;
  replacementPrice: any;
  rating: number;
  views: any[];
  availabilityStatus: boolean;
  forSale: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: any[];
  id: string;
};

type productImage = {
  url: string;
  width: number;
  height: number;
  aspectRatio: number;
  _id: string;
  id: string;
};

type Order = {
  _id: string;
  status: string;
  subtotal: number;
  rentHours: number;
  forSale: boolean;
  item: {
    title: string;
    category: string;
    price: number;
  };
  user: {
    name: string;
    phoneNumber: string;
  };
  renter: {
    name: string;
    phoneNumber: string;
  };
};
type OrderDetails = {
  _id: string
  subtotal: number
  lateFeeAmount: number
  forSale: boolean
  item: OrderItem
  status: "paid" | "delivered" | "return" | "completed"  
  user: OrderUser
  renter: Renter
  name: string
  phoneNumber: string
  address: string
  appartment: string
  shippingMethod: string
  paymentIntentId: string
  flw_ref: string
  tx_ref: string
  lateFeeApplied: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
  
type OrderItem = {
  _id: string
  title: string
  category: string
  price: number
  id: string
  image: productImage[];
}

type OrderUser = {
  _id: string
  name: string
  phoneNumber: string
  address: string
  profileImage: string
  appartment: string
}

type Renter = {
  _id: string
  name: string
  phoneNumber: string
  address: string
  profileImage: string
  appartment: string
}
