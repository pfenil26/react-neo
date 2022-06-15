// ef85gqVoyEVuuIgsl1DgBPmfwLVWKiTB8F5wuoV9
import { Navbar } from './Components/Navbar';
import { APOD } from './pages/APOD';
import { NEO } from './pages/NEO';
import { Routes, Route } from "react-router-dom";
import { Footer } from './Components/Footer';



function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<APOD />} />
      <Route path="neo" element={<NEO />} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;


