import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Join from './pages/Join/join';

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
      </Routes>
    </div>
  );
}

export default App;
