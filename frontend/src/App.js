import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Join from './pages/Join/join';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <div
      className="App"
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        minHeight: '100%',
        width: 'auto',
        position: 'relative',
        wordBreak: 'keep-all',
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
