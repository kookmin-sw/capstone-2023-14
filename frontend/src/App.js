import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/login';
import Join from './pages/Join/join';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Record from './pages/Record/record';
import Board from './pages/Board/board';
import BoardContent from './pages/Board/boardContent';
import MyPage from './pages/MyPage/myPage';
import Setting from './pages/Setting/setting';
import TasteSetting from './pages/Setting/tasteSetting';
import ChatTest from './pages/ChatTest';
import Info from './pages/Info/Info';
import BoardUpload from './pages/Board/boardUpload';

function App() {
  return (
    <div
      className="App"
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        height: '100vh',
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
        <Route path="/record" element={<Record />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<BoardContent />} />
        <Route path="/board/upload" element={<BoardUpload />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/info" element={<Info />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/setting/taste" element={<TasteSetting />} />
        <Route path="/chatTest" element={<ChatTest />} />
      </Routes>
    </div>
  );
}

export default App;
