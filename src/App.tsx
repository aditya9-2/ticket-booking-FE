
import './App.css'
import AboutPage from './pages/AboutPage'
import AllEventsPage from './pages/AllEventsPage'
import SigninPage from './pages/auth/SigninPage'
import { SignupPage } from './pages/auth/SignupPage'
import ContactPage from './pages/ContactPage'
import EventPage from './pages/EventPage'
import HomePage from './pages/Homepage'
import { Route, Routes } from "react-router"
import MyBookingPage from './pages/MyBookingPage'
function App() {


  return (
    <div className='min-h-screen'>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/events' element={<AllEventsPage />} />
        <Route path='/event/:eventId' element={<EventPage />} />
        <Route path='/my-bookings' element={<MyBookingPage />} />

      </ Routes>
    </div>
  )
}

export default App
