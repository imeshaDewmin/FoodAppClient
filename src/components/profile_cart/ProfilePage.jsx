import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UseError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";

export default function ProfilePage() {

    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();
    const { ErrorDisplay, showError } = UseError();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await ApiService.myProfile();
                if (response.statusCode === 200) {
                    setUserProfile(response.data)
                } else {
                    showError(response.message)
                }
            } catch (error) {
                showError(error.response?.message || error.message)
            }
        }
        fetchProfile()
    }, [])

    const handleClickEdit = () => {
        navigate('/profile/update')
    }

    const handleClickMyOrders = () => {
        navigate('/my-orders')
    }

    if (userProfile) {
        return (

            <div className="profile-container">
                {ErrorDisplay}
                <h1>User Profile</h1>

                <div className="profile-card">
                    <div className="profile-card-header">
                        <div className="profile-card-title">
                            <div className="profile-avatar">
                                {userProfile.profileUrl ? (
                                    <img
                                        className="avatar-image"
                                        src={userProfile.profileUrl}
                                        alt={userProfile.name}
                                    />
                                ) : (
                                    <div className="avatar-fallback">
                                        {userProfile.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <span className="profile-name">{userProfile.name}</span>
                        </div>
                    </div>
                    <div className="profile-card-content">
                        <div className="profile-info">
                            <p>
                                <span className="profile-info-label">Email:</span>
                                <span>{userProfile.email}</span>
                            </p>
                            <p>
                                <span className="profile-info-label">Phone:</span>
                                <span>{userProfile.phoneNumber}</span>
                            </p>
                            <p>
                                <span className="profile-info-label">Address:</span>
                                <span>{userProfile.address}</span>
                            </p>
                            <p>
                                <span className="profile-info-label">Status:</span>
                                <span className={userProfile.isActive ? 'profile-status-active' : 'profile-status-inactive'}>
                                    {userProfile.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </p>
                        </div>
                        <div className="profile-actions">
                            <button onClick={handleClickEdit} className="profile-edit-button">Edit Profile</button>
                            <button onClick={handleClickMyOrders} className="profile-orders-button">View Orders</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}