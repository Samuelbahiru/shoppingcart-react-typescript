import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContext = {
  openCart: () => void
  closeCart:()=> void
  getItemQunatity: (id: number) => number;
  increaseCartQunatity: (id: number) => void;
  decreaseCartQunatity: (id: number) => void;
  removeFromQuantity: (id: number) => void;
  cartQuantity: number
  isOpen: boolean
  cartItems: CartItem[]
};
type CartItem ={
  id: number
  quantity: number;
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems ] = useLocalStorage<CartItem[]>("shoppingcart", [])
  const cartQuantity =  cartItems.reduce((quantity, item)=> item.quantity + quantity, 0)


  const openCart = ()=>{
    setIsOpen(true)
  }
  const closeCart = ()=>{
    setIsOpen(false)
  }
  

  function getItemQunatity(id: number){
    return cartItems.find((item)=>item.id===id)?.quantity || 0
  }
  function increaseCartQunatity(id: number){
    setCartItems((currentItems) =>{
      if(currentItems.find(item=>item.id === id) == null){
        return[...currentItems, {id,quantity: 1}]
      }
      else{
        return currentItems.map(item=>{
          if(item.id === id){
            return {...item, quantity: item.quantity + 1}
          }
          else{
            return item;
          }
        })
      }
    })
  }
  function decreaseCartQunatity(id: number){
    setCartItems((currentItems) =>{
      if(currentItems.find(item=>item.id === id)?.quantity === 1){
        return currentItems.filter(item=> item.id !==id)  
      }
      else{
        return currentItems.map(item=>{
          if(item.id === id){
            return {...item, quantity: item.quantity - 1}
          }
          else{
            return item;
          }
        })
      }
    })
  }
  function removeFromQuantity(id:number){
      setCartItems((currentItems)=>{
          return currentItems.filter(item=> item.id !==id)
      })
 }

  
  

  return (
    <ShoppingCartContext.Provider value={{getItemQunatity, isOpen, increaseCartQunatity, decreaseCartQunatity, removeFromQuantity, cartItems, cartQuantity, openCart, closeCart }}>
      {children}
      < ShoppingCart/>
    </ShoppingCartContext.Provider>
  );
}
