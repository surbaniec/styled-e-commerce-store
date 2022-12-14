import { useQuery } from 'urql';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import { useRouter } from 'next/router';
import {
  ProductDetailsWrapper,
  ProductInfoWrapper,
  QuantityWrapper,
  BuyButtonWrapper,
} from '../../styles/ProductDetailsWrapper';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useShopContext } from '../../context/ShopContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  const { quantity, increaseQuantity, decreaseQuantity, addToCart } =
    useShopContext();

  //Fetch slug
  const { query } = useRouter();

  //Fetch graphql data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });

  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { title, description, image } = data.products.data[0].attributes;

  //Create a toast
  const notify = () => {
    toast.success('Product added to the cart');
  };

  return (
    <ProductDetailsWrapper>
      <img src={image.data.attributes.formats.medium.url} alt={title} />
      <ProductInfoWrapper>
        <h3>{title}</h3>
        <p>{description}</p>
        <QuantityWrapper>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQuantity} />
          </button>
          <p>{quantity}</p>
          <button onClick={increaseQuantity}>
            <AiFillPlusCircle />
          </button>
        </QuantityWrapper>
        <BuyButtonWrapper
          onClick={() => {
            addToCart(data.products.data[0].attributes);
            notify();
          }}
        >
          Add to cart
        </BuyButtonWrapper>
      </ProductInfoWrapper>
    </ProductDetailsWrapper>
  );
}
