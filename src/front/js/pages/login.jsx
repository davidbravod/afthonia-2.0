import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"

export const Login = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = async (e) => {
        e.preventDefault();
        let { responseJson, response } = await actions.login(emailOrUsername, password)
        if (response.ok) {
            navigate("/user/dashboard")
        } else {
            alert("Login Failed, try again")
        }
    };

    useEffect(() => {

    }, [emailOrUsername, password]);

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
                            <div className="text-center p-2">
                                <h4 className="fw-semibold text-white">Welcome to Afthonia</h4>
                                <span className="pg-large text-white"
                                >Start your journey now!</span
                                >
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 px-0">
                        <div className="login-right">
                            <div className="login-form">
                                <h3 className="text-center">Sign in to Afthonia</h3>
                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">Use your username or email</span>
                                    <div className="line"></div>
                                </div>
                                <form className="mt-4">
                                    <label htmlFor="email" className="large mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="info@example.com"
                                        className="form-control mb-3 border-0 py-2"
                                        value={emailOrUsername}
                                        onChange={(e) => setEmailOrUsername(e.target.value)}
                                    />
                                    <div className="inputgroup">
                                        <label htmlFor="txtPassword" className="large mb-2">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="txtPassword"
                                            placeholder="Password"
                                            className="form-control mb-3 border-0 py-2"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div
                                        className="d-flex flex-wrap justify-content-between gap-2 pt-2 pb-4"
                                    >
                                        <div>
                                            <input type="checkbox" id="remember" />
                                            <label htmlFor="remember" className="cursor">Remember Me</label>
                                        </div>
                                        <a href="#" className="primary">Forgot Password?</a>
                                    </div>
                                    <div className="d-flex flex-column mt-2">
                                        <button type="button" className="primary-btn w-75 mx-auto mb-3" onClick={handleClick}>Sign in</button>
                                        <span className="text-center">
                                            Don't have an account?
                                            <a href="/signup" className="primary"> Register</a>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;