import '../styles/globals.css';
import { Provider, createClient } from 'urql';
import Nav from '../components/Nav';
import { ShopProvider } from '../context/ShopContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';

//backend url
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ShopProvider>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </ShopProvider>
    </UserProvider>
  );
}

export default MyApp;
