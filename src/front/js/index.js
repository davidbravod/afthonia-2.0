//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import {Layout, LayoutSignup} from "./layout";

const App = injectContext(() => (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<LayoutSignup />} />
            <Route path="/*" element={<Layout />} />
        </Routes>
    </BrowserRouter>
));

//render your react application
ReactDOM.render(<App />, document.querySelector("#app"));
