import Head from 'next/head';
import { useQuery } from 'urql';
import Product from '../components/Product';
import { PRODUCT_QUERY } from '../lib/query';
import { GalleryWrapper } from '../styles/GalleryWrapper';

export default function Home() {
  //Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  //check for data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>Styled Homepage</title>
        <meta name='description' content='Styled e-commerce store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <GalleryWrapper>
          {products.map((product) => (
            <Product product={product} key={product.attributes.slug} />
          ))}
        </GalleryWrapper>
      </main>
    </div>
  );
}
