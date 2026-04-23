import axios from 'axios';

const API = 'http://localhost:5000/api/students';

export default function StudentList({ students, onEdit, onDelete }) {
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    await axios.delete(`${API}/${id}`);
    onDelete();
  };
  if (students.length === 0)
    return <p style={{ color: '#999' }}>No students found. Add one above!</p>;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ background: '#22c4ec', color: '#fff' }}>
          <th style={th}>#</th>
          <th style={th}>Name</th>
          <th style={th}>Email</th>
          <th style={th}>Age</th>
          <th style={th}>Course</th>
          <th style={th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, i) => (
          <tr key={s._id} style={{ background: i % 2 === 0 ? '#fff' : '#f5f5f5' }}>
            <td style={td}>{i + 1}</td>
            <td style={td}>{s.name}</td>
            <td style={td}>{s.email}</td>
            <td style={td}>{s.age}</td>
            <td style={td}>{s.course}</td>
            <td style={td}>
              <button onClick={() => onEdit(s)} style={{
                background: '#2196F3', color: '#fff', border: 'none',
                padding: '5px 12px', borderRadius: 4, cursor: 'pointer', marginRight: 6
              }}>Edit</button>
              <button onClick={() => handleDelete(s._id)} style={{
                background: '#e53935', color: '#fff', border: 'none',
                padding: '5px 12px', borderRadius: 4, cursor: 'pointer'
              }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
const th = { padding: '10px 14px', textAlign: 'left', fontWeight: 600 };
const td = { padding: '10px 14px', borderBottom: '1px solid #eee' };