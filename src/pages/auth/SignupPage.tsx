import { useNavigate } from "react-router-dom"
import CustomInput from "../../components/CustomInput"
import { useState } from "react";
import axios from "axios";

export const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegistration = async (e: React.FormEvent) => {

    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
        name,
        email,
        password
      });

      if (res.status === 201 || res.status === 200) {
        alert(`Registration success, Please sign in`);
        navigate('/signin');
      }

    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      alert(`Signup failed: ${message}`);
      console.error("Signup error:", error instanceof Error ? error.message : undefined);

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
          <h2 className="font-bold text-2xl mb-1 text-gray-900">Create an account</h2>
          <p className="font-light text-sm text-gray-400">
            Enter your details to get started
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegistration}>
          <CustomInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />

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
            className={`w-full bg-black text-white font-bold py-3 rounded-xl transition-colors mt-2 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
              }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
          <p className="text-gray-500">already have an account? <span className="text-black font-bold cursor-pointer" onClick={() => navigate('/signin')}>signin</span> here</p>
        </form>
      </div>
    </div>
  )
}