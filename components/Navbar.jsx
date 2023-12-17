import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useContextState } from '../context/StateContext';
import Cart from './Cart';

const Navbar = () => {
  const { totalQuantities, showCart, setShowCart } = useContextState();

  console.log(showCart);

  const toggleCart = () => {
    setShowCart(!showCart);
  }
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href={'/'}>
          ShopNow
        </Link>
      </p>

      {!showCart && <button type='button' className='cart-icon'
        onClick={toggleCart}
      >
        <AiOutlineShopping />
        <div className='cart-item-qty'>
          <span>{totalQuantities}</span>
        </div>
      </button>}
      { showCart && <Cart /> }
    </div>
  )
}

export default Navbar;