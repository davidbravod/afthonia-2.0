import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [userForm, setUserForm] = useState(store.signupForm.user)
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;

        setUserForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleClick = () => {
        if (userForm.password !== confirmPassword) {
            alert("Password does not match the confirm password!");
            return;
        }
        actions.updateUserInfo(userForm);
        navigate("/signup-business");
    };

    useEffect(() => {
        setUserForm(store.signupForm.user);
    }, [store.signupForm.user]);

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-lg-5 px-0 bg-login">
                        <div className="login-left pb-4">
                            <a href="#">
                                <img src={loginLogo} className="mt-4 ps-3 ms-4" alt="" style={{ "width": "300px", "height": "100px" }} />
                            </a>
                            <div className="d-flex justify-content-center">
                                <img
                                    className="img-fluid login-img p-2"
                                    src={login}
                                    alt=""
                                    style={{ "width": "380px", "height": "400px" }}
                                />
                            </div>
                            <div className="text-center pb-2">
                                <h4 className="fw-semibold text-white">Welcome to Afthonia</h4>
                                <span className="pg-large text-white"
                                >Form your company in less than 10 minutes!</span
                                >
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 px-0">
                        <div className="login-right">
                            <div className="login-form">
                                <h3 className="text-center">Sign Up to Afthonia</h3>

                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">Personal Information</span>
                                    <div className="line"></div>
                                </div>
                                {store?.signupForm?.user ? (
                                    <form className="mt-4">
                                        <div className="d-flex row">
                                            <div className="col-lg-6">
                                                <label htmlFor="name" className="large mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    id="name"
                                                    placeholder="First Name"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={userForm.first_name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="last-name" className="large mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    id="last-name"
                                                    placeholder="Last Name"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={userForm.last_name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex row">
                                            <div className="col-lg-6">
                                                <label htmlFor="email" className="large mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    placeholder="info@example.com"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={userForm.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="phone" className="large mb-2">Phone Number</label>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    placeholder="123 456 7890"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={userForm.phone}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex row">
                                            <div className="col-lg-6">
                                                <label htmlFor="txtPassword" className="large mb-2">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="txtPassword"
                                                    placeholder="Password"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={userForm.password}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="txtPassword2" className="large mb-2"
                                                >Confirm Password</label
                                                >
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="txtPassword2"
                                                    placeholder="Confirm Password"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={confirmPassword}
                                                    onChange={handleConfirmPasswordChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-wrap flex-column mt-2">
                                            <button type="button" className="primary-btn w-75 mx-auto mb-3" onClick={handleClick}>
                                                Next Step
                                            </button>
                                            <span className="text-center">
                                                Already have an account?
                                                <a href="/login" className="primary"> Login</a>
                                            </span>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;