import { ReactNode, createContext, useContext } from "react";
type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContext = {
  getItemQunatity: (id: number) => number;
  increaseCartQunatity: (id: number) => void;
  decreaseCartQunatity: (id: number) => void;
  removeFromQuantity: (id: number) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  return (
    <ShoppingCartContext.Provider value={{}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
