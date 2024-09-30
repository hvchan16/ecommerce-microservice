import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTokenPayload, TokenPayload } from '../utils/jwt';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    const payload: TokenPayload | null = token ? getTokenPayload(token) : null;

    const handleLogout = () => {
        navigate('/logout');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        E-commerce App
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {payload?.role === 'user' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">
                                        Orders
                                    </Link>
                                </li>
                            )}
                            {payload?.role === 'client' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">
                                        Manage Products
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            {payload ? (
                                <>
                                    <li className="nav-item">
                                        <span className="navbar-text me-3">
                                            Logged in as: {payload.email} ({payload.role})
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-outline-light" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">
                                            Signup
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
