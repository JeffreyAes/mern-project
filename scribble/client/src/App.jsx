import { Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css';
import Dashboard from './views/Dashboard';
import UserRegister from './views/UserRegister';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route element={<Navigate to='/register' replace />} path='/' ></Route>
          <Route element={<UserRegister />} path='/register' ></Route>
          <Route element={<Dashboard />} path='/dashboard' ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
