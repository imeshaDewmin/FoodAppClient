import Navbar from "../src/components/common/Navbar"
import Footer from "../src/components/common/Footer"
import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>

        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
