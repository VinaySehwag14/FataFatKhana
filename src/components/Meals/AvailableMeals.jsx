import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import style from "./availableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  // *Fething meal data from firebase
  useEffect(() => {
    setIsLoading(true);
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
          description: Objdata[key].description,
          price: Objdata[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={style.MealIsLoading}>Loading...</section>;
  }

  if (httpError) {
    return (
      <section className={style.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  //* Rendering meal items

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={style.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
