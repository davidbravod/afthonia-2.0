import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import facebook from "../../images/fb_l.png"

export const MailDocuments = () => {
    const { store, actions } = useContext(Context);
    const [userDocs, setUserDocs] = useState(null);
    const [loadingIds, setLoadingIds] = useState({});

    const handleDownload = async (id) => {
        setLoadingIds(prevState => ({ ...prevState, [id]: true }));

        try {
            await actions.downloadUserDocument(`/corporatetools/download/${id}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingIds(prevState => ({ ...prevState, [id]: false }));
        }
    };


    useEffect(() => {
        setUserDocs(store.userDocs)
    }, [store.userDocs]);

    return (
        <>
            <div
                className="container-fluid main-content px-2 px-lg-4 pt-3 pt-lg-5 mt-5"
            >
                <div className="row">
                    <h3 className="mt-4">Mail Documents</h3>
                    <span className="medium">Here you will find all the documents we receive for you in our address.
                        Also any notification from the State or federal.</span>
                </div>
                <div className="row my-2 g-3 g-lg-4 contact-section">
                    <div className="col">
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                                tabIndex="0"
                            >
                                <div className="row my-2 g-3 g-lg-3">
                                    <div className="col">
                                        <div className="product-table p-3 px-md-4">
                                            <div className="table-responsive">
                                                <table className="table align-middle mb-0 bg-white">
                                                    <thead className="bg-light">
                                                        <tr>
                                                            <th>Title</th>
                                                            <th>Jurisdiction</th>
                                                            <th>Status</th>
                                                            <th>Date</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userDocs && userDocs.length > 0 ? (
                                                            userDocs.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="d-flex align-items-center">
                                                                            <img
                                                                                src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                                                                alt=""
                                                                                style={{ height: "45px", width: "45px" }}
                                                                                className="rounded-circle"
                                                                            />
                                                                            <div className="ms-3">
                                                                                <p className="fw-bold mb-1">{item.company_name}</p>
                                                                                <p className="text-muted mb-0">{item.type}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="fw-normal mb-1">{item.jurisdiction}</p>
                                                                    </td>
                                                                    <td>
                                                                        <span className="badge bg-success rounded-pill d-inline">
                                                                            {item.status}
                                                                        </span>
                                                                    </td>
                                                                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-link btn-sm rounded-pill"
                                                                            onClick={() => handleDownload(item.id)}
                                                                            disabled={loadingIds[item.id]}
                                                                        >
                                                                            {loadingIds[item.id] ? (
                                                                                <div className="spinner-border" role="status">
                                                                                    <span className="visually-hidden">Loading...</span>
                                                                                </div>
                                                                            ) : (
                                                                                "Download"
                                                                            )}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="5" className="text-center">No Documents to Show</td>
                                                            </tr>
                                                        )}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MailDocuments;