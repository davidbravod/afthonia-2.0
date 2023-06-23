import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logoAfthonia from "../../img/Logo-Afthonia-azul.png";
import docsImage from "../../images/docs.jpeg"

export const MyCompany = () => {
    const { store, actions } = useContext(Context);

    const openPDF = () => {
        window.open("https://drive.google.com/file/d/1ALBefCqMFqIVsNRVU3PxSFhtT8X10xao/view?usp=drive_link", "_blank");
    };

    return (
        <>
            <div className="container-fluid main-content px-2 px-lg-4 pt-3 pt-lg-5 mt-5">

                <div className="row">
                    <h3 className="mt-4">My Company</h3>
                    <span className="medium">Here you will find all your company's documents</span>
                </div>
                <div className="row g-3 g-lg-4 pb-4 mt-3">
                    <div className="col-lg-6 col-xxl-4">
                        <div className="board-card rounded">
                            <span className="primary-tag">Formation</span>
                            <div className="d-flex justify-content-center mt-4">
                                <img src={docsImage} alt="" style={{ "maxWidth": "150px" }} />
                            </div>

                            <h4 className="mt-3">Articles of Organization</h4>
                            <p>
                                Establishes the formation and operating structure of a LLC.
                            </p>
                            <div
                                className="d-flex justify-content-between align-items-center gap-1 mt-3 flex-wrap w-100"
                            >
                                <button type="button" className="w-100 btn btn-lg btn-outline-primary mt-3" onClick={openPDF}>View Document</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default MyCompany;