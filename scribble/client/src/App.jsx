import { Routes, Route, Navigate, Link } from 'react-router-dom'
import React, {useState} from 'react';
import './App.css';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import UserRegister from './views/UserRegister';
import GalleryCreate from './views/GalleryViews/GalleryCreate';
import GalleryList from './views/GalleryViews/GalleryList';
import PostCreate from './views/GalleryViews/PostCreate';

function App() {
  const [logged, setLogged] = useState(null)
  const [gallery, setGallery] = useState()
  return (
    <div className="App">
      <div>
        <Routes>
          <Route element={<Navigate to='/register'  replace />}  path='/' ></Route>
          <Route element={<UserRegister setLogged={setLogged} logged={logged} />} path='/register' ></Route>
          <Route element={<Dashboard logged={logged} setLogged={setLogged} />} path='/dashboard/:id' ></Route>
          <Route element={<Profile />} path='/profile/:user_id' ></Route>
          <Route element={<GalleryCreate />} path='/gallery/create/:user_id' ></Route>
          <Route element={<GalleryList gallery={gallery} setGallery={setGallery} />} path='/gallery/:id' ></Route>
          <Route element={<PostCreate gallery={gallery} setGallery={setGallery} />} path='gallery/post/new' ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
