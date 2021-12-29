import style from "./backdrop.module.css";

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className={style.backdrop}></div>;
};

export default Backdrop;
