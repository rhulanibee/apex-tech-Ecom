import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addCartItem, removeCartItem } from '../api/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null); // backend cart shape: { id, CartItems: [...] }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const items = cart?.CartItems || [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.priceAtAdd) * item.quantity,
    0
  );

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(
    async (product, quantity = 1) => {
      if (!isAuthenticated) {
        return { ok: false, message: 'Please log in to add items to your cart.' };
      }
      setLoading(true);
      setError(null);
      try {
        await addCartItem({
          productId: product.id,
          quantity,
          priceAtAdd: product.price,
        });
        await refreshCart();
        return { ok: true };
      } catch (err) {
        setError(err.message);
        return { ok: false, message: err.message };
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, refreshCart]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      if (!cart) return;
      setLoading(true);
      setError(null);
      try {
        await removeCartItem(cart.id, productId);
        await refreshCart();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [cart, refreshCart]
  );

  return (
    <CartContext.Provider
      value={{ cart, items, itemCount, subtotal, loading, error, addToCart, removeFromCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
