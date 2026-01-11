import Navbar from "../src/components/common/Navbar"
import Footer from "../src/components/common/Footer"
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from "./components/auth/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/register' element={<RegisterPage/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
