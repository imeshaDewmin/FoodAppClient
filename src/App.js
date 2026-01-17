import Navbar from "../src/components/common/Navbar"
import Footer from "../src/components/common/Footer"
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerRoute } from './services/GuardService';
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/LoginPage";
import HomePage from "./components/home_menu/HomePage";
import CategoryPage from "./components/home_menu/CategoryPage";
import MenuPage from "./components/home_menu/MenuPage";
import MenuDetailsPage from "./components/home_menu/MenuDetailsPage";
import ProfilePage from "./components/profile_cart/ProfilePage";
import UpdateProfilePage from "./components/profile_cart/UpdateProfilePage";
import OrderHistory from "./components/profile_cart/OrderHistory";
import LeaveReviewPage from "./components/profile_cart/LeaveReview";

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

          <Route path='/profile' element={<CustomerRoute element={<ProfilePage />} />} />
          <Route path='/profile/update' element={<CustomerRoute element={<UpdateProfilePage />} />} />
          <Route path='/my-orders' element={<CustomerRoute element={<OrderHistory />} />} />
          <Route path='/leave-review' element={<CustomerRoute element={<LeaveReviewPage />} />} />

          <Route path='*' element={<Navigate to={'/home'} />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
