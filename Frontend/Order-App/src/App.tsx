import './App.css';
import Login_page from './page/Login/Login_page';
import Menu_page from './page/Menu_page/menu_page';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path="/login" element={<Login_page />} />
        <Route path="/menu" element={<Menu_page />} />
      </Routes>
    </>
  );
}

export default App;
