/* eslint-disable @next/next/no-img-element */
import { Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useContextState } from '../../context/StateContext';
import handleCheckout from '../../lib/handleCheckout';

const ProductDetails = ({ product, product: {image, name, details, price}, products}) => {
  const [index, setIndex] = useState(0)
  const { showCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, addToCart, setShowCart } = useContextState();

  const buyNow = () => {
    addToCart(product, 1);
    setShowCart(true);
  }

  return (
    <div>
      <div
        className='product-detail-container'
      >
        <div className='flex flex-row gap-2 sm:flex-col'>
          <div className='product-detail-image'>
            <img src={urlFor(image && image[index])} alt='product'/>
          </div>
          <div className='small-images-container'>
            {
              image.map((image, i) => (
                <img key={i} src={urlFor(image)} alt='alt-product' 
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => {setIndex(i)}}
                />
              ))
            }
          </div>
        </div>
        <div>
          <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <div>
              <h4>Details:</h4>
              <p>{details}</p>
              <p className="product-price">${price}</p>
            </div>
            <div className='quantity'>
              <h4>Quantity:</h4>
              <p className='quantity-desc rounded-sm'>
                <span className='minus'
                  onClick={decQty}
                ><AiOutlineMinus /></span>
                <span className='num'>{qty}</span>
                <span className='plus' onClick={incQty} ><AiOutlinePlus /></span>
              </p>
            </div>
            <div className='buttons'>
              <button type='button'
                className='add-to-cart rounded-lg'
                onClick={() => addToCart(product, qty)}
              >
                Add to Cart
              </button>
              <button
                type='button'
                className='buy-now rounded-lg'
                onClick={buyNow}
              >Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
          <h2 className='flex flex-col gap-0.5 items-center font-bold mt-5 mb-1 justify-center'>
            You may also like
            <hr className='w-3/4 border-t-4 border-gray-300 rounded-md' />
            </h2>
          <div className='marquee'>
            <div className='maylike-products-container track'>
              {
                products.map((product) => <Product key={product._id} product={product} />
                )
              }
              {
                products.slice(0, 8).map((product) => <Product key={product._id} product={product} />
                )
              }
            </div>
          </div>
      </div>
    </div>
  )
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;

  const productsQuery = `*[_type == "product"]`;

  const product = await client.fetch(productQuery);

  const products = await client.fetch(productsQuery);

  return {
    props:{ product, products }
  }
};

export default ProductDetails;