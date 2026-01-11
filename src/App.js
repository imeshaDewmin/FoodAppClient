import Navbar from "../src/components/common/Navbar"
import Footer from "../src/components/common/Footer"
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
