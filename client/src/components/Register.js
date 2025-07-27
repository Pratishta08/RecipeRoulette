import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = ({onRegister}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                onRegister(data.user, data.token); // Assuming register also logs in and returns token
                navigate('/dashboard', {replace: true}); // Go to dashboard after successful registration
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error during registration');
        }
    };

    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label for="username" className="block text-sm/6 font-medium text-gray-900">Full name</label>
                <div className="mt-2">
                <input type="username" 
                name="username" 
                id="username" 
                autocomplete="username" 
                required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div>
                <label for="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                <div className="mt-2">
                <input type="email" 
                name="email" 
                id="email" 
                autocomplete="email" 
                required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label for="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                
                </div>
                <div className="mt-2">
                <input type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                <label for="confirmPassword" className="block text-sm/6 font-medium text-gray-900">Confirm Password</label>
                </div>
                <div className="mt-2">
                <input type="password" name="password" id="password" autocomplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                </div>
            </div>

            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
            </form>
            <div classNameName="text-center">
                        <p classNameName="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                classNameName="font-medium text-orange-600 hover:text-orange-500 transition duration-200"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>

        </div>
        </div>);}
export default Register;