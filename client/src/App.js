import './App.css';
import Login from './components/Login';
import DenseAppBar from './components/DenseAppBar';


const isRegistered = false;


function App() {
  return (
    <div className="App">
      <DenseAppBar />
      <h1>Hello Fit-pro</h1>
      <Login isRegistered={isRegistered}/>
      
    </div>
  );
}

export default App;
