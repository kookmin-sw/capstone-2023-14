import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';

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
      </Routes>
    </div>
  );
}

export default App;
