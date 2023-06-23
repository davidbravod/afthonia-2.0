import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import profile from "../../images/profile.png";
import googleImage from "../../images/google_md.png"
import facebookImage from "../../images/facebook_md.png"
import telegramImage from "../../images/telegram_md.png"

export const Backoffice = () => {
    const { store, actions } = useContext(Context);
    let [infoUser, setInfoUser] = useState(null)

    useEffect(() => {
        setInfoUser(store.userData);
    }, [store.userData]);

    return (
        <div className="container-fluid main-content px-2 px-lg-4 mt-5">
            <div className="row g-3 g-lg-4 profile-details-content-3 pb-4">
                <div className="col-xl-4">
                    <div className="p-2 p-sm-4 right-side rounded">
                        <img src={profile} alt="" />
                        <h4 className="pt-3">Profile Details</h4>
                        <span className="bottom-border d-block pb-4">{infoUser == null ? "" : `${infoUser.first_name} ${infoUser.last_name}`}</span>
                        <div style={{ "overflowX": "auto" }}>
                            <table>
                                <tbody>
                                    <tr className="bottom-border mt-3">
                                        <td className="d-flex align-items-center gap-1 d-inline-block">
                                            <span className="material-symbols-outlined text-gray">call</span>
                                            Phone Number
                                        </td>
                                        <td>:</td>
                                        <td>
                                            <a href="tel:405555-0128">(405) 555-0128</a>
                                        </td>
                                    </tr>
                                    <tr className="bottom-border">
                                        <td className="d-flex align-items-center gap-1 d-inline-block">
                                            <span className="material-symbols-outlined text-gray">location_on</span>
                                            Location
                                        </td>
                                        <td>:</td>
                                        <td>New York</td>
                                    </tr>
                                    <tr className="bottom-border">
                                        <td className="d-flex align-items-center gap-1 d-inline-block">
                                            <span className="material-symbols-outlined text-gray">email</span>
                                            Support Email
                                        </td>
                                        <td>:</td>
                                        <td>
                                            <a href="mailto:info@example.com">info@example.com</a>
                                        </td>
                                    </tr>
                                    <tr className="bottom-border">
                                        <td className="d-flex align-items-center gap-1 d-inline-block">
                                            <span className="material-symbols-outlined text-gray">language</span>
                                            Website
                                        </td>
                                        <td>:</td>
                                        <td>
                                            <a href="#">google.com</a>
                                        </td>
                                    </tr>
                                    <tr className="bottom-border">
                                        <td className="d-flex align-items-center gap-1 d-inline-block">
                                            <span className="material-symbols-outlined text-gray">calendar_month</span>
                                            Contact Since
                                        </td>
                                        <td>:</td>
                                        <td>
                                            <a href="#">14 Aug - 25 Aug</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8">
                    <div className="company-details px-3 px-lg-4 pb-4 pt-4 rounded">
                        <h4 className="mb-3">About US</h4>
                        <p>
                            You are an IT specialist with expertise in various technologies and systems. You design, implement,
                            and maintain IT solutions to improve business operations and productivity.
                        </p>
                        <p>
                            You are an IT specialist with expertise in various technologies and systems. You design, implement,
                            and maintain IT solutions to improve business operations and productivity.
                        </p>
                        <p>
                            You are an IT specialist with expertise in various technologies and systems. You design, implement,
                            and maintain IT solutions to improve.
                        </p>
                        <p>
                            You are an IT specialist with expertise in various technologies and systems. You design, implement,
                            and maintain IT solutions to improve business operations and productivity. You are an IT specialist
                            with expertise in various technologies and systems. You design, implement, and maintain IT solutions
                            to improve business operations and productivity.
                        </p>
                    </div>
                    <div className="right-bottom p-2 p-sm-4 mt-4">
                        <h4 className="pt-2 pb-4 mb-4 bottom-border">Skills</h4>
                        <span className="white-btn mb-3 me-1 px-lg-4">UI/UX Design</span>
                        <span className="white-btn mb-3 me-1 px-lg-4">Web Design</span>
                        <span className="white-btn mb-3 me-1 px-lg-4">Development</span>
                        <span className="white-btn mb-3 me-1 px-lg-4">Product Design</span>
                        <span className="white-btn mb-3 me-1 px-lg-4">Branding Design</span>
                        <span className="white-btn mb-3 me-1 px-lg-4">Development</span>
                    </div>
                    <div className="right-bottom p-2 p-sm-4 mt-4">
                        <h4 className="mb-4 pt-4">Experience</h4>

                        <div className="rounded mb-3 pb-3 bottom-border">
                            <div className="pt-2 d-flex gap-2 justify-content-between flex-wrap mb-3">
                                <div className="d-flex gap-2 align-items-start">
                                    <img src={googleImage} alt="" />
                                    <div className="flex-grow-1">
                                        <h4 className="mb-0">Google</h4>
                                        <span className="nowrap">New York, NY</span>
                                    </div>
                                </div>
                                <span className="primary">Jun 2022 - Apr 2023</span>
                            </div>
                            <p className="mb-0">
                                You are an IT specialist with expertise in various technologies and systems. You design, implement,
                                and maintain IT solutions to improve business operations and productivity.
                            </p>
                        </div>

                        <div className="rounded mb-3 pb-3 bottom-border">
                            <div className="pt-2 d-flex gap-2 justify-content-between flex-wrap mb-3">
                                <div className="d-flex gap-2 align-items-start">
                                    <img src={facebookImage} alt="" />
                                    <div className="flex-grow-1">
                                        <h4 className="mb-0">Facebook</h4>
                                        <span className="nowrap">New York, NY</span>
                                    </div>
                                </div>
                                <span className="primary">Jun 2022 - Apr 2023</span>
                            </div>
                            <p className="mb-0">
                                You are an IT specialist with expertise in various technologies and systems. You design, implement,
                                and maintain IT solutions to improve business operations and productivity.
                            </p>
                        </div>

                        <div className="rounded mb-3 pb-3 bottom-border">
                            <div className="pt-2 d-flex gap-2 justify-content-between flex-wrap mb-3">
                                <div className="d-flex gap-2 align-items-start">
                                    <img src={telegramImage} alt="" />
                                    <div className="flex-grow-1">
                                        <h4 className="mb-0">Telegram</h4>
                                        <span className="nowrap">New York, NY</span>
                                    </div>
                                </div>
                                <span className="primary">Jun 2022 - Apr 2023</span>
                            </div>
                            <p className="mb-0">
                                You are an IT specialist with expertise in various technologies and systems. You design, implement,
                                and maintain IT solutions to improve business operations and productivity.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Backoffice;
