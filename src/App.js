import Navbar from "../src/components/common/Navbar"
import Footer from "../src/components/common/Footer"
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home_menu/HomePage";
import CategoryPage from "./components/home_menu/CategoryPage";
import MenuPage from "./components/home_menu/MenuPage";
import MenuDetailsPage from "./components/home_menu/MenuDetailsPage";
import ProfilePage from "./components/profile_cart/ProfilePage";
import UpdateProfilePage from "./components/profile_cart/UpdateProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          
          <Route path='/home' element={<HomePage />} />
          <Route path='/categories' element={<CategoryPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/menu/:id' element={<MenuDetailsPage />} />

          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/update' element={<UpdateProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
