import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: (token: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', {
                email,
                password,
            });

            console.log(response)
            const token = response.data.token;
            onLogin(token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                <h2 className="mb-4 text-center">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </div>

                <p className="text-center">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
