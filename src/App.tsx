
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
import { ToastContainer } from 'react-toastify'
import AdminHomePage from './pages/admin/AdminHomePage'
import UserProtectedRouteProvider from './provider/UserProtectedRouteProvider'
import AdminProtectedRouteProvider from './provider/AdminProtectedRouteProvider'
import AdminEventsPage from './pages/admin/AdminEventsPage'
import CreateEventPage from './pages/admin/CreateEventPage'
import EditEventPage from './pages/admin/EditEventPage'
import AdminBookingsPage from './pages/admin/AdminBookingsPage'



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


        {/* user protected routes */}
        <Route element={<UserProtectedRouteProvider />}>
          <Route path='/event/:eventId' element={<EventPage />} />
          <Route path='/my-bookings' element={<MyBookingPage />} />
        </Route>

        {/* Admin protected routes */}
        <Route element={<AdminProtectedRouteProvider />} >
          <Route path='/admin' element={<AdminHomePage />} />
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="/admin/events/create" element={<CreateEventPage />} />
          <Route path="/admin/events/edit/:eventId" element={<EditEventPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        </Route>

      </ Routes>

      <ToastContainer />
    </div>
  )
}

export default App
