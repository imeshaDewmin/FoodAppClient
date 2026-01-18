import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const Navbar = () => {

    const isAuthenticated = ApiService.isAuthenticated();

    const isAdmin = ApiService.isAdmin();

    const isCustomer = ApiService.isCustomer();

    const isDelivery = ApiService.isDelivery();

    const navigate = useNavigate();

    const handleLogOut = () => {
        const isLogOut = window.confirm("Are you sure you want to log out?")

        if (isLogOut) {
            ApiService.logOut();
            navigate("/login");
        }
    }

    return (
        <nav>
            <div className="logo">
                <Link to='/' className="logo-link">
                    Food App
                </Link>
            </div>

            <div className="desktop-nav">
                <Link to="/home" className="nav-link">Home</Link>
                <Link to="/menu" className="nav-link">Menu</Link>
                <Link to="/categories" className="nav-link">Categories</Link>

                {isAuthenticated && (
                    <>
                        {isCustomer && (
                            <>
                                <Link to="/cart" className="nav-link">Cart</Link>
                                <Link to="/orders" className="nav-link">Orders</Link>
                            </>
                        )}

                        {isDelivery && (
                            <Link to="/deliveries" className="nav-link">Deliveries</Link>
                        )}

                        {isAdmin && (
                            <Link to="/admin" className="nav-link">Admin</Link>
                        )}

                        <Link to="/profile" className="nav-link">Profile</Link>
                        <button className="nav-button" onClick={handleLogOut}>Log Out</button>
                    </>
                )}

            </div>
        </nav>
    )
}

export default Navbar;