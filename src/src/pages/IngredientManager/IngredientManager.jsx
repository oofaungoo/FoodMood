import React, { useState } from 'react';
import './IngredientManager.css';

const IngredientManager = () => {
  const [materials, setMaterials] = useState([
    { name: 'น้ำตาล', quantity: 63, unit: 'กิโลกรัม' },
    { name: 'แป้ง', quantity: 100, unit: 'กิโลกรัม' }
]);
const [newMaterial, setNewMaterial] = useState({ name: '', quantity: 0, unit: '' });
const [showHistory, setShowHistory] = useState(false); // State สำหรับแสดงประวัติ
const [history, setHistory] = useState([]); // State สำหรับเก็บประวัติการเพิ่มวัตถุดิบ

const handleAddMaterial = () => {
    if (newMaterial.name && newMaterial.unit) {
        const newMaterials = { ...newMaterial, quantity: parseInt(newMaterial.quantity) };
        setMaterials([...materials, newMaterials]);
        setHistory([...history, `เพิ่ม ${newMaterials.name} จำนวน ${newMaterials.quantity} ${newMaterials.unit}`]); // เก็บประวัติการเพิ่มวัตถุดิบ
        setNewMaterial({ name: '', quantity: 0, unit: '' });
    }
};

const handleIncrease = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index].quantity += 1;
    setMaterials(updatedMaterials);
};

const handleDecrease = (index) => {
    const updatedMaterials = [...materials];
    if (updatedMaterials[index].quantity > 0) {
        updatedMaterials[index].quantity -= 1;
        setMaterials(updatedMaterials);
    }
};

const toggleHistory = () => {
    setShowHistory(!showHistory); // สลับการแสดงผลของประวัติ
};

return (
    <div className="material-management-container">
        <h2>จัดการวัตถุดิบ</h2>
        
        {/* ส่วนเพิ่มวัตถุดิบใหม่ */}
        <div className="material-add-section">
            <input
                type="text"
                placeholder="ชื่อวัตถุดิบ"
                className="input-field"
                value={newMaterial.name}
                onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            />
            <input
                type="number"
                placeholder="0"
                className="input-field"
                value={newMaterial.quantity}
                onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
            />
            <input
                type="text"
                placeholder="หน่วย (เช่น กรัม, กิโลกรัม)"
                className="input-field"
                value={newMaterial.unit}
                onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
            />
            <button className="add-button" onClick={handleAddMaterial}>เพิ่มวัตถุดิบ</button>
        </div>

        {/* รายการวัตถุดิบ */}
        <div className="material-list-container">
            <h3>รายการวัตถุดิบ</h3>
            {materials.map((material, index) => (
                <div key={index} className="material-item">
                    <span>{material.name}</span>
                    <span>{material.quantity}</span>
                    <span className="material-unit">{material.unit}</span>
                    <button className="adjust-button" onClick={() => handleIncrease(index)}>+</button>
                    <button className="adjust-button" onClick={() => handleDecrease(index)}>-</button>
                </div>
            ))}
            <button className="history-button" onClick={toggleHistory}>
                {showHistory ? 'ซ่อนประวัติ' : 'ดูประวัติการเพิ่มวัตถุดิบ'}
            </button>
            
            {/* แสดงประวัติการจัดการวัตถุดิบ */}
            {showHistory && (
                <div className="history-container">
                    <h4>ประวัติการเพิ่มวัตถุดิบ</h4>
                    <ul>
                        {history.map((entry, index) => (
                            <li key={index}>{entry}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);
};
export default IngredientManager;
