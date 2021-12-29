import Input from "../../UI/input/Input";
import style from "./mealItemForm.module.css";

const MealItemForm = (props) => {
  return (
    <form className={style.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
