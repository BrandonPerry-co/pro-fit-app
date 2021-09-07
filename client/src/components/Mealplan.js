import React, {useState} from 'react';
import './Styles/mealList.css';
import MealList from './MealList';
require('dotenv').config();


function MealPlan() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function handleChange(event) {
    setCalories(event.target.value);
  }

  function getMealData() {
    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${calories}`)
    .then((response) => response.json())
    .then((data) => {
      setMealData(data);
      console.log(data);
    })
    .catch(()=> {
      console.log("error");
    });
  }
  return (
    <div>
    <div className="App">
      <h1 className="mealPlanTitle">Daily Meal Plan</h1>
      <h3>**Please enter total daily calories below to generate a new Daily meal plan**</h3>
      <section className='controls'>
        <input type="number"
        placeholder="Calories (e.g. 2000)" 
        onChange={handleChange}/>
      </section>
     <button onClick={getMealData} style={{backgroundColor: '#c92e00', padding: '10px 0px'}} >Get Daily Meal Plan</button>
     {mealData && <MealList mealData={mealData} />}

      </div>
    </div>
  );
}

export default MealPlan;