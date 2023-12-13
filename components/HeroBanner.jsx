import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroBanner = () => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>
          SMALL TEXT
        </p>
        <h3>MID TEXT</h3>
        <img src="" alt="headphone" className='hero-banner-image' />

        {/* <Image src='https://source.unsplash.com/random/1600x900' alt='headphone' layout='fill' className='hero-banner-image' /> */}

        <div>
          <Link href={'/product/:id'}>
            <button type='button'>BUTTON TEXT</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner