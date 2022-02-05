import axios from "axios";
import { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal/Modal";
import style from "./cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout/Checkout";

const Cart = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  console.log(cartCtx, "this is y contes");

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  //*submitOrderhandler for getting data from checkout
  const submitOrderHandler = (userData) => {
    //*send data to server
    axios.post(
      "https://fatafatkhana-1b8d8-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        user: userData,
        orderedItems: cartCtx.items,
      }
    );
  };

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && (
        <Checkout onSubmit={submitOrderHandler} onCancel={onClose} />
      )}
      {!isCheckout && (
        <div className={style.actions}>
          <button className={style["button--alt"]} onClick={onClose}>
            Close
          </button>

          {hasItems && (
            <button className={style.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
};

export default Cart;
