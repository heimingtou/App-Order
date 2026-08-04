import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate=useNavigate();
    const [userName, saveUserName]=useState('')
    const [email,saveEmail]=useState('')
    const RegisterUser= async ()=>{
        const userData:{usename:string, email:string}={
            username : userName,
            email : email
        }
        try{
            const reponse= await fetch('http://localhost:3000/user',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const result= await reponse.json();
            if(reponse.ok){
                alert('dang ky thanh cong');
                console.log("da tao user",result);
                navigate('/menu');
            }
            else {
                alert(`Lỗi: ${result.message || "Không thể tạo hóa đơn"}`);
            }
        }
        catch(error){
            console.error("Lỗi kết nối tới server:", error);
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Lỗi kết nối tới server!");
            }
        }
    }
    return (
        <div>
            <h2>Thông tin khách hàng</h2>
            <div className="field-contain">
                <div className="username">
                    <label htmlFor="username">User Name:</label>
                    <input type="text" id="username" placeholder="Nhap username" onChange={(e)=>saveUserName(e.target.value)}
                    value={userName}></input>
                </div>
                <div className="username">
                    <label>Email:</label>
                    <input type="email" id="email" placeholder="Nhap email" onChange={(e)=>saveEmail(e.target.value)}
                    value={email}></input>
                </div>
            </div>
            <button className="btn-login" onClick={RegisterUser}>Xác Nhận</button>
        </div>
    );
}