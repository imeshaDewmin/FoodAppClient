import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { UseError } from "../common/ErrorDisplay";
import ApiService from "../../services/ApiService";

export default function UpdateProfilePage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const { ErrorDisplay, showError } = UseError();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.myProfile();
                if (response.statusCode === 200) {
                    const userData = response.data;
                    setName(userData.name);
                    setAddress(userData.address);
                    setEmail(userData.email);
                    setPhoneNo(userData.phoneNumber);
                    setPreviewImage(userData.profileUrl)
                } else {
                    showError(response.message);
                }
            } catch (error) {
                showError(error.response.data?.message || error.message)
            }
        }
        fetchUserProfile();
    }, [])


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    //Programmatically triggers a click on the hidden file input

    const triggerInputFile = () => {
        fileInputRef.current.click()
    }

    const handleUpdateProfile = async (e) => {

        e.preventDefault()

        if (!window.confirm("Are you sure you want to update your profile?"))
            return;

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phoneNo', phoneNo);
            formData.append('address', address);

            if (profileImage) {
                formData.append('imageFile', profileImage)
            }

            const response = await ApiService.updateProfile(formData);
            if (response.statusCode === 200) {
                navigate('/profile')
            } else {
                showError(response.message)
            }

        } catch (error) {
            showError(error.response.data?.message || error.message)
        }
    }


    const handleDeactivateAccount = async () => {
        if (!window.confirm("Are you sure you want to close your profile? This can't be undone"))
            return;

        try {
            const response = await ApiService.deactivateAccount();
            if (response.statusCode === 200) {
                ApiService.logOut();
                navigate('/home')
            } else {
                showError(response.message)
            }
        } catch (error) {
            showError(error.response.data?.message || error.message)
        }
    }



    return (
        <div className="profile-container">
            {ErrorDisplay}

            <div className="profile-header">
                <h1 className="profile-title">Update Profile</h1>
                <div>
                    <img src={previewImage} alt="profile"
                        onClick={triggerInputFile}
                        className="profile-image"
                    />

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <button className="profile-image-upload" onClick={triggerInputFile}>Change profile Image</button>
                </div>
            </div>

            <form className="profile-form" onSubmit={handleUpdateProfile}>

                <div className="form-grid">
                    <div className="profile-form-group">
                        <label htmlFor="name" className="profile-form-label">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="email" className="profile-form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="phoneNo" className="profile-form-label">Phone:</label>
                        <input
                            type="tel"
                            id="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                    <div className="profile-form-group">
                        <label htmlFor="address" className="profile-form-label">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="profile-form-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Update Profile
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeactivateAccount}
                    >
                        Deactivate Account
                    </button>
                </div>

            </form>

        </div>
    )
}