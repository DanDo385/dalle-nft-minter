// pages/_app.jsx
import '../styles/globals.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DALL-E NFT Minter</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
//
