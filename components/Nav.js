import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { useShopContext } from '../context/ShopContext';
import { NavWrapper, NavItemsWrapper } from '../styles/NavWrapper';
import Cart from './Cart';

export default function Nav() {
  const { showCart, openCart } = useShopContext();
  return (
    <NavWrapper>
      <Link href={'/'}>Styled.</Link>
      <NavItemsWrapper>
        <div onClick={() => openCart()}>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItemsWrapper>
      {showCart && <Cart />}
    </NavWrapper>
  );
}
