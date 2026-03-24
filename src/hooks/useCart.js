import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/Auth-Api-Client";

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // ✅ Create or Get Cart
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/carts/");

      if (!cartId) {
        localStorage.setItem("cartId", response.data.id);
        setCartId(response.data.id);
      }

      setCart(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  // ✅ Add Hotel to Cart
  const addToCart = useCallback(
    async (hotel_id, quantity = 1) => {
      if (!cartId) await createOrGetCart();

      try {
        const response = await authApiClient.post(
          `/carts/${cartId}/items/`,
          {
            hotel_id, // ✅ FIXED
            quantity,
          }
        );

        return response.data;
      } catch (error) {
        console.log("Add to cart error", error);
      }
    },
    [cartId, createOrGetCart]
  );

  // ✅ Update
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
        quantity,
      });
    },
    [cartId]
  );

  // ✅ Delete
  const deleteCartItem = useCallback(
    async (itemId) => {
      await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
    },
    [cartId]
  );

  useEffect(() => {
    createOrGetCart();
  }, [createOrGetCart]);

  return {
    cart,
    loading,
    cartId,
    addToCart,
    updateCartItemQuantity,
    deleteCartItem,
  };
};

export default useCart;