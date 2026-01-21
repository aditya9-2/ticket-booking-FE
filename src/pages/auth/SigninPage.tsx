import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SigninPage = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signin`, {
        email,
        password
      });
      const data = res.data;

      if (!data) {
        console.error(`Failed to fetch signin API`);
        setIsLoading(false);
        return;
      }

      const token = res.data.token;

      if (!token) {
        toast.error("Login failed: No token received", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          theme: 'light',
        });
        return;
      }

      localStorage.setItem("token", token);
      toast.success(`Login success`, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light'
      });
      
      navigate("/");

    } catch (error) {
      toast.error(`falied to signin ${error}`, {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
      })

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 h-screen flex justify-center items-center p-4">
      {/* 1. Define a fixed width for the form container */}
      <div className="w-full max-w-sm">

        {/* 2. Wrap headings to ensure they align to the start of the 'max-w-sm' area */}
        <div className="text-left mb-8">
          <h1 className="font-bold text-2xl text-black">BOOKTHESHOW.</h1>
        </div>

        <div className="text-left mb-6">
          <h2 className="font-bold text-2xl mb-1 text-gray-900">Welcome Back.</h2>
          <p className="font-light text-sm text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>

          <CustomInput
            label="Email Address"
            type="email"
            placeholder="name@company.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit" // Ensure button type is submit
            disabled={isLoading} // Prevent double-clicks
            className={`w-full bg-black text-white font-bold py-3 rounded-xl transition-colors mt-2 hover:cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
          >
            {isLoading ? "Signing in..." : "Signin here"}
          </button>
          <p className="text-gray-500">Don't have an account? <span className="text-black font-bold cursor-pointer" onClick={() => navigate('/signup')}>signup</span> here</p>
        </form>
      </div>
    </div>
  )
}

export default SigninPage