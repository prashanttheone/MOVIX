import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('http://localhost:3001/login', { email, password });

            if (result.data === "success") {
                // Only navigate to /home if the login is successful
                navigate('/home');
            } else {
                // Display a toast notification for unsuccessful login
                toast.error("Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error(err);
            // Handle other errors here
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        LOGIN
                    </button>
                </form>
                <p className="mt-2 mb-0">Don't have an account?</p>
                <Link to="/register" className="btn btn-success w-100 rounded-0">
                    Signup
                </Link>
            </div>

            {/* Toast container to display notifications */}
            <ToastContainer />
        </div>
    );
}

export default Login;
