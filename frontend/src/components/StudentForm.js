import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/students';

export default function StudentForm({ editStudent, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', age: '', course: '' });
  useEffect(() => {
    if (editStudent) setForm(editStudent);
    else setForm({ name: '', email: '', age: '', course: '' });
  }, [editStudent]);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editStudent) {
        await axios.put(`${API}/${editStudent._id}`, form);
      } else {
        await axios.post(API, form);
      }
      onSave();
      setForm({ name: '', email: '', age: '', course: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };
  const inputStyle = {
    padding: '8px 12px', 
    borderRadius: 6,
    border: '1px solid #ddd', 
    width: '100%',
    fontSize: 14, 
    marginBottom: 10
  };
  return (
    <div style={{ background: '#f9f9f9', 
               padding: 20, 
               borderRadius: 10, 
               marginBottom: 24 }}>
      <h3 style={{ marginTop: 0 }}>{editStudent ? 'Edit Student' : ' Add Student'}</h3>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} name="name"   placeholder="Full Name"   value={form.name}   onChange={handleChange} required />
        <input style={inputStyle} name="email"  placeholder="Email"        value={form.email}  onChange={handleChange} required />
        <input style={inputStyle} name="age"    placeholder="Age"          value={form.age}    onChange={handleChange} type="number" required />
        <input style={inputStyle} name="course" placeholder="Course"       value={form.course} onChange={handleChange} required />
        <button type="submit" style={{
          background: editStudent ? '#e7e1d4' : '#0fc4ce',
          color: '#fff', 
          border: 'none', 
          padding: '10px 24px',
          borderRadius: 6, 
          cursor: 'pointer', 
          fontWeight: 600
        }}>
          {editStudent ? 'Update Student' : 'Add Student'}
        </button>
        {editStudent && (
          <button type="button" onClick={() => onSave()} style={{
            marginLeft: 10, 
            background: '#aaa', 
            color: '#fff',
            border: 'none', 
            padding: '10px 16px',
            borderRadius: 6, 
            cursor: 'pointer'
          }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}