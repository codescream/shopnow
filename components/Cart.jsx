/* eslint-disable @next/next/no-img-element */
import React, { useRef} from 'react';
import { useContextState } from '../context/StateContext';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineRight, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { urlFor } from '../lib/client';

const Cart = () => {
  const { showCart, setShowCart, cartItems, totalPrice, totalQuantities, decQty, incQty, qty, addToCart, removeFromCart  } = useContextState();

  const cartRef = useRef();

  console.log(cartItems);

  const toggleCart = () => {
    setShowCart(!showCart);
  }

  return (
    <div className='cart-wrapper'
      ref={cartRef}
    >
      <div className='h-[100vh] flex-1'
        onClick={toggleCart}
      ></div>
      <div className='cart-container'>
        <button type='button'
          onClick={toggleCart}
          className='cart-heading'
        >
          <AiOutlineRight />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        {
          !cartItems?.length && (
            <div className='empty-cart flex flex-col justify-center items-center'>
              <AiOutlineShopping size={150} />
              <h3>Your shopping bag is empty</h3>

              <button type="button"
                className='btn'
                onClick={toggleCart}
              >
                Continue Shopping
              </button>
            </div>
          )
        }
        {
          cartItems.length > 0 && (
            <div className='product-container'>
              {
                cartItems.map((cartItem) => 
                  <div key={cartItem?._id} className='product'>
                    <img src={urlFor(cartItem?.image[0])} alt="product" 
                      className='cart-product-image'
                    />
                    <div className='item-desc flex flex-col justify-around'>
                      <div className='flex-diff'>
                        <h3>{cartItem?.name}</h3>
                        <h4>${cartItem?.price}</h4>
                      </div>
                      <div className='flex gap-4 items-center'>
                        <p className='quantity-desc rounded-sm'>
                          <span className='minus'
                            onClick={() => {removeFromCart(cartItem, 1)}}
                          ><AiOutlineMinus /></span>
                          <span className='num'>{cartItem?.quantity}</span>
                          <span className='plus' onClick={() => addToCart(cartItem, 1)} ><AiOutlinePlus /></span> 
                        </p>
                        <button className='cart-delete bg-[#f02d34] px-3 rounded-sm text-white'
                          onClick={() => removeFromCart(cartItem)}
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
        {
          cartItems?.length > 0 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button type='button'
                  className='btn'
                  onClick={() => {}}
                >
                  Pay with Stripe
                </button>
              </div>
            </div>
          )
      }
      </div>
    </div>
  )
}

export default Cart;