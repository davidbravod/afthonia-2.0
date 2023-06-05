const crypto = require("crypto-js");
const sign = require("jwt-encode");

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      fetchRegisteredAgent: async (endpoint, body = "", method = "GET") => {
        let keys = {
          access_key: process.env.ACCESS_KEY,
          secret_key: process.env.SECRET_KEY,
        };

        let url = "https://api.corporatetools.com" + endpoint;
        let query_string = "";
        let request_body = body ? JSON.stringify(body) : "";

        let payload = {
          path: endpoint,
          content: crypto
            .SHA256(query_string + request_body)
            .toString(crypto.enc.Hex),
        };
        let token = sign(payload, keys.secret_key, {
          access_key: keys.access_key,
        });

        let response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: request_body ? JSON.stringify(request_body) : null,
        });

        let respuestaJson = await response.json();

        return { respuestaJson, response };
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const store = getStore();
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ ...store, message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
