import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const token = response.data.token;

            localStorage.setItem('token', token);

            const decoded = parseJwt(token);
            if (!decoded) {
                setError('Failed to decode token');
                return;
            }

            const userRole = decoded.role;

            if (userRole === 'admin') {
                navigate('/admin-home');
            } else if (userRole === 'pantryStaff') {
                navigate('/pantry-home');
            } else if (userRole === 'deliveryStaff') {
                navigate('/delivery-home');
            } else {
                setError('Unknown role detected. Contact support.');
            }
        } catch (err) {
            console.error(err);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-md">
                    Login
                </button>
            </form>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-600 hover:text-blue-800">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
