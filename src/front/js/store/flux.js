import { faqStore } from "./faq.js";
import { pricingStore } from "./pricingStore.js";
import { signupActions, signupStore } from "./signupStore.js";
import { statesActions, statesStore } from "./statesStore.js";
import { userStore, userActions } from "./user.js";
const crypto = require("crypto-js");
const sign = require("jwt-encode");

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      ...faqStore,
      ...signupStore,
      ...statesStore,
      ...pricingStore,
      ...userStore,
    },
    actions: {

      ...signupActions(getStore, getActions, setStore),
      ...statesActions(getStore, getActions, setStore),
      ...userActions(getStore, getActions, setStore),

      useFetch: async (endpoint, body = "", method = "GET") => {
				let url = "http://127.0.0.1:3001/api" + endpoint;
				let response = await fetch(url, {
					method: method,
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
					},
					body: body ? JSON.stringify(body) : null,
				});

				let responseJson = await response.json();

				return { responseJson, response };
			},

      downloadUserDocument: async (endpoint, body = "", method = "GET") => {
        let url = "http://127.0.0.1:3001/api" + endpoint;
        let response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (response.ok) { 
          let blob = await response.blob();
          const objectURL = URL.createObjectURL(blob);
          window.open(objectURL, '_blank');
      } else {
          console.log('Failed to fetch document:', response.status);
      }

      },
    },
  };
};

export default getState;
