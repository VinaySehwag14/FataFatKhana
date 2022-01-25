import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import style from "./availableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  // *Fething meal data from firebase

  useEffect(() => {
    try {
      const fetchMeals = async () => {
        const response = await axios.get(
          "https://fatafatkhana-1b8d8-default-rtdb.firebaseio.com/meals.json"
        );

        const Objdata = response.data;

        const loadedMeals = [];

        for (const key in Objdata) {
          loadedMeals.push({
            id: key,
            name: Objdata[key].name,
            description: Objdata[key].name,
            price: Objdata[key].price,
          });
        }
        setMeals(loadedMeals);
        console.log(response);
      };

      fetchMeals();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <section className={style.meals}>
      <Card>
        <ul>
          {meals.map((meal) => {
            return (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
