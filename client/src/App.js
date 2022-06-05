import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotels from './pages/hotels/Hotels';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/hotels" element={<Hotels/>}/>
        <Route path="/hotels/:id" element={<Hotel />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
