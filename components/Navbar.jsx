import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href={'/'}>
          ShopNow
        </Link>
      </p>

      <button type='button' className='cart-icon'
        onClick={() => {}}
      >
        <AiOutlineShopping />
        <div className='cart-item-qty'>
          <span>4</span>
        </div>
        
      </button>
    </div>
  )
}

export default Navbar;