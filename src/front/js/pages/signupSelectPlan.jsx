import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"

export const SignupSelectPlan = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [pricing, setPricing] = useState(store.pricing)
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleSelectedPlan = (priceId) => {
        actions.updateCheckout2(priceId);
        setSelectedPlan(priceId);
    }

    const handleClick = async () => {
        setLoading(true);
        let error = await actions.handlePayment()
        setLoading(false);
        if (error) {
            navigate("/user/cancelpayment")
        }
    };

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row">
                    <div className="col-lg-5 px-0 bg-login">
                        <div className="login-left pb-4">
                            <Link to="#">
                                <img src={loginLogo} className="mt-4 ps-3 ms-4" alt="" style={{ "width": "300px", "height": "100px" }} />
                            </Link>
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
                                <Link to="/signup-ein">Previous Step</Link>
                                <h3 className="text-center">Sign Up to Afthonia</h3>

                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">Select Your Plan</span>
                                    <div className="line"></div>
                                </div>
                                <div className="mt-4">
                                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                                        {pricing.map((item, index) => (
                                            <div className="col" key={index}>
                                                <div className="card mb-4 rounded-3 shadow-sm">
                                                    <div className="card-header py-3">
                                                        <h4 className="my-0 fw-normal">{item.title}</h4>
                                                    </div>
                                                    <div className="card-body">
                                                        <h1 className="card-title pricing-card-title">${item.price}<small className="text-muted fw-light">/yr</small></h1>
                                                        <ul className="list-unstyled mt-3 mb-4">
                                                            {item.features.map((feature, index) => (
                                                                <li key={index}>{feature}</li>
                                                            ))}
                                                        </ul>

                                                        <button type="button" className={`w-100 btn btn-lg btn-outline-primary ${selectedPlan === item.price_id ? "active" : ""}`} onClick={() => handleSelectedPlan(item.price_id)}>Select Plan</button>
                                                        {selectedPlan === item.price_id &&
                                                            <>
                                                                <button type="button" className="w-100 btn btn-lg btn-outline-primary mt-3" onClick={handleClick}>
                                                                    {loading ? (
                                                                        <div className="spinner-border" role="status">
                                                                            <span className="visually-hidden">Loading...</span>
                                                                        </div>
                                                                    ) : (
                                                                        'Proceed to Pay'
                                                                    )}
                                                                </button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupSelectPlan;