import React, { useEffect, useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // ✅ Check if user is authenticated when component mounts
  useEffect(() => {
    fetch('http://localhost:4000/auth/me', {
      credentials: 'include', // ✅ Important to send session cookies
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then((data) => {
        console.log('✅ Logged-in user:', data);
        setUser(data.user);
      })
      .catch((err) => {
        console.log('❌ Not logged in:', err.message);
      });

    // ✅ Check cookies (Note: won't show HttpOnly cookies)
    console.log('Cookies:', document.cookie);
  }, []);

  // ✅ Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Include cookies for session
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      console.log('✅ Login successful:', data);

      // Optionally, re-fetch /auth/me or set user directly
      setUser(data);

    } catch (error) {
      console.error('❌ Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // ✅ If user is logged in
  if (user) {
    return (
      <div>
        <h2>Welcome, {user.email}</h2>
        <button onClick={() => window.location.href = 'http://localhost:4000/auth/logout'}>Logout</button>
      </div>
    );
  }

  // ✅ Login form UI
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => window.location.href = 'http://localhost:4000/auth/google'}>
          Login with Google
        </button>
        <button onClick={() => window.location.href = 'http://localhost:4000/auth/facebook'}>
          Login with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
