import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { NavWrapper, NavItemsWrapper } from '../styles/NavWrapper';

export default function Nav() {
  return (
    <NavWrapper>
      <Link href={'/'}>Styled.</Link>
      <NavItemsWrapper>
        <div>
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItemsWrapper>
    </NavWrapper>
  );
}
