import React, {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', credentials);
            alert(response.data);
            navigate("/")
            // You can also redirect or perform other actions upon successful login
        } catch (error) {
            console.error('Login failed', error);
            // Handle login failure (show error message, etc.)
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h2 className="text-center mb-4">Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn w-100" style={{backgroundColor:"#B42B4D"}}>Login</button >
                </form>
            </div>
        </div>
    );
}

export default Login;
