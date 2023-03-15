import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setData(users);
  }, []);

  const addData = (e) => {
    e.preventDefault();
    if (editIndex === null) {
      setData([...data, { name, email }]);
    } else {
      const newData = [...data];
      newData[editIndex] = { name, email };
      setData(newData);
      setEditIndex(null);
    }
    setName('');
    setEmail('');
  };

  const editData = (index) => {
    const user = data[index];
    setName(user.name);
    setEmail(user.email);
    setEditIndex(index);
  };

  const deleteData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data));
  }, [data]);

  return (
    <div className='container'>
      <h1 className='heading-text'>LocalStorage with React</h1>
      <form onSubmit={addData} className="create-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button className="submit-button" type="submit">{editIndex === null ? 'Add User' : 'Update User'}</button>
      </form>
      <table className='display-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="edit-button" onClick={() => editData(index)}>Edit</button>
                <button className="delete-button" onClick={() => deleteData(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

//In this example, we use React hooks like useState and useEffect to manage the state and lifecycle of our application. We also use localStorage to store and retrieve the data. The addData, editData, and deleteData functions handle the CRUD operations on the data. The useEffect hook is used to synchronize the data with localStorage. Finally, we use JSX to define our HTML and event handlers.
