import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user session on mount
  useEffect(() => {
    fetch('http://localhost:4000/auth/me', {
      credentials: 'include', // ✅ IMPORTANT: Include cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Unauthorized. Please <a href="/">Login</a>.</p>;

  return (
    <div>
      <h1>Welcome, {user.email || user.name}!</h1>
      <p>This is your dashboard. You are logged in.</p>
      <button onClick={() => window.location.href = 'http://localhost:4000/auth/logout'}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
