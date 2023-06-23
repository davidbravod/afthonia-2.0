import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/nice-select.css";
import "../../styles/styles.css";
import loginLogo from "../../img/1.png"
import login from "../../img/rocket.png"
import OwnerForm from "../component/ownerForm.jsx";

export const SignupOwners = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [numOwners, setNumOwners] = useState(store.ownersNumber);
    const [owners, setOwners] = useState([]);

    const handleOwnersChange = (e) => {
        const selectedNum = parseInt(e.target.value, 10);
        if (selectedNum < numOwners) {
            setOwners(prevOwners => prevOwners.slice(0, selectedNum));
        }
        setNumOwners(selectedNum);
    };

    const updateOwner = (ownerId, ownerData) => {
        setOwners(prevOwners => {
            const newOwners = [...prevOwners];
            newOwners[ownerId] = ownerData;
            return newOwners;
        });
    };

    useEffect(() => {
        setNumOwners(store.ownersNumber);
    }, [store.ownersNumber]);

    const handleClick = () => {
        actions.updateOwnersInfo(owners);
        actions.updateOwnersNumber(numOwners);
        navigate("/signup-agent");
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
                                <Link to="/signup-business">Previous Step</Link>
                                <h3 className="text-center">Sign Up to Afthonia</h3>

                                <div className="email mt-4">
                                    <div className="line"></div>
                                    <span className="px-1">Owners Information</span>
                                    <div className="line"></div>
                                </div>
                                <form className="mt-4">
                                    <div className="row">
                                        <label htmlFor="owners" className="large mb-2">Number of Owners</label>
                                        <select id="owners" className="form-select mb-3 py-2" value={numOwners} onChange={handleOwnersChange}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                        </select>
                                    </div>
                                    {
                                        Array.from({ length: numOwners }).map((_, index) => (
                                            <OwnerForm
                                                key={index}
                                                ownerId={index}
                                                updateOwner={updateOwner}
                                            />
                                        ))
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

export default SignupOwners;