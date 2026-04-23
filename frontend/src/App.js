import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const API = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents]     = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };
  useEffect(() => { fetchStudents(); }, []);
  return (
    <div style={{ maxWidth: 860, margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎓 Student Management</h1>
      <StudentForm
        editStudent={editStudent}
        onSave={() => { setEditStudent(null); fetchStudents(); }}
      />
      <h2 style={{ color: '#444' }}>All Students ({students.length})</h2>
      <StudentList
        students={students}
        onEdit={setEditStudent}
        onDelete={fetchStudents}
      />
    </div>
  );
}
export default App;