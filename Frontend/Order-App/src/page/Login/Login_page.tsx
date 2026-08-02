import { IoEye, IoEyeOff } from 'react-icons/io5';
import './Login_page.css'
import { useState } from 'react';


export default function Login_page(){
    const [username, saveUserName] = useState<string>("");
  const [password, savePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
    return(
        <div className='Contain'>
            <div className='input_contain'>
                <div className="field-contain">
                    <div className="username">
                    <label htmlFor="username">User Name:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Nhập username"
                        onChange={(e) => saveUserName(e.target.value)}>
                    </input>
                </div>
                <div className="password">
                    <label htmlFor="pass">Password: </label>
                    <div className="password-field">               
                    <input
                    className="passwordInput"
                    type={showPassword ? "text" : "password"}
                    id="pass"
                    placeholder="Nhập password"
                    onChange={(e) => savePassword(e.target.value)}
                    value={password}/>
                    <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <IoEye color="black" /> : <IoEyeOff color="black"/>}
                    </button> 
                    </div>
                </div>
                </div>
                <button className='btn-login'>Đăng Nhập</button>
            </div>
        </div>
    )
}