import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"

export const SignupEin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [individualCheck, setIndividualCheck] = useState("ssn");
    const [einForm, setEinForm] = useState(store.signupForm.ein);
    const [loading, setLoading] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setEinForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleClick = async () => {
        setLoading(true);
        await actions.updateEinInfo(einForm);

        let response = await actions.signup()
        setLoading(false);
        if (response.ok) {
            navigate("/signup-plan")
        }

    };
    const handleCheckboxChange = (event) => {
        let checkedOwnApply = event.target.checked
        setIsChecked(checkedOwnApply);
        setEinForm(prevState => ({
            ...prevState,
            own_application: checkedOwnApply,
            first_name: "",
            last_name: "",
            tax_type: "",
            tax_number: ""
        }));
    };
    const handleCheckboxChange2 = (event) => {
        let checkedForeign = event.target.checked
        setIsChecked2(checkedForeign);
        setEinForm(prevState => ({
            ...prevState,
            foreign: checkedForeign,
            tax_type: "ssn",
            tax_number: ""
        }));
    };
    const handleIndividualCheck = (event) => {
        let checkValue = event.target.value
        setIndividualCheck(checkValue);
        setEinForm(prevState => ({
            ...prevState,
            tax_type: checkValue,
        }));
    };

    useEffect(() => {
        setEinForm(store.signupForm.ein);
    }, [store.signupForm.ein]);

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
                                <Link to="/signup-agent">Previous Step</Link>
                                <h3 className="text-center">Sign Up to Afthonia</h3>

                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">EIN / Tax Identification Number</span>
                                    <div className="line"></div>
                                </div>
                                <form className="mt-4">
                                    {!isChecked && (
                                        <div className="d-flex row">
                                            <div className="col-lg-6">
                                                <label htmlFor="name" className="large mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    id="name"
                                                    placeholder="First Name"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={einForm.first_name}
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
                                                    value={einForm.last_name}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {!isChecked && !isChecked2 && (
                                        <div className="d-flex row">
                                            <div className="d-flex ms-2 mb-1">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault1"
                                                        value="ssn"
                                                        checked={individualCheck === "ssn"}
                                                        onChange={handleIndividualCheck}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        SSN
                                                    </label>
                                                </div>
                                                <div className="form-check ms-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        id="flexRadioDefault2"
                                                        value="itin"
                                                        checked={individualCheck === "itin"}
                                                        onChange={handleIndividualCheck}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                        ITIN
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <input
                                                    type="text"
                                                    name="tax_number"
                                                    id="tax-number"
                                                    placeholder="000-00-0000"
                                                    className="form-control mb-3 border-0 py-2"
                                                    value={einForm.tax_number}
                                                    onChange={handleInputChange}
                                                />
                                            </div>

                                        </div>
                                    )}
                                    {!isChecked && (
                                        <div className="mb-3 d-flex">
                                            <input
                                                type="checkbox"
                                                id="isChecked2"
                                                checked={isChecked2}
                                                onChange={handleCheckboxChange2}
                                            />
                                            <label htmlFor="isChecked2" className="cursor">
                                                I am a foreign individual and do not have SSN or ITIN
                                            </label>
                                        </div>
                                    )}
                                    <div className="mb-3 d-flex">
                                        <input
                                            type="checkbox"
                                            id="isChecked"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="isChecked" className="cursor">
                                            I prefer to apply and obtain the EIN on my own.
                                        </label>
                                    </div>
                                    <div className="d-flex flex-wrap flex-column mt-2">
                                        <button type="button" className="primary-btn w-75 mx-auto mb-3" onClick={handleClick}>
                                            {loading ? (
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            ) : (
                                                'Next Step'
                                            )}
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

export default SignupEin;