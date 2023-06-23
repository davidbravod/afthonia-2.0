import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logoAfthonia from "../../img/Logo-Afthonia-azul.png";
import backgroundImage from "../../images/profile_bg.png"

export const CancelPayment = () => {
    const { store, actions } = useContext(Context);
    const lastPaymentBody = JSON.parse(localStorage.getItem("lastPaymentBody"));


    const retryPayment = async () => {
        let error = await actions.retryPayment(lastPaymentBody)
        if (error) {
            alert("Please contact support.")
        }
    };

    return (
        <>
            <div className="integration-details-top pt-3 pt-lg-5"> <img src={backgroundImage} alt="" style={{ "height": "250px" }} /> </div>
            <div className="row g-3 g-lg-4 company-details-content p-4">
                <div className="col-lg-5">
                    <div
                        className="p-2 p-sm-4 right-side rounded d-flex flex-column align-items-center text-center"
                    >
                        <img src={logoAfthonia} alt="" style={{ "height": "150px", "width": "150px" }} />
                        <h3 className="mt-3">BAD NEWS!</h3>
                        <p className="pb-4">
                            Your payment did not go through. Please try again!
                        </p>
                        <div>
                            <button type="button" className="primary-btn" onClick={retryPayment}>Try Again!</button>
                            <button type="button" className="primary-btn ms-3">Support</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="company-details px-3 px-lg-4 pb-4 pt-4 rounded">
                        <h4 className="mb-3 fw-semibold">
                            Take a look to our FAQs:
                        </h4>
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            {store.faqDashboard.map((item, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`panelsStayOpen-heading${index}`}>
                                        <button className={`accordion-button ${index != 0 ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapse${index}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapse${index}`}>
                                            {item.question}
                                        </button>
                                    </h2>
                                    <div id={`panelsStayOpen-collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`} aria-labelledby={`panelsStayOpen-heading${index}`}>
                                        <div className="accordion-body">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CancelPayment;
