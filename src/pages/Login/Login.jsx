import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { HiKey, HiUser } from "react-icons/hi";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [isAdminMode, setIsAdminMode] = useState(true); // Toggle between admin and normal user modes
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (isAdminMode) {
            if (username === 'admin' && password === '1234') {
                navigate('/OrderCreate');
            } else {
                setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            }
        } else {
            if (pin === '123456') {
                navigate('/OrderCreate');
            } else {
                setError('PIN ไม่ถูกต้อง');
            }
        }
    };

    return (
        <div className="login-container">
            <div className=''>เข้าสู่ระบบ</div>
            <div className="toggle-mode">
                <div onClick={() => setIsAdminMode(true)}>
                    <HiKey /> ผู้ดูแลระบบ 
                </div>
                <div onClick={() => setIsAdminMode(false)}  >
                    พนักงาน <HiUser />
                </div>
            </div>
            <form onSubmit={handleLogin} className="login-form">
                {isAdminMode ? (
                    <>
                        <input
                            type="text"
                            placeholder="Username"
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
                    </>
                ) : (
                    <input
                        type="password"
                        placeholder="กรุณากรอก PIN 6 หลัก"
                        maxLength="6"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                )}
                {error && <div className="error-message">{error}</div>}
                <div className='blue-button' onClick={handleLogin}>ล็อกอิน</div>
            </form>
        </div>
    );
};

export default Login;
