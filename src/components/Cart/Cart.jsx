import Modal from "../UI/Modal/Modal";
import style from "./cart.module.css";

const Cart = ({ onClose }) => {
  const cartItems = (
    <ul className={style["cart-items"]}>
      {[{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }].map(
        (cartItem) => (
          <li>{cartItem.name}</li>
        )
      )}
    </ul>
  );

  return (
    <Modal onClose={onClose}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={onClose}>
          Close
        </button>
        <button className={style.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
