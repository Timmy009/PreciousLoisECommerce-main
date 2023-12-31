/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAllCartItemsUrl } from '../../api/Api';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const sessionId = localStorage.getItem('sessionId');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateCartItems = async () => {
      const cartId = localStorage.getItem('cartId');
      const response = await axios.get(getAllCartItemsUrl(sessionId, cartId));
      if (response.status === 200) {
        setCartItems(response.data.response.data);
        setLoading(false)
      } else {
        // Handle error here
      }
    };

    updateCartItems();
  }, [sessionId]);

  return (
    <CartContext.Provider value={{ cartItems, loading, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
