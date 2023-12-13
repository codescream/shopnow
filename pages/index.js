import React from 'react';
import { HeroBanner, Product, FooterBanner } from '../components/index';
import { client } from '../lib/client';

const Home = ({products, bannerData}) => {

  console.log('Hiiii');
  console.log(products);
  console.log(bannerData);
  return (
    <>
      <HeroBanner />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product, index) => (
          <p key={index}>{product.name}</p>
        ))}
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async ({ req, res }) => {
  const query = `*[_type == "product"]`

  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`

  const bannerData = await client.fetch(bannerQuery);

  return {
    props:{ products, bannerData }
  }
};
export default Home;