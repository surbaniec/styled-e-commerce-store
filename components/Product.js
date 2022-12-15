import { ProductWrapper } from '../styles/ProductWrapper';

export default function Product({ product }) {
  const { title, price, image } = product.attributes;
  return (
    <ProductWrapper>
      <div>
        <img src={image.data.attributes.formats.small.url} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
    </ProductWrapper>
  );
}
