import {url,SuccessNotification,ErrorNotification } from "../utils/utils.js";


// const url = "http://backend.test"; 

const form_register = document.getElementById("form_register");

const loadingIndicator = document.getElementById("loading-indicator"); // Assuming you have an element for the loading indicator

form_register.onsubmit = async (e) => {
  e.preventDefault();

  //console.log("clickable");

  // Disable button to prevent multiple submissions
  document.querySelector("#form_register button").disabled = true;

  const createButton = document.querySelector("#form_register button");
  createButton.disabled = true;
  createButton.textContent = "Creating Account..."; // Change button text to indicate loading
  createButton.classList.add("spinner-button"); // Add a class to apply spinner styling
  

  

  // Show loading indicator
  //loadingIndicator.style.display = "block"; // Assuming you have styles to show/hide the indicator

  try {
    // Password confirmation (assuming password and confirm_password IDs)
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password_confirmation").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please re-enter your password.");
      return false; // Prevent form submission
    }

    // Get form data
    const formData = new FormData(form_register);
    console.log(localStorage.getItem("token"));

    // Fetch API user register endpoint
    const response = await fetch(url + "/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        // Authorization: "Bearer " +   localStorage.getItem("token"),
        
      },
      body: formData,
    });

    // Handle response
    if (response.ok) {
  
      
      SuccessNotification("Account Registered Successfully!!");
      // Success handling (e.g., display success message, redirect to confirmation)
      // alert("Registration successful!");
      form_register.reset(); // Reset form
      window.location.pathname = "/assets/index.html";
      alert(json.message);
    } else if (response.status >= 400 && response.status < 500) {
      // Client errors (4xx)
      const json = await response.json();
      // alert(`Client error: ${json.message}`);
      ErrorNotification(json.message);
      

    } else if (response.status >= 500 && response.status < 600) {
      // Server errors (5xx)
      // alert("Server error occurred. Please try again later.");
      ErrorNotification(json.message);

    } else {
      // Unexpected status codes
      // alert("An unexpected error occurred. Please try again later.");
      ErrorNotification(json.message);
    }

  } catch (error) {
    // Handle network errors
    console.error("Network error:", error);
    // alert("Network error occurred. Please try again later.");
    ErrorNotification(json.message);
  } finally {
    // Always enable button and hide loading indicator after request completes
    document.querySelector("#form_register button").disabled = false;
    //loadingIndicator.style.display = "none";
    createButton.disabled = false;
    createButton.textContent = "Create Account";
    createButton.classList.remove("spinner-button");
  }
};


// function SuccessNotification(message = ""){
//     document.querySelector(".alert-success").classList.remove("d-none");
//     document.querySelector(".alert-success").classList.add("d-block");
//     document.querySelector(".alert-success").innerHTML = "Account Registered Successfully.";

//     setTimeout(() => {
//         document.querySelector(".alert-success").classList.add("d-none");
//       }, 10000); 
// }

// function ErrorNotification(message = ""){
//     document.querySelector(".alert-danger").classList.remove("d-none");
//     document.querySelector(".alert-danger").classList.add("d-block");
//     document.querySelector(".alert-danger").innerHTML = "Registration unsuccessful !!!";

//     setTimeout(() => {
//         document.querySelector(".alert-danger").classList.add("d-none");
//       }, 10000); 
// }