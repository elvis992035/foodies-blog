'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export function GetUser() {
    // GET get all user
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
          const res = await axios.get('http://127.0.0.1:5000/users');
          setUsers(res.data); // Set the response data to state
          console.log(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          setError('Failed to fetch users.');
        }
      };

      useEffect(() => {
        fetchUsers();
      }, []);

      return (
        <div style={{ padding: '2rem' }}>
          <h1>User List</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      );

}