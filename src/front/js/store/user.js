import { loadStripe } from "@stripe/stripe-js";
import jwt_decode from "jwt-decode";

export const userStore = {
    userLogin: false,
    userData: null,
    userDocs: null,
  }

  export function userActions(getStore, getActions, setStore) {
    return {

      login: async (emailOrUsername, password) => {
        const store = getStore();
        let actions = getActions();
        let obj = {
          email_or_username: emailOrUsername,
          password: password
        };
  
        let { responseJson, response } = await actions.useFetch(
          "/login",
          obj,
          "POST"
        );
        if (response.ok) {
          localStorage.setItem("token", responseJson.token);
          sessionStorage.setItem("token", responseJson.token);
          let token = localStorage.getItem("token");
          setStore({ ...store, userLogin: true });
          actions.getUserData();
          actions.getUserDocs();
        } else {
          console.log("login fallido");
          localStorage.setItem("token", "");
          sessionStorage.setItem("token", "");
          setStore({ ...store, userLogin: false });
        }
  
        return { responseJson, response };
    },

    logout: async () => {
      const store = getStore();
      const actions = getActions();
      let body = "";
      let { responseJson, response } = await actions.useFetch(
        "/logout",
        body,
        "POST"
      );
      if (response.ok) {
        localStorage.setItem("token", "");
        sessionStorage.setItem("token", "");
        setStore({ ...store, userLogin: false });
        setStore({ ...store, userData: {} })
      }
      return { responseJson, response };
    },

      retryPayment: async (body) => {
        const store = getStore()
        const actions = getActions()
        try {
  
          const response = await fetch('http://127.0.0.1:3001/api/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
  
          if (response.ok) {
            const { id } = await response.json();

            localStorage.setItem("sessionId", JSON.stringify(id));
  
            const stripe = await loadStripe('pk_test_51LrRL4A5pmsREOI3xlvaZOkVOPKPoQ5aL5nwWZ6jIx2OZTTGgiSnjS9xxynS87OM8o1Oc0uzOAwa8o4Wj0KOayJ9005RS4xyV5');
  
            const { error } = await stripe.redirectToCheckout({ sessionId: id });
  
            if (error) {
              console.log(error);
              alert(`Payment failed: ${error.message}`);
            }
          } else {
            throw new Error(`API request failed: ${response.status}`);
          }
        } catch (error) {
  
          alert(`Failed to start payment: ${error.message}`);
          return error.message;
        }
      },

      getUserData: async () => {
        let store = getStore();
        let actions = getActions();
        let body = ""

        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;
  
        let { responseJson, response } = await actions.useFetch(
          `/users/${userId}`,
          body,
          "GET"
        );
  
        if (response.ok) {
          setStore({ ...store, userData: responseJson });
        } else {
          console.log("fetch fallido");
        }
  
        return { responseJson, response };
      },

      getUserDocs: async () => {
        let store = getStore();
        let actions = getActions();
        let body = ""

        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;
  
        let { responseJson, response } = await actions.useFetch(
          `/corporatetools/documents/${userId}`,
          body,
          "GET"
        );
  
        if (response.ok) {
          setStore({ ...store, userDocs: responseJson });
        } else {
          console.log("fetch fallido");
        }
  
        return { responseJson, response };
      },

      editUser: async (obj) => {
        let store = getStore();
        let actions = getActions();
  
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;
  
        let { responseJson, response } = await actions.useFetch(
          `/users/${userId}`,
          obj,
          "PUT"
        );
        if (response.ok) {
          actions.getUserData()
        }
  
        return { responseJson, response };
      },

      editCompany: async (obj) => {
        let store = getStore();
        let actions = getActions();
  
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.sub;
  
        let { responseJson, response } = await actions.useFetch(
          `/companies/${userId}`,
          obj,
          "PUT"
        );
        if (response.ok) {
          actions.getUserData()
        }
  
        return { responseJson, response };
      },

    }
  }