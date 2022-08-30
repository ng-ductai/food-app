import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';
import useFirestoreProducts from '../../../hooks/useFirestoreProducts';
import { AuthContext } from '../../../contexts/AuthContext';
import CartItem from './CartItem';

const CartItems = () => {
  const cartProducts = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const { addToFirestore, removeFromFirestore } = useFirestoreProducts();

  const handleAddToFirestore = (product, action) => {
    addToFirestore(user.uid, {
      type: 'success',
      productInfo: product,
      action: action,
    });
  };

  const handleRemoveFromFirestore = (product) => {
    removeFromFirestore(user.uid, {
      type: 'success',
      productInfo: product,
    });
  };

  return (
    <div className='cartItems'>
      {cartProducts.map((product) => (
        <CartItem
          handleAddToFirestore={handleAddToFirestore}
          handleRemoveFromFirestore={handleRemoveFromFirestore}
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default CartItems;
