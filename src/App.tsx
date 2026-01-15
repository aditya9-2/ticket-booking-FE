
import './App.css'
import Navbar from './components/Navbar'
import SigninPage from './pages/auth/SigninPage'
import { SignupPage } from './pages/auth/SignupPage'
import HomePage from './pages/Homepage'
import { Route, Routes } from "react-router"
function App() {


  return (
    <div className='min-h-screen'>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
      </ Routes>
    </div>
  )
}

export default App
