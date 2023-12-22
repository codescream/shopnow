import React, { createContext, useContext, useState, useEffect} from "react";
import toast from "react-hot-toast";

const ContextState = createContext();

const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
    setTotalPrice(Number(localStorage.getItem('totalPrice')) || 0);
    setTotalQuantities(Number(localStorage.getItem('totalQuantities')) || 0);
  }, []);

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty > 1) {
        return prevQty - 1;
      } else {
        return 1;
      }
    });
  }

  const addToCart = (product, qty) => {
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + qty);
    localStorage.setItem('totalQuantities', `${totalQuantities + qty}`);

    setTotalPrice((prevTotalPrice) => {return (Number(prevTotalPrice) + Number(qty) * Number(product.price)).toFixed(2)});
    localStorage.setItem('totalPrice', `${(Number(totalPrice) + Number(qty) * Number(product.price)).toFixed(2)}`);

    const alreadyAdded = cartItems.find((item) => item._id === product._id);
    let updatedCart = [];

    if (alreadyAdded) {
      updatedCart = cartItems.map((cartItem) => {
        if(cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + qty
          }
        }else {
          return {...cartItem}
        }
      });
    }else {
      updatedCart = [
        ...cartItems,
        {...product,
          quantity: qty
        }
      ] 
    }
    setQty(1);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(([...updatedCart]));
    toast.success(`${qty} ${product.name} added to cart!`);
  }

  const removeFromCart = (product, qty = null) => {
    if(qty) {
      const updatedCart = cartItems.map((cartItem) => {
        if(cartItem._id === product._id && cartItem.quantity > 1) {
          setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - qty);
          localStorage.setItem('totalQuantities', `${totalQuantities - qty}`);

          setTotalPrice((prevTotalPrice) => {return (Number(prevTotalPrice) - Number(qty) * Number(product.price)).toFixed(2)});
          localStorage.setItem('totalPrice', `${(Number(totalPrice) - Number(qty) * Number(product.price)).toFixed(2)}`);

          toast.success(`${qty} ${product.name} removed from cart!`);

           return {
            ...cartItem,
            quantity: cartItem.quantity - 1
           }
        }else {
          return {...cartItem}
        }
      });

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(([...updatedCart]));
    }else {
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - product.quantity);
      localStorage.setItem('totalQuantities', `${totalQuantities - product.quantity}`);

      setTotalPrice((prevTotalPrice) => {return (Number(prevTotalPrice) - Number(product.quantity) * Number(product.price)).toFixed(2)});
      localStorage.setItem('totalPrice', `${(Number(totalPrice) - Number(product.price) * Number(product.price)).toFixed(2)}`);

      toast.success(`${product.name} removed from cart!`);
      const filteredCart = cartItems.filter((cartItem) => cartItem._id !== product._id);

      localStorage.setItem('cartItems', JSON.stringify(filteredCart));
      setCartItems([...filteredCart]);
    }
  }


  return (
    <ContextState.Provider value={{
      showCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      addToCart,
      setShowCart,
      removeFromCart,
      setCartItems,
      setTotalPrice,
      setTotalQuantities
    }}>
      {children}
    </ContextState.Provider>
  )
}

export const useContextState = () => useContext(ContextState);

export default StateContext;