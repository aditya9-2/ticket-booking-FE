import { useNavigate } from "react-router-dom"
import CustomInput from "../../components/CustomInput"

export const SignupPage = () => {
  const navigate = useNavigate();
  
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

        <div className="space-y-4">
          <CustomInput
            label="Full Name"
            type="text"
            placeholder="John Doe"
          />

          <CustomInput
            label="Email Address"
            type="email"
            placeholder="name@company.com"
          />

          <CustomInput
            label="Password"
            type="password"
            placeholder="••••••••"
          />

          <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors mt-2">
            Create Account
          </button>
          <p className="text-gray-500">already have an account? <span className="text-black font-bold cursor-pointer" onClick={() => navigate('/signin')}>signin</span> here</p>
        </div>
      </div>
    </div>
  )
}