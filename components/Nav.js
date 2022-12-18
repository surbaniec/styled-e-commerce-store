import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { useShopContext } from '../context/ShopContext';
import { NavWrapper, NavItemsWrapper } from '../styles/NavWrapper';
import Cart from './Cart';
const { AnimatePresence, motion } = require('framer-motion');

export default function Nav() {
  const { showCart, openCart, totalQuantities } = useShopContext();
  return (
    <NavWrapper>
      <Link href={'/'}>Styled.</Link>
      <NavItemsWrapper>
        <div onClick={() => openCart()}>
          {totalQuantities > 0 && (
            <motion.span animate={{ scale: 1 }} initial={{ scale: 0 }}>
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItemsWrapper>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavWrapper>
  );
}
