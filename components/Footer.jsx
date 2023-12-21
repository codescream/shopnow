import React from 'react';
import { AiFillGithub, AiFillInstagram, AiOutlineCopyright, AiOutlineTwitter } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p><AiOutlineCopyright className='inline   mb-[3px] mr-1'/>2023 ShopNow Products. All Rights Reserved.</p>
      <p className='icons'>
        <a href="https://github.com/codescream?tab=repositories" target="_blank" rel="noopener noreferrer">
          <AiFillGithub />
        </a>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer;