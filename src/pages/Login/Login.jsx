import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนเส้นทาง

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '1234') { // ตรวจสอบข้อมูล
            navigate('/OrderCreate'); // ไปที่หน้า OrderCreate
        } else {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <div className="login-container">
            <h2>เข้าสู่ระบบ</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input 
                    type="text" 
                    placeholder="ชื่อผู้ใช้" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="รหัสผ่าน" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">ล็อกอิน</button>
            </form>
        </div>
    );
};

export default Login;
