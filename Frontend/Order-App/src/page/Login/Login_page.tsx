import './Login_page.css';
import { useState } from 'react';
import Login from '../../component/Login/Login';
import Register from '../../component/Register/register';

export default function Login_page() {
    const [login, setLogin] = useState<boolean>(true);

    return (
        <div className='Contain'>
            <div className='input_contain'>
                <nav className='nav-log'>
                    <button
                        onClick={() => setLogin(true)}
                        style={{
                            backgroundColor: !login ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                            transition: '0.8s',
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setLogin(false)}
                        style={{
                            backgroundColor: login ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                            transition: '0.8s',
                        }}
                    >
                        Register
                    </button>
                </nav>
                {login ? <Login /> : <Register />}
            </div>
        </div>
    );
}