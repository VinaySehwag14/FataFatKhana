import style from "./input.module.css";

const Input = (props) => {
  return (
    <div className={style.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
