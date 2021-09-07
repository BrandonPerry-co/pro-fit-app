//import React, {useState} from 'react';
// import './App.css';
// import Login from './components/Login';
// import Register from './components/Register';
// import MealList from './MealList';
// import AppBar from './DenseAppBar';
// require('dotenv').config();


// function App() {
//   const [mealData, setMealData] = useState(null);
//   const [calories, setCalories] = useState(2000);

//   function handleChange(event) {
//     setCalories(event.target.value);
//   }

//   function getMealData() {
//     fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${calories}`)
//     .then((response) => response.json())
//     .then((data) => {
//       setMealData(data);
//       console.log(data);
//     })
//     .catch(()=> {
//       console.log("error");
//     });
//   }
//   return (
//     <div>
//     <div className="App">
//     <AppBar />
//       <h1>Hello Fit-pro</h1>
//       <h3>Login</h3>
//       <Login />
//       <h3>Register</h3>
//       <Register />

//       <h3>**Please enter total daily calories below to generate a new Daily meal plan**</h3>
//       <section className='controls'>
//         <input type="number"
//         placeholder="Calories (e.g. 2000)" 
//         onChange={handleChange}/>
//       </section>
//      <button onClick={getMealData}>Get Daily Meal Plan</button>
//      {mealData && <MealList mealData={mealData} />}

//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Router />
        <Footer />
      </BrowserRouter>
  );
}

export default App;
