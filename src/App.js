import './App.css';
import { Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
