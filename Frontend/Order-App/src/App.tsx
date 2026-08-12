import './App.css';
import ProtectRole from './component/Protect/protectRole';
import Bill_admin from './page/Bill_admin_page/Bill_admin';
import Login_page from './page/Login/Login_page';
import Menu_page from './page/Menu_page/menu_page';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path="/login" element={<Login_page />} />
        <Route element= {<ProtectRole allowRole='customer'/>}>
         <Route path="/menu" element={<Menu_page/>} />
        </Route>
        <Route element= {<ProtectRole allowRole='admin'/>}>
        <Route path="/bill" element={<Bill_admin/>}/>
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
