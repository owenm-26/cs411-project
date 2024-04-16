import "./App.css";
import "./assets/chef-hat-logo.png";
import Recipes from "./components/Recipes";

import { useState } from "react";
import CustomHeader from "./layout/Header";
import InputBox from "./components/InputBox";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(2); // 2 is not used, 1 is worked, 0 is failed
  const [input, setInput] = useState("");
  const ApiCall = async (ingredients) => {
    const fetchRecipes = async () => {
      const apiKey = import.meta.env.VITE_REACT_APP_SPOONACULAR_API_KEY;
      // const ingredients = ["apple", "banana"];
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(
        ","
      )}&number=2&apiKey=${apiKey}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          setIsSuccessful(0);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setIsSuccessful(0);
      }
    };
    fetchRecipes();
    // Empty dependency array to ensure useEffect runs only once
    setIsSuccessful(1);
  };

  const handleInput = () => {
    // handle
    // const ingredients = ["apple", "banana"];
    if (input == [""]) {
      alert("Please enter at least one ingredient!");
      return;
    }
    const ingredients = input.split(",").map((item) => item.trim());
    console.log(ingredients);
    ApiCall(ingredients);
  };

  return (
    <>
      <CustomHeader />
      <h1>Recipes</h1>
      <InputBox setInput={setInput} handleInput={handleInput} />
      {isSuccessful == 1 ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {recipes.map((recipe, idx) => (
            <Recipes item={recipe} key={idx} />
          ))}
        </div>
      ) : isSuccessful == 2 ? (
        <p>No button clicked (don't click it too much) </p>
      ) : (
        <p>Failed! Check console for error.</p>
      )}
    </>
  );
}

export default App;
