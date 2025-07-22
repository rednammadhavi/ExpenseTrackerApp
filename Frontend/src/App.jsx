import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home/Home';
import SetAvatar from './Pages/Avatar/setAvatar';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgetPassword from './Pages/Auth/ForgetPassword';

const App = () => {
  return (
    <div className="App bg-gray-900 min-h-screen text-white">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
              </>
            }
          />
          <Route
            path="/forgotPassword"
            element={
              <>
                <Header />
                <ForgetPassword />
              </>
            }
          />
          <Route
            path="/setAvatar"
            element={
              <>
                <Header />
                <SetAvatar />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
