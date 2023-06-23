import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";

export const OwnerForm = ({ ownerId, updateOwner }) => {
    const { store, actions } = useContext(Context);

    const [isChecked, setIsChecked] = useState(true);
    const [individualCheck, setIndividualCheck] = useState("individual");
    const [businessType, setBusinessType] = useState(store.signupForm.company.type)
    const [statesList, setStatesList] = useState(store.states)

    const [ownerData, setOwnerData] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        address: "",
        address_2: "",
        city: "",
        state: "",
        country: "",
        zip: "",
        shares_owned: "",
        percentage_ownership: ""
    });

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const handleIndividualCheck = (event) => {
        setIndividualCheck(event.target.value);
    };

    const handleInputChange = (e) => {
        setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        updateOwner(ownerId, ownerData);
    }, [ownerData]);

    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    Owner {ownerId + 1}
                </div>
                <div className="card-body">
                    <div className="mb-3 d-flex">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`flexRadioDefault${ownerId}`}
                                id={`flexRadioDefault1${ownerId}`}
                                value="individual"
                                checked={individualCheck === "individual"}
                                onChange={handleIndividualCheck}
                            />
                            <label className="form-check-label" htmlFor={`flexRadioDefault1${ownerId}`}>
                                Individual
                            </label>
                        </div>
                        <div className="form-check ms-3">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`flexRadioDefault${ownerId}`}
                                id={`flexRadioDefault2${ownerId}`}
                                value="company"
                                checked={individualCheck === "company"}
                                onChange={handleIndividualCheck}
                            />
                            <label className="form-check-label" htmlFor={`flexRadioDefault2${ownerId}`}>
                                Company
                            </label>
                        </div>
                    </div>
                    {individualCheck === "individual" ? (<>
                        <div className="d-flex row">
                            <div className="col-lg-6">
                                <label htmlFor="name" className="large mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="name"
                                    placeholder="First Name"
                                    className="form-control mb-3 border-0 py-2"
                                    value={ownerData.first_name}
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
                                    value={ownerData.last_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </>) : (<>
                        <div className="d-flex row">
                            <div className="col">
                                <label htmlFor="company-name" className="large mb-2">Company Name</label>
                                <input
                                    type="text"
                                    name="company_name"
                                    id="company-name"
                                    placeholder="Company Name"
                                    className="form-control mb-3 border-0 py-2"
                                    value={ownerData.company_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </>)}

                    <div className="mb-3 d-flex">
                        <input type="checkbox" id={`privacy${ownerId}`} checked={isChecked} onChange={handleCheckboxChange} />
                        <label htmlFor={`privacy${ownerId}`} className="cursor">
                            Keep Your Privacy! Use Our Address Included In All Plans.
                        </label>
                    </div>
                    {!isChecked && (
                        <div className="row">
                            <div className="col-lg-6">
                                <label htmlFor="inputAddress" className="large mb-2">Address</label>
                                <input type="text" className="form-control mb-3 border-0 py-2" name="address" id="inputAddress" placeholder="1234 Main St" value={ownerData.address} onChange={handleInputChange} />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="inputAddress2" className="large mb-2">Address 2</label>
                                <input type="text" className="form-control mb-3 border-0 py-2" name="address_2" id="inputAddress2" placeholder="Apartment, studio, or floor" value={ownerData.address_2} onChange={handleInputChange} />
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="inputCity" className="large mb-2">City</label>
                                <input type="text" className="form-control mb-3 border-0 py-2" name="city" id="inputCity" value={ownerData.city} onChange={handleInputChange} />
                            </div>
                            <div className="col-lg-4">
                                <label htmlFor="inputState" className="large mb-2">State</label>
                                <select name="state" id="inputState" className="form-select mb-3 py-2" value={ownerData.state} onChange={handleInputChange}>
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
                                <input type="text" className="form-control mb-3 border-0 py-2" name="zip" id="inputZip" value={ownerData.zip} onChange={handleInputChange} />
                            </div>
                        </div>
                    )}
                    {businessType === "LLC" ? (<>
                        <div className="row">
                            <label htmlFor="shares" className="large mb-2">% of Ownership</label>
                            <div className="input-group">
                                <span className="input-group-text mb-3 border-0 py-2">%</span>
                                <input type="number" className="form-control mb-3 border-0 py-2" name="percentage_ownership" id="shares" placeholder="% of Ownership" value={ownerData.percentage_ownership} onChange={handleInputChange} />
                            </div>
                        </div>
                    </>) : (
                        <>
                            <div className="row">
                                <label htmlFor="shares" className="large mb-2"># of Shares</label>
                                <div className="input-group">
                                    <span className="input-group-text mb-3 border-0 py-2">#</span>
                                    <input type="number" className="form-control mb-3 border-0 py-2" name="shares_owned" id="shares" placeholder="Number of Shares" value={ownerData.shares_owned} onChange={handleInputChange} />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OwnerForm;
