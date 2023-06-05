import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Uploader from "../component/uploader/uploader.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const getCompanies = async () => {
    let { respuestaJson, response } = await actions.fetchRegisteredAgent(
      "/companies"
    );
    if (response.ok) {
      console.log(respuestaJson, response);
    } else {
      console.log("Fetch failed with status ", response.status);
      console.log("Response: ", respuestaJson);
    }
  };
  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://start.4geeksacademy.com/starters/react-flask">
          Read documentation
        </a>
      </p>
      <div>
        <p>Aquí sección de subir imagenes</p>
        <Uploader />
      </div>
    </div>
  );
};
