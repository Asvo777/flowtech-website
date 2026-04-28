import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer' 
// import Logo from './components/Logo'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Home from './pages/Home'
import Details from './pages/Details'

function App() {

  return (
    <>
      {/* <Logo /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Details />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
