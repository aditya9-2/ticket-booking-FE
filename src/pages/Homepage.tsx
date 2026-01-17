import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import CardSection from "../sections/CardSection"
import Landing from "../sections/Landing"
import SubLanding from "../sections/SubLanding"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <SubLanding />
      <CardSection/>
      <Footer/>
    </>
  )
}

export default HomePage
