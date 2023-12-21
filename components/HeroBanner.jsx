import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const HeroBanner = ({ bannerData }) => {
  return (
    <div className='hero-banner-container rounded-b-xl'>
      <div>
        <p className='beats-solo'>
          { bannerData.smallText }
        </p>
        <h3>{ bannerData.midText }</h3>
        <h1 className='text-[3.5rem] md:text-[6rem] lg:text-[8rem]'>{ bannerData.largeText1 }</h1>
        <img src={urlFor(bannerData.image)} alt="headphone" className='hero-banner-image right-[0%] md:right-[20%]' />
        <div>
          <Link href={`/product/${bannerData.product}`}>
            <button type='button'>
              { bannerData.buttonText }
            </button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{ bannerData.desc }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner;