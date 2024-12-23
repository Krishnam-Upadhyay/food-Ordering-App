import { CartItem, Product } from "@types";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { addWhitelistedNativeProps } from "react-native-reanimated/lib/typescript/ConfigHelper";

type cartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};
const CartContext = createContext<cartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const cartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size == size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
    router.push("/cart");
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id != itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default cartProvider;
