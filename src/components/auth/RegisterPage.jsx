import { Link, useNavigate } from 'react-router-dom';
import { UseError } from '../common/ErrorDisplay'
import { useState } from 'react';
import ApiService from '../../services/ApiService';

export default function RegisterPage() {

    const { ErrorDisplay, showError } = UseError();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.address ||
            !formData.phoneNumber ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            showError("All the fields are required");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            showError("Passwords are not matching")
            return;
        }

        const registrationData = {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        }


        try {

            const response = await ApiService.registerUser(registrationData);

            if (response.statusCode === 200) {
                setFormData({
                    name: "",
                    email: "",
                    address: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: ""
                }
                );
                navigate('/login')
            } else {
                showError(response.message)
            }

        } catch (error) {
            showError(error.response?.data?.message || error.message)
        }

    }

    return (
        <div className='register-page-food'>
            <div className='register-card-food'>
                <div className='register-header-food'>
                    <h2 className='register-title-food'>Register</h2>
                    <p className='register-description-food'>Create an account to order delicious food</p>
                </div>
                <div className='register-content-food'>
                    <form className='register-form-food' onSubmit={handleSubmit}>

                        <div className='register-form-group'>
                            <label htmlFor='name' className='register-label-food'>Full Name</label>
                            <input
                                className='register-input-food'
                                type='text'
                                id='name'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder='Your Full Name'
                            />
                        </div>

                        <div className='register-form-group'>
                            <label htmlFor='email' className='register-label-food'>Email</label>
                            <input
                                className='register-input-food'
                                type='email'
                                id='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='Your Email'
                            />
                        </div>

                        <div className='register-form-group'>
                            <label htmlFor='phoneNumber' className='register-label-food'>Phone Number</label>
                            <input
                                className='register-input-food'
                                type='text'
                                id='phoneNumber'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                placeholder='Your Phone Number'
                            />
                        </div>

                        <div className='register-form-group'>
                            <label htmlFor='address' className='register-label-food'>Address</label>
                            <input
                                className='register-input-food'
                                type='text'
                                id='address'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                required
                                placeholder='Your Address'
                            />
                        </div>

                        <div className='register-form-group'>
                            <label htmlFor='password' className='register-label-food'>Password</label>
                            <input
                                className='register-input-food'
                                type='password'
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='Enter a password'
                            />
                        </div>

                        <div className='register-form-group'>
                            <label htmlFor='confirmPassword' className='register-label-food'>Confirm Password</label>
                            <input
                                className='register-input-food'
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder='Confirm Your Password'
                            />
                        </div>

                        {ErrorDisplay}

                        <div>
                            <button type='submit' className='register-button-food'>Register</button>
                        </div>

                        <div className='already'>
                            <Link to='/login' className='register-link-food'>Already have an account? Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}