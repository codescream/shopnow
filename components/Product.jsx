import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product: {image, name, slug, price} }) => {
  return (
    <div>
      <Link href={`product/${slug.current}`}>
        <div className='product-card'>
          <img src={urlFor(image && image[0])} alt="product" className='w-[150px] h-[150px] md:w-[250px] md:h-[250px] product-image rounded-xl' />
          <p className='product-name break-words'>
            {name}
          </p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product;