import { Routes, Route, Navigate } from 'react-router-dom'
import React, {useState} from 'react';
import './App.css';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import UserRegister from './views/UserRegister';
import GalleryCreate from './views/GalleryViews/GalleryCreate';
import GalleryList from './views/GalleryViews/GalleryList';
import PostCreate from './views/GalleryViews/PostCreate';
import Scribblenavbar from './components/Navbar';


function App() {
  const [logged, setLogged] = useState(null)
  const [user, setUser] = useState()
  return (
    <div className="App">
      <div>
        <Scribblenavbar />
        <Routes>
          <Route element={<Navigate to='/register'  replace />}  path='/' ></Route>
          <Route element={<UserRegister setLogged={setLogged} logged={logged} />} path='/register' ></Route>
          <Route element={<Dashboard logged={logged} setLogged={setLogged} />} path='/dashboard/' ></Route>
          <Route element={<Profile user={user} setUser={setUser} />} path='/profile/:user_id' ></Route>
          <Route element={<GalleryCreate user={user} setUser={setUser} />} path='/gallery/create/:user_id' ></Route>
          <Route element={<GalleryList user={user} setUser={setUser} />} path='/gallery/:id/:index' ></Route>
          <Route element={<PostCreate user={user} setUser={setUser} />} path='gallery/post/new/:index' ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
