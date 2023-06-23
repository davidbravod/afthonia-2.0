import { loadStripe } from "@stripe/stripe-js";

export const signupStore = {
    signupForm: {
        user: {
            first_name: "",
            last_name:"",
            email:"",
            phone:"",
            password:""
        },
        company: {
            type:"",
            formation_state:"",
            name:"",
            designator: "",
            activity:"",
            address:"",
            address_2:"",
            city:"",
            state:"",
            country:"",
            zip:"",
            shares:"",
            shares_value:"",
            president:"",
            secretary:"",
            treasurer:"",
            is_paid:false,
            subscription_id:"1"
            },
        owners: {
          first_name: "",
          last_name: "",
          company_name: "",
          address: "",
          address_2: "",
          city: "",
          state: "",
          country: "",
          zip: "",
          shares_owned: "",
          percentage_ownership: ""
          },
        registered_agent: {
            first_name:"",
            last_name:"",
            company_name:"",
            address:"",
            address_2:"",
            city:"",
            state:"",
            country:"",
            zip:"",
            phone:"",
            email:""
            },
        ein: {
            first_name:"",
            last_name:"",
            tax_type:"ssn",
            tax_number:"",
            foreign:false,
            own_application:false
            }

  },
  ownersNumber: 1,
  checkout: {
    line_items: [{price:"", quantity: 1}, {price:"", quantity: 1}]
  },
}

export function signupActions(getStore, getActions, setStore) {
  return {

    updateUserInfo: (updatedUser) => {
        const store = getStore();

        let updatedSignupForm = {...store.signupForm};

        updatedSignupForm.user = updatedUser;

        setStore({...store, signupForm: updatedSignupForm});

        return store.signupForm.user;
    },

    updateCompanyInfo: (updatedCompany) => {
      const store = getStore();

      let updatedCompanyCopy = { ...updatedCompany };

      if ('shares' in updatedCompanyCopy) {
        updatedCompanyCopy.shares = updatedCompanyCopy.shares !== "" ? parseInt(updatedCompanyCopy.shares) : 0;
    }
    if ('shares_value' in updatedCompanyCopy) {
        updatedCompanyCopy.shares_value = updatedCompanyCopy.shares_value !== "" ? parseFloat(updatedCompanyCopy.shares_value) : 0;
    }

      let updatedSignupForm = {...store.signupForm};

      updatedSignupForm.company = updatedCompanyCopy;
      updatedSignupForm.registered_agent.state = updatedCompanyCopy.formation_state;

      setStore({...store, signupForm: updatedSignupForm});

      return store.signupForm.company;
  },

    updateCheckout: (priceId) => {
      const { checkout } = getStore();
    
      const updatedLineItems = [...checkout.line_items];
      updatedLineItems[0].price = priceId;
    
      setStore(prevStore => ({
        ...prevStore,
        checkout: {
          ...prevStore.checkout,
          line_items: updatedLineItems
        }
      }));
    },  

    updateCheckout2: (priceId) => {
      const { checkout } = getStore();
    
      const updatedLineItems = [...checkout.line_items];
      updatedLineItems[1].price = priceId;
    
      setStore(prevStore => ({
        ...prevStore,
        checkout: {
          ...prevStore.checkout,
          line_items: updatedLineItems
        }
      }));
    },

  updateOwnersInfo: (owners) => {
    const store = getStore();

    let ownersCopy = owners.map(owner => {
        if ('shares_owned' in owner) {
            owner.shares_owned = owner.shares_owned !== "" ? parseInt(owner.shares_owned) : 0;
        }
        if ('percentage_ownership' in owner) {
            owner.percentage_ownership = owner.percentage_ownership !== "" ? parseInt(owner.percentage_ownership) : 0;
        }
        return owner;
    });

    let updatedSignupForm = {...store.signupForm};

    updatedSignupForm.owners = ownersCopy;

    setStore({...store, signupForm: updatedSignupForm});

    return store.signupForm.owners;
},

  updateOwnersNumber: (numOwners) => {
    const store = getStore();

    setStore({...store, ownersNumber: numOwners});

    return store.ownersNumber;
  },

  updateRegisteredAgentInfo: (registeredAgent) => {
    const store = getStore();

    let updatedSignupForm = {...store.signupForm};

    updatedSignupForm.registered_agent = registeredAgent;

    setStore({...store, signupForm: updatedSignupForm});

    return store.signupForm.registered_agent;
  },

  updateEinInfo: (einInfo) => {
    const store = getStore();

    let updatedSignupForm = {...store.signupForm};

    updatedSignupForm.ein = einInfo;

    setStore({...store, signupForm: updatedSignupForm});

    return store.signupForm.ein;
  },

    handlePayment: async () => {
      const store = getStore()
      const actions = getActions()
      try {

        const lineItems = store.checkout.line_items
        const email = store.signupForm.user.email
        const body = {line_items: lineItems, email: email}
        localStorage.setItem("lastPaymentBody", JSON.stringify(body));

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

    signup: async () => {
      const { signupForm } = getStore();
      let actions = getActions();

      let { responseJson, response } = await actions.useFetch(
        "/signup",
        signupForm,
        "POST"
      );
      if (response.ok) {
        let email = signupForm.user.email
        let password = signupForm.user.password
        await actions.login(email, password);
      } else {
        alert("Registro fallido");
      }

      return response;
    },
};
}