import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UseError } from "../common/ErrorDisplay";
import ApiService from '../../services/ApiService';

export default function MenuDetailsPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [cartSuccess, setCartSuccess] = useState(null);
    const { ErrorDisplay, showError } = UseError();

    const isAuthenticated = ApiService.isAuthenticated();

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await ApiService.getMenuById(id);
                if (response.statusCode === 200) {
                    setMenu(response.data)

                    const avgRating = await ApiService.getMenuAverageOverallReview(id);
                    if (avgRating.statusCode === 200) {
                        setAverageRating(avgRating.data)
                    } else {
                        showError(avgRating.message)
                    }
                } else {
                    showError(response.message)
                }
            } catch (error) {
                showError(error?.response?.data?.message || error.message)
            }
        }
        fetchMenu();
    }, [id])

    const handleNavigateBack = () => {
        navigate(`/menu`)
    }

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            showError("You need to log in to your account, if you don't have one do well to register")
            return;
        }
        setCartSuccess(false);

        try {
            const response = await ApiService.addItemToCart({
                menuId: menu.id,
                quantity: quantity
            });
            if (response.statusCode === 200) {
                setCartSuccess(true);
                setTimeout(() => setCartSuccess(false), 4000);
            }
        } catch (error) {
            showError(error?.response?.data?.message || error.message)
        }
    }

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const decrementQuantity = () => {
        setQuantity(prev => prev - 1)
    }


    if (!menu) {

        return (
            <div className="menu-details-not-found">
                <p className="menu-item-description">
                    Menu item not found
                </p>
                <button className="back-button" onClick={handleNavigateBack}>Back to Menu</button>

            </div>

        )
    }

    return (
        <div className="menu-details-container">
            {ErrorDisplay}
            <button className="back-button" onClick={handleNavigateBack}>
                &larr; Back to Menu
            </button>

            <div className="menu-item-header">
                <div className="menu-item-image-container">
                    <img src={menu.imageUrl} alt={menu.name} className="menu-item-image-detail" />
                </div>

                <div className="menu-item-info">
                    <h1 className="menu-item-name">{menu.name}</h1>
                    <p className="menu-item-description">{menu.description}</p>

                    <div className="menu-item-price-rating">
                        <span className="price">{menu.price.toFixed(2)}</span>
                        <div className="rating">
                            <span className="rating-value">{averageRating.toFixed(1)}</span>
                            <span className="rating-star">★</span>
                            <span className="rating-count">{menu.reviews?.length || 0} reviews</span>
                        </div>
                    </div>

                    <div className="add-to-cart-section">
                        <div className="quantity-selector">
                            <button className="quantity-btn" disabled={quantity <= 1} onClick={decrementQuantity}>-</button>
                            <span className="quantity">{quantity}</span>
                            <button className="quantity-btn" onClick={incrementQuantity}>+</button>
                        </div>

                        <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>

                        {cartSuccess && (
                            <div className="cart-success-message">
                                Added to cart successfully
                            </div>
                        )}

                    </div>

                </div>

            </div>

            <div className="reviews-section">

                <h1 className="reviews-title"> Customer reviews</h1>
                {menu.reviews && menu.reviews?.length > 0 ? (
                    <div className="reviews-list">
                        {menu.reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <span className="review-user">{review.userName}</span>
                                    <span className="review-date">
                                        {new Date(review?.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className="review-rating">
                                        {'★'.repeat(review.rating) + '☆'.repeat(10 - review.rating)
                                        }
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (

                    <p className="no-reviews">No reviews yet for this food item</p>

                )}
            </div>
        </div>
    )
}