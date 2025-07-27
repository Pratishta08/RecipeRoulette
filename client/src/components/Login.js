import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if(response.ok){
                onLogin(data.user, data.token);
                navigate('/dashboard', {replace: true});
            }else{
                setError(data.message || 'Login failed')
            }
        }catch(err){
            setError('Network Error')
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-500">Login</h2>
            {error && (
                <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-800 transition disabled:opacity-50"
                >
                Login
                </button>
            </form>
            
                {/* ... username and password inputs ... */}
                
            <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{' '}
                <button
                    onClick={() => navigate('/register')} // Use navigate for register
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Register here
                </button>
            </p>
        </div>
    );
// ... existing code ...
    };
export default Login;