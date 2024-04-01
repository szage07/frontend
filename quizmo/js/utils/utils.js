
import { createRouter } from "../router/router.js";

createRouter();

const url = "http://backend.test"; 

function SuccessNotification(message = ""){
    document.querySelector(".alert-success").classList.remove("d-none");
    document.querySelector(".alert-success").classList.add("d-block");
    document.querySelector(".alert-success").innerHTML = "Account Registered Successfully.";

    setTimeout(() => {
        document.querySelector(".alert-success").classList.add("d-none");
      }, 10000); 
}

function ErrorNotification(message = ""){
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector(".alert-danger").classList.add("d-block");
    document.querySelector(".alert-danger").innerHTML = "Registration Unsuccessful !!!";

    setTimeout(() => {
        document.querySelector(".alert-danger").classList.add("d-none");
      }, 10000); 
}

export{url,ErrorNotification,SuccessNotification,createRouter};