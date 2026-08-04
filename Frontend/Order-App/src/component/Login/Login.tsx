import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './Login.css'

export default function Login(){
      const navigate=useNavigate();
    const [username, saveUserName] = useState<string>("");
    const [password, savePassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleLogin= async (e: React.FormEvent)=>{
        e.preventDefault();
        try {
            const response= await fetch('http://localhost:3000/user/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data=await response.json();
            if(data.success){
                alert(data.message);
                navigate('/menu');
                // Lưu thông tin user vào localStorage để duy trì đăng nhập
                localStorage.setItem('user', JSON.stringify(data.user));
                // Gọi callback chuyển trang hoặc đổi state ở App.js
            } else {
                alert(data.message);
            }
        }
        catch (error) {
            console.error('Lỗi kết nối server:', error);
            alert('Không thể kết nối đến server!');
        }
    };
    return(
         <div>
                <h2>Đăng Nhập</h2>
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
                <button className='btn-login' onClick={handleLogin}>Đăng Nhập</button>
            </div>
    )
}