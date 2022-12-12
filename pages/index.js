import Head from 'next/head';
import { useQuery } from 'urql';
import { PRODUCT_QUERY } from '../lib/query';

export default function Home() {
  //Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  //check for data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  console.log(data);

  return (
    <div>
      <Head>
        <title>Styled Homepage</title>
        <meta name='description' content='Styled e-commerce store' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Hello NExt</h1>
      </main>
    </div>
  );
}
