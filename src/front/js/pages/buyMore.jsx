import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { loadStripe } from "@stripe/stripe-js";
import "../../styles/home.css";

import facebookImage from "../../images/fb_l.png"
import linkedinImage from "../../images/linkedin_l.png"


export const BuyMore = () => {
    const { store, actions } = useContext(Context);

    const handlePayment = async () => {
        try {
            // Make a POST request to your backend API
            const response = await fetch('http://127.0.0.1:3001/api/create-checkout-session', { method: 'POST' });

            // Check if the request was successful
            if (response.ok) {
                // Extract the Session ID from the response
                const { id } = await response.json();

                // Load Stripe.js
                const stripe = await loadStripe("pk_test_51LrRL4A5pmsREOI3xlvaZOkVOPKPoQ5aL5nwWZ6jIx2OZTTGgiSnjS9xxynS87OM8o1Oc0uzOAwa8o4Wj0KOayJ9005RS4xyV5");

                // Redirect to the Checkout Session
                const { error } = await stripe.redirectToCheckout({ sessionId: id });

                // If there's an error, display it to the user
                if (error) {
                    console.log(error);
                    alert(`Payment failed: ${error.message}`);
                }
            } else {
                // If the request failed, throw an error
                throw new Error(`API request failed: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
            alert(`Failed to start payment: ${error.message}`);
        }
    }

    return (
        <>
            <div className="integration-section px-xl-3">
                <div className="row pb-2 buttons">
                    <div className="d-flex flex-wrap gap-2 gap-md-3">
                        <button data-filter="*" className="filter-button active px-3">
                            All
                        </button>
                        <button data-filter=".search" className="filter-button">
                            Business Email
                            <span className="material-symbols-outlined"> search </span>
                        </button>
                        <button data-filter=".social" className="filter-button">
                            Domains
                            <span className="material-symbols-outlined"> share_reviews </span>
                        </button>
                        <button data-filter=".stream" className="filter-button">
                            Hosting
                            <span className="material-symbols-outlined"> live_tv </span>
                        </button>
                    </div>
                </div>
                <div className="isotope-container d-flex flex-wrap">
                    <div className="item p-3 social">
                        <div className="content p-3 p-md-4">
                            <img src={facebookImage} alt="" />
                            <h4 className="fw-semibold pt-3">Facebook</h4>
                            <p className="mb-4 text-center">
                                Ut vel pretium eros, sed egestas urna. Etiam a lorem ex.
                                Donec sit amet ex magna. Mauris sit amet dapibus purus.
                            </p>
                            <button type="button" className="primary-btn" onClick={handlePayment}>
                                View Integration
                            </button>
                        </div>
                    </div>
                    <div className="item p-3 social">
                        <div className="content p-3 p-md-4">
                            <img src={linkedinImage} alt="" />
                            <h4 className="fw-semibold pt-3">LinkedIn</h4>
                            <p className="mb-4 text-center">
                                Ut vel pretium eros, sed egestas urna. Etiam a lorem ex.
                                Donec sit amet ex magna. Mauris sit amet dapibus purus.
                            </p>
                            <span className="primary-btn">
                                <a href="integration_details.html" > View Integration </a>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BuyMore;
