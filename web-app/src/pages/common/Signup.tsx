import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface SignupProps {
    onSignup: (token: string) => void;
}

const Signup = ({ onSignup }: SignupProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'client' | 'user'>('user'); // Set default role as 'user'
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:4000/auth/register',
                {
                    email,
                    password,
                    role, // Pass the selected role to backend
                }
            );

            const token = response.data.token;
            if (token) {
                onSignup(token);
                navigate('/products'); // Navigate to product list page after signup
            } else {
                navigate('/login'); // Navigate to login if token not returned
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                <h2 className="mb-4 text-center">Signup</h2>
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
                        minLength={6}
                        autoComplete="new-password"
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        autoComplete="new-password"
                    />
                </div>

                {/* Role Selection */}
                <div className="form-group mb-3">
                    <label htmlFor="role">Select Role:</label>
                    <select
                        id="role"
                        className="form-control"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'client' | 'user')}
                    >
                        <option value="user">User</option>
                        <option value="client">Client</option>
                    </select>
                </div>

                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                </div>

                <p className="text-center">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
