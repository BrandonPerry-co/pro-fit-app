import './Styles/bodyCompStyles.css';
import { useState } from "react";
import axios from 'axios';


function BodyComp() {

  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");

  const [newWeight, setNewWeight] = useState(0);

  const [bodyCompList, setBodyCompList] = useState([]);

const addBodyComp = () => {
  axios.post('http://localhost:4001/create', {
    weight: weight, 
    height: height, 
    age: age, 
    gender: gender

   }).then(() =>{
     setBodyCompList([
       ...bodyCompList,{
        weight: weight, 
        height: height, 
        age: age, 
        gender: gender
       }
     ]);
   });
};

const getBodyComp = () =>{
  axios.get('http://localhost:4001/bodycomp').then((response) => {
     setBodyCompList(response.data)
   });
}

const updateBodyComp = (id) =>{
  axios.put('http://localhost:4001/update',{weight: newWeight, id: id})
  .then((response) => {
     alert("Your Body Composition was updated!")
     setBodyCompList(bodyCompList.map((val)=> {
       return val.id == id ? {id: val.id, weight: val.newWeight, height: val.height, age: val.age, gender: val.gender} : val
     }))
   });
}

const deleteBodyComp = (id) =>{
  axios.delete(`http://localhost:4001/delete/${id}`)
  .then((response) => {
     alert("Your Body Composition was Deleted!")
     setBodyCompList(bodyCompList.filter((val)=> {
       return val.id != id 
     }))
   });
}


  return (
    <div className="App">
      <h1 className="infoTitle">Body Composition</h1>
      <div className="info">
      <label>Weight(lbs):</label>
      <input type="number" onChange={(event)=>{
        setWeight(event.target.value);
      }} />
      <label>Height(in):</label>
      <input type="number" onChange={(event)=>{
        setHeight(event.target.value);
      }} />
      <label>Age:</label>
      <input type="number" onChange={(event)=>{
        setAge(event.target.value);
      }} />
      <label>Gender:</label>
      <input type="text" onChange={(event)=>{
        setGender(event.target.value);
      }} />
      <button onClick={addBodyComp} className="button">Add BodyComp</button>
      </div>

      <div className="bodycomplist">
      <button onClick={getBodyComp} className="button">Show Body Comp History</button>

  {bodyCompList.map((val, key) => {
    return (
    <div className="bodycomp" key={val.id}>
    <div>
      <div className="results" key={val.id}>
        <p><b>Your current weight: </b>{val.weight}</p>
        <p><b>BMI:</b> { Math.floor(703 * val.weight / val.height ** 2) }</p>
        <p><b>Body Fat %:</b>  { Math.floor(1.20 * ( 703 * val.weight / val.height ** 2 ) + 0.23 * val.age - 16.2) }</p>
        <p><b>Weight Loss Calories:</b>  { Math.floor(10 * val.weight + 6.25 * val.height - 5 * val.age * 1.325 - 300) }</p>
        <p><b>Weight Gain Calories:</b>  { Math.floor(10 * val.weight + 6.25 * val.height - 5 * val.age * 1.325 + 300) }</p>
        </div>
    </div>
    <div className="upDateInput">
    {""}
    <input type="text" placeholder="Enter new body weight here" 
    onChange={(event)=>{
        setNewWeight(event.target.value);
      }}
      />
    <button onClick={()=>{updateBodyComp(val.id)}}>Update</button>
    <button onClick={()=>{deleteBodyComp(val.id)}}>Delete</button>
    </div>
    </div>
    );
  })}
      </div>
      

    </div>
  );
}

export default BodyComp;
