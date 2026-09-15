import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getWishlist, addWishlistItem, removeWishlistItem } from '../api/wishlist';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function WishlistProvider({ children }) {
  const { isAuthenticated, initializing: authInitializing } = useAuth();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = wishlist?.WishlistItems || [];
  const itemCount = items.length;

  const refresh = useCallback(async () => {
    if (authInitializing) return;
    if (!isAuthenticated) {
      setWishlist(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getWishlist();
      setWishlist(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authInitializing]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isInWishlist = useCallback(
    (productId) => items.some((item) => item.productId === productId),
    [items]
  );

  const toggleWishlist = useCallback(
    async (product) => {
      if (!isAuthenticated) {
        return { ok: false, message: 'Please log in to save items to your wishlist.' };
      }
      setLoading(true);
      setError(null);
      try {
        if (isInWishlist(product.id)) {
          await removeWishlistItem(product.id);
        } else {
          await addWishlistItem(product.id);
        }
        await refresh();
        return { ok: true };
      } catch (err) {
        setError(err.message);
        return { ok: false, message: err.message };
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, isInWishlist, refresh]
  );

  return (
    <WishlistContext.Provider
      value={{ wishlist, items, itemCount, loading, error, isInWishlist, toggleWishlist, refresh }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
