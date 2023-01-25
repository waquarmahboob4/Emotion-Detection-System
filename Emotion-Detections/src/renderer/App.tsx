import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home/index';
import Hello from './Pages/Workspace/index';
import Login from './Pages/Login/index';
import Register from './Pages/Register';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Workspace/:userName" element={<Hello />} />
      </Routes>
    </Router>
  );
}
