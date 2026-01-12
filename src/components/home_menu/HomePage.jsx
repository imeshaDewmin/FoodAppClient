import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UseError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";

export default function HomePage() {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const { ErrorDisplay, showError } = UseError();

    useEffect(
        () => {
            const fetchCategories = async () => {
                try {
                    const response = await ApiService.getAllCategories();
                    if (response.statusCode === 200) {
                        setCategories(response.data);
                    } else {
                        showError(response.message);
                    }

                } catch (error) {
                    showError(error?.response?.message || error.message)
                }
            }
            fetchCategories();
        }, []
    )

    const handleCategoryClick = (categoryId) => {
        navigate(`/menu?category=${categoryId}`);
    }

    const handleMenuClick = () => {
        navigate(`/menu`);

    }

    return (
        <div className="home-page">
            {ErrorDisplay}

            <header className="home-hero-section">
                <div className="home-hero-content">
                    <h1 className="home-hero-title">
                        Discover Delicious Meals
                    </h1>
                    <p className="home-hero-subtitle">Order your favorite food online easily and quickly</p>

                    <button className="home-explore-button" onClick={handleMenuClick}>
                        Explore Menu

                    </button>
                </div>
            </header>

            <section className="home-featured-categories">
                <h2 className="home-section-title">
                    Featured Categories
                </h2>
                <div className="home-category-carousel">
                    {
                        categories.map((category) => (
                            <div key={category.id} className="home-category-card" onClick={() => handleCategoryClick(category.id)}>
                                <h3 className="home-category-name">{category.name}</h3>
                                <p className="home-category-description">{category.description}</p>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="home-call-to-action">
                <div className="home-cta-content">
                    <h2 className="home-cta-title">Ready to order?</h2>
                    <p >Browse our menu and place your order now!</p>
                    <p className="home-cta-text">Browse our menu and place your order now!</p>
                    <button className="home-order-now-button" onClick={handleMenuClick}>Order now</button>
                </div>

            </section>
        </div>
    )
}