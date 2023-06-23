import React, {useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Sidebar } from "./component/sidebar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login.jsx";
import { Signup } from "./pages/signup.jsx";
import { SignupBusiness } from "./pages/signupBusiness.jsx";
import { SignupOwners } from "./pages/signupOwners.jsx";
import { SignupRegAgent } from "./pages/signupRegAgent.jsx";
import { SignupEin } from "./pages/signupEin.jsx";
import { Backoffice } from "./pages/backoffice.jsx";
import { Dashboard } from "./pages/dashboard.jsx";
import { MailDocuments } from "./pages/mailDocuments.jsx";
import { BuyMore } from "./pages/buyMore.jsx";
import { CancelPayment } from "./pages/cancelPayment.jsx";
import { SuccessPayment } from "./pages/successPayment.jsx";
import { SignupSelectPlan } from "./pages/signupSelectPlan.jsx";
import { MyCompany } from "./pages/myCompany.jsx";

export const Layout = () => {
    const [navbarClicked, setNavbarClicked] = useState(false);

    const handleNavbarClick = () => {
        setNavbarClicked((prevNavbarClicked) => !prevNavbarClicked);
    };

    return (
        <div>
                <ScrollToTop>
                    <div className={`d-flex wrapper ${navbarClicked ? "toggled" : ""}`} id="wrapper">
                        <Sidebar />
                        <div id="page-content-wrapper" className="page-content-wrapper">
                            <Navbar handleNavbarClick={handleNavbarClick} />
                            <Routes>
                                <Route element={<Home />} path="/" />
                                <Route element={<Demo />} path="/demo" />
                                <Route element={<Single />} path="/single/:theid" />
                                <Route element={<Backoffice />} path="/user/backoffice" />
                                <Route element={<Dashboard />} path="/user/dashboard" />
                                <Route element={<MailDocuments />} path="/user/maildocuments" />
                                <Route element={<BuyMore />} path="/user/buymore" />
                                <Route element={<CancelPayment />} path="/user/cancelpayment" />
                                <Route element={<SuccessPayment />} path="/user/successpayment" />
                                <Route element={<MyCompany />} path="/user/mycompany" />
                                <Route element={<h1>Not found!</h1>} />
                            </Routes>
                            <Footer />
                        </div>
                    </div>
                    
                </ScrollToTop>
        </div>
    );
};

export const LayoutSignup = () => {

    return (
        <div>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Layout />} path="/*" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<SignupBusiness />} path="/signup-business" />
                        <Route element={<SignupOwners />} path="/signup-owners" />
                        <Route element={<SignupRegAgent />} path="/signup-agent" />
                        <Route element={<SignupEin />} path="/signup-ein" />
                        <Route element={<SignupSelectPlan />} path="/signup-plan" />
                    </Routes>
                </ScrollToTop>
        </div>
    );
};
