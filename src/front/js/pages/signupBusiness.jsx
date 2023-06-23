import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"
import NamesGenerator from "./namesGenerator.jsx";

export const SignupBusiness = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(true);
    const [businessForm, setBusinessForm] = useState(store.signupForm.company)
    const [statesList, setStatesList] = useState(store.states)
    const [selectedPriceId, setSelectedPriceId] = useState("")

    const handleInputChange = e => {
        const { name, value } = e.target;

        if (name === 'formation_state') {
            const selectedItem = statesList.find((item) => item.code === value);
            if (selectedItem && businessForm.type === 'LLC') {
                setSelectedPriceId(selectedItem.llc_price_id);
            } else {
                setSelectedPriceId(selectedItem.corp_price_id);
            }
        }

        setBusinessForm(prevState => ({ ...prevState, [name]: value }));
    };

    const handleClick = () => {
        actions.updateCompanyInfo(businessForm);
        actions.updateCheckout(selectedPriceId)
        navigate("/signup-owners");
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    useEffect(() => {
        setBusinessForm(store.signupForm.company);
    }, [store.signupForm.company]);

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
                                <Link to="/signup">Previous Step</Link>
                                <h3 className="text-center">Sign Up to Afthonia</h3>

                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">Business Information</span>
                                    <div className="line"></div>
                                </div>
                                <form className="mt-4">
                                    <div className="d-flex row">
                                        <div className="col-lg-4">
                                            <label htmlFor="inputState" className="large mb-2">Business Type</label>
                                            <select name="type" id="inputState" className="form-select mb-3 py-2" value={businessForm.type} onChange={handleInputChange}>
                                                <option>Choose...</option>
                                                <option value="LLC">LLC</option>
                                                <option value="SCorp">S Corp</option>
                                                <option value="CCorp">C Corp</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-8">
                                            <label htmlFor="inputState" className="large mb-2">Formation State</label>
                                            <select name="formation_state" id="inputState" className="form-select mb-3 py-2" value={businessForm.formation_state} onChange={handleInputChange}>
                                                <option>Choose...</option>
                                                {statesList.map((item, index) => (
                                                    <option key={index} value={item.code}>
                                                        {item.state} - ${businessForm.type === 'LLC' ? item.llc_price : item.corp_price}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex row">
                                        <div className="col-lg-8">
                                            <label htmlFor="company-name" className="large mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="company-name"
                                                placeholder="Company Name"
                                                className="form-control border-0 py-2"
                                                value={businessForm.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-lg-4">
                                            <label htmlFor="inputState" className="large mb-2">Designator</label>
                                            <select name="designator" id="inputState" className="form-select py-2" value={businessForm.designator} onChange={handleInputChange}>
                                                <option>Choose...</option>
                                                <option value="LLC">LLC</option>
                                                <option value="Limited Liability Company">Limited Liability Company</option>
                                                <option value="L.L.C.">L.L.C.</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-0 mb-3 col-lg-9"><NamesGenerator /></div>
                                    <div className="col">
                                        <label htmlFor="inputActivity" className="large mb-2">Business Activity</label>
                                        <input type="text" className="form-control mb-3 border-0 py-2" name="activity" id="inputActivity" placeholder="Business Activity" value={businessForm.activity} onChange={handleInputChange} />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <input type="checkbox" id="remember" checked={isChecked} onChange={handleCheckboxChange} />
                                        <label htmlFor="remember" className="cursor">Keep Your Privacy! Use Our Address Included In All Plans.</label>
                                    </div>
                                    {!isChecked && (
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="inputAddress" className="large mb-2">Address</label>
                                                <input type="text" className="form-control mb-3 border-0 py-2" name="address" id="inputAddress" placeholder="1234 Main St" value={businessForm.address} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="inputAddress2" className="large mb-2">Address 2</label>
                                                <input type="text" className="form-control mb-3 border-0 py-2" name="address_2" id="inputAddress2" placeholder="Apartment, studio, or floor" value={businessForm.address_2} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="inputCity" className="large mb-2">City</label>
                                                <input type="text" className="form-control mb-3 border-0 py-2" name="city" id="inputCity" value={businessForm.city} onChange={handleInputChange} />
                                            </div>
                                            <div className="col-lg-4">
                                                <label htmlFor="inputState" className="large mb-2">State</label>
                                                <select name="state" id="inputState" className="form-select mb-3 py-2" value={businessForm.state} onChange={handleInputChange}>
                                                    <option>Choose...</option>
                                                    {statesList.map((item, index) => (
                                                        <option key={index} value={item.code}>
                                                            {item.state}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-lg-2">
                                                <label htmlFor="inputZip" className="large mb-2">Zip</label>
                                                <input type="text" className="form-control mb-3 border-0 py-2" name="zip" id="inputZip" value={businessForm.zip} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    )}
                                    {(businessForm.type == "SCorp" || businessForm.type == "CCorp") &&
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <label htmlFor="shares" className="large mb-2">Number of Shares</label>
                                                <div className="input-group">
                                                    <span className="input-group-text mb-3 border-0 py-2">#</span>
                                                    <input type="number" className="form-control mb-3 border-0 py-2" name="shares" id="shares" placeholder="Number of Shares" value={businessForm.shares} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <label htmlFor="shares-value" className="large mb-2">Shares Value</label>
                                                <div className="input-group">
                                                    <span className="input-group-text mb-3 border-0 py-2">$</span>
                                                    <input type="number" className="form-control mb-3 border-0 py-2" name="shares_value" id="shares-value" placeholder="Shares Value" value={businessForm.shares_value} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                    }
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

export default SignupBusiness;