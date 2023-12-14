import React from 'react';
import { AiFillInstagram, AiOutlineCopyright, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p className='flex justify-center items-center'><AiOutlineCopyright className='inline text-sm mt-0.5 mr-1'/>2023 ShopNow Products. All Rights Reserved.</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer