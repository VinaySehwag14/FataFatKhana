import React from "react";
import Header from "./components/Layout/header/Header";
import Meals from "./components/Meals/Meals";
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Meals />
      </main>
    </>
  );
};

export default App;
