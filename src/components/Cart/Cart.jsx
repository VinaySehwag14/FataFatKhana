import axios from "axios";
import { useContext, useState } from "react";
import CartContext from "../../store/CartContext";
import Modal from "../UI/Modal/Modal";
import style from "./cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout/Checkout";

const Cart = ({ onClose }) => {
  const [isCheckout, setIsCheckout] = useState(false);

  //* state for error handling
  const [error, setError] = useState(null);

  //*state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  //*state for form did submit
  const [didSubmit, setDidSubmit] = useState(false);

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
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    //*send data to server
    await axios
      .post(
        "https://fatafatkhana-1b8d8-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          user: userData,
          orderedItems: cartCtx.items,
        }
      )
      .catch((error) => {
        setError(error.message);
        console.log(error, "this is my order error");
      });
    setIsSubmitting(false);
    setDidSubmit(true);
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

  const cartModalContent = (
    <>
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
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Order Successfull</p>
      <div className={style.actions}>
        <button className={style.button} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      {error && (
        <p
          style={{
            color: "Red",
            textAlign: "center",
          }}
          className={style.error}
        >
          {error}
        </p>
      )}
      {!error && !isSubmitting && !didSubmit && cartModalContent}
      {!error && isSubmitting && isSubmittingModalContent}
      {!error && !isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
