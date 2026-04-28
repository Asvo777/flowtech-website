import './App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Contact from './components/Contact'
import Home from './pages/Home'
import Appoinment from './pages/Appoinment'
import Submitted from './pages/Submitted'

function App() {

  return (
    <>
      {/* <Logo /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appoinment />} />
        <Route path="/submitted/:id" element={<Submitted />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
