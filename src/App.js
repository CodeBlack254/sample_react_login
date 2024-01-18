import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Auth/Home';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <Router>
        <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
