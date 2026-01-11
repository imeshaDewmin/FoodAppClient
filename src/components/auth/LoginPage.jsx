import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UseError } from '../common/ErrorDisplay'
import { useState } from 'react';
import ApiService from '../../services/ApiService';

export default function LoginPage() {

  const { ErrorDisplay, showError } = UseError();
  const navigate = useNavigate();
  const {state} = useLocation();
  const redirectPath = state?.from?.pathname || '/home'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (

      !formData.email ||
      !formData.password

    ) {
      showError("Email and password are required");
      return;
    }

    const loginData = {

      email: formData.email,
      password: formData.password
    }


    try {

      const response = await ApiService.LoginUser(loginData);

      if (response.statusCode === 200) {
        ApiService.saveToken(response.data.token)
        ApiService.saveRole(response.data.roles)
        navigate(redirectPath, {replace:true})
      } else {
        showError(response.message)
      }

    } catch (error) {
      showError(error.response?.data?.message || error.message)
    }

  }
  return (
    <div className='register-page-food'>
      <div className='login-card-food'>
        <div className='login-header-food'>
          <h2 className='login-title-food'>Login</h2>
          <p className='login-description-food'>Login to your account to order delicious food</p>
        </div>
        <div className='login-content-food'>
          <form className='login-form-food' onSubmit={handleSubmit}>

            <div className='login-form-group'>
              <label htmlFor='email' className='login-label-food'>Email</label>
              <input
                className='login-input-food'
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Enter your email here'
              />
            </div>


            <div className='login-form-group'>
              <label htmlFor='password' className='login-label-food'>Password</label>
              <input
                className='login-input-food'
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                placeholder='Enter your password'
              />
            </div>

            {ErrorDisplay}

            <div>
              <button type='submit' className='login-button-food'>Login</button>
            </div>

            <div className='already'>
              <Link to='/register' className='register-link-food'>Don't have an account? Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}