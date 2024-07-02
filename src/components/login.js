import React, { useState } from 'react';
import "../styles/login.css";
import img from "../assets/pokemonstarters.png";
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLoginFormVisible(!isLoginFormVisible);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!isLoginFormVisible && newPassword.length < 8) {
            setPasswordError('*Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };  

    // For sign in
    const handleSignInSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
    
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'signin', uid: username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json();
        })
        .then(data => {
            // Save username to local storage
            localStorage.setItem('username', username);
            const { selectedRegion, selectedStarter } = data;
            if (selectedRegion && selectedStarter) {
                // Both region and starter exist, navigate to /Play
                localStorage.setItem('region', selectedRegion);
                localStorage.setItem('starter', selectedStarter);
                navigate('/Play');
            } else if (selectedRegion) {
                // Only region exists, navigate to /Starters
                localStorage.setItem('region', selectedRegion);
                navigate('/Starters');
            } else {
                // Neither exists, navigate to /Regions
                navigate('/Regions');
            }
        })
        .catch(error => {
            // Display error message based on server response
            error.json().then(data => {
                showBootstrapAlert(data.message, 'danger');
            });
        });
    };    

    // For sign up
    const handleSignUpSubmit = (event) => {
        if (passwordError !== '') {
            event.preventDefault(); // Prevent form submission if there are errors
            return; // Exit early if password is too short
        }
        event.preventDefault();
        const formData = new FormData(event.target);
        const uid = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'signup', uid: uid, email: email, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            // Check if the response indicates success or failure
            if (data === 'Successfully Signed Up') {
                // Display success message using Bootstrap alert
                showBootstrapAlert(data, 'success');
            } else {
                // Display error message for username already taken
                showBootstrapAlert(data, 'danger');
            }
        })
        .catch(error => {
            // Display error message for network or server error
            showBootstrapAlert('An error occurred. Please try again later.', 'danger');
        });
    };

    // Function to show Bootstrap alert
    const showBootstrapAlert = (message, type) => {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', `alert-${type}`, 'fixed-top', 'z-index-alert');
        alertDiv.role = 'alert';
        alertDiv.textContent = message;
    
        document.body.appendChild(alertDiv);
    
        setTimeout(() => {
            alertDiv.remove();
        }, 3000); // Remove alert after 3 seconds
    };

    return (
        <div>
        <Navbar/>
        <div className='loginpage'>
            <div className={`wrapper ${isLoginFormVisible ? '' : 'active'}`}>
                <img src={img} alt="Starter Pokemons"/>
                <div className={`form-wrapper ${isLoginFormVisible ? 'login' : 'register'}`}>
                    <form onSubmit={isLoginFormVisible ? handleSignInSubmit : handleSignUpSubmit}>
                        <h2>{isLoginFormVisible ? 'Login' : 'Sign Up'}</h2>
                        <div className="input-box">
                            <input type="text" name="username" placeholder="Username" required />
                        </div>
                        {!isLoginFormVisible && (
                            <div className="input-box">
                                <input type="email" name="email" placeholder="Email" required />
                            </div>
                        )}
                        <div className="input-box">
                            <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                            {passwordError && <span className="error">{passwordError}</span>}
                        </div>
                        <button type="submit">{isLoginFormVisible ? 'Continue' : 'Register'}</button>
                        <div className="sign-link">
                            <p>{isLoginFormVisible ? "Don't have an account? " : "Already have an account? "}
                                <button className="btn btn-link" onClick={toggleForm}>
                                    {isLoginFormVisible ? 'Sign Up' : 'Login'}
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;

