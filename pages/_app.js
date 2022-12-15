import '../styles/globals.css';
import { Provider, createClient } from 'urql';
import Nav from '../components/Nav';
import { ShopProvider } from '../context/ShopContext';

//backend url
const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <ShopProvider>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </ShopProvider>
  );
}

export default MyApp;
