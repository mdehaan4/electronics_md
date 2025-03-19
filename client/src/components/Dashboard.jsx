import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user session on mount
  useEffect(() => {
    fetch('https://ed3f-82-17-235-177.ngrok-free.app/auth/me', { // ✅ Correct endpoint for checking session
      credentials: 'include', // ✅ Send cookies for session
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        setUser(data.user); // ✅ Store the user data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  ;

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Unauthorized. Please <a href="/">Login</a>.</p>;

  return (
    <div>
      <h1>Welcome, {user.email || user.name}!</h1>
      <p>This is your dashboard. You are logged in.</p>
      <button onClick={() => window.location.href = 'http://localhost:5173'}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
