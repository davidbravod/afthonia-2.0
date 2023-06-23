import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"

export const SignupRegAgent = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(true);
    const [individualCheck, setIndividualCheck] = useState("individual");
    const [registeredAgentForm, setRegisteredAgentForm] = useState(store.signupForm.registered_agent)

    const handleInputChange = e => {
        const { name, value } = e.target;

        setRegisteredAgentForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleClick = () => {
        actions.updateRegisteredAgentInfo(registeredAgentForm);
        navigate("/signup-ein");
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const handleIndividualCheck = (event) => {
        setIndividualCheck(event.target.value);
    };

    useEffect(() => {
        setRegisteredAgentForm(store.signupForm.registered_agent);
    }, [store.signupForm.registered_agent]);

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
                                <Link to="/signup-owners">Previous Step</Link>
                                <h3 className="text-center">Sign Up to Afthonia</h3>

                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">Registered Agent Information</span>
                                    <div className="line"></div>
                                </div>
                                <form className="mt-4">

                                    <div className="card-body">
                                        <div className="mb-3 d-flex">
                                            <input type="checkbox" id="remember" checked={isChecked} onChange={handleCheckboxChange} />
                                            <label htmlFor="remember" className="cursor">
                                                Keep Your Privacy! Let us be your Registered Agent. It is included in all plans.
                                            </label>
                                        </div>
                                        {!isChecked && (
                                            <div className="mb-3">
                                                <div className="d-flex mb-3">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault1"
                                                            value="individual"
                                                            checked={individualCheck === "individual"}
                                                            onChange={handleIndividualCheck}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Individual
                                                        </label>
                                                    </div>
                                                    <div className="form-check ms-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="flexRadioDefault"
                                                            id="flexRadioDefault2"
                                                            value="company"
                                                            checked={individualCheck === "company"}
                                                            onChange={handleIndividualCheck}
                                                        />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            Company
                                                        </label>
                                                    </div>
                                                </div>
                                                {individualCheck === "individual" ? (
                                                    <div className="d-flex row">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="name" className="large mb-2">First Name</label>
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                id="name"
                                                                placeholder="First Name"
                                                                className="form-control mb-3 border-0 py-2"
                                                                value={registeredAgentForm.first_name}
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
                                                                value={registeredAgentForm.last_name}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex row">
                                                        <div className="col">
                                                            <label htmlFor="company-name" className="large mb-2">Company Name</label>
                                                            <input
                                                                type="text"
                                                                name="company_name"
                                                                id="name"
                                                                placeholder="Company Name"
                                                                className="form-control mb-3 border-0 py-2"
                                                                value={registeredAgentForm.company_name}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <label htmlFor="inputAddress" className="large mb-2">Email</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3 border-0 py-2"
                                                            name="email"
                                                            id="inputEmail"
                                                            placeholder="example@email.com"
                                                            value={registeredAgentForm.email}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label htmlFor="inputAddress2" className="large mb-2">Phone</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3 border-0 py-2"
                                                            name="phone"
                                                            id="inputPhone"
                                                            placeholder="123 456 7890"
                                                            value={registeredAgentForm.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label htmlFor="inputAddress" className="large mb-2">Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3 border-0 py-2"
                                                            name="address"
                                                            id="inputAddress"
                                                            placeholder="1234 Main St"
                                                            value={registeredAgentForm.address}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label htmlFor="inputAddress2" className="large mb-2">Address 2</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3 border-0 py-2"
                                                            name="address_2"
                                                            id="inputAddress2"
                                                            placeholder="Apartment, studio, or floor"
                                                            value={registeredAgentForm.address_2}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <label htmlFor="inputCity" className="large mb-2">City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3 border-0 py-2"
                                                            name="city"
                                                            id="inputCity"
                                                            value={registeredAgentForm.city}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div className="col-lg-4">
                                                        <label htmlFor="inputState" className="large mb-2">State</label>
                                                        <select
                                                            name="state"
                                                            id="inputState"
                                                            className="form-select mb-3 py-2"
                                                            value={registeredAgentForm.state}
                                                            onChange={handleInputChange}
                                                            disabled
                                                        >
                                                            <option>{registeredAgentForm.state}</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-2">
                                                        <label htmlFor="inputZip" className="large mb-2">Zip</label>
                                                        <input
                                                            type="text"
                                                            className="form-control mb-3 border-0 py-2"
                                                            name="zip"
                                                            id="inputZip"
                                                            value={registeredAgentForm.zip}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex flex-wrap flex-column mt-2">
                                        <button type="button" className="primary-btn w-75 mx-auto mb-3" onClick={handleClick}>
                                            Next Step
                                        </button>
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

export default SignupRegAgent;