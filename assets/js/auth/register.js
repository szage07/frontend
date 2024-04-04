import {url,SuccessNotification,ErrorNotification } from "../utils/utils.js";

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button to prevent multiple submissions
  const createButton = document.querySelector("#form_register button");
  createButton.disabled = true;
  createButton.textContent = "Creating Account..."; // Change button text to indicate loading
  createButton.classList.add("spinner-button");
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

    // Fetch API user register endpoint
    const response = await fetch(url + "/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    // Get response data
    const json = await response.json();

    // Handle response
    if (response.ok) {
      SuccessNotification("Account Registered Successfully!!");
      form_register.reset(); // Reset form
      window.location.pathname = "/assets/index.html";
      if (json.message) {
        alert(json.message);
      }
    } else if (response.status >= 400 && response.status < 500) {
      // Client errors (4xx)
      if (json.message) {
        ErrorNotification(json.message);
      }
    } else if (response.status >= 500 && response.status < 600) {
      // Server errors (5xx)
      if (json.message) {
        ErrorNotification(json.message);
      }
    } else {
      // Unexpected status codes
      if (json.message) {
        ErrorNotification(json.message);
      }
    }

  } catch (error) {
    // Handle network errors
    console.error("Network error:", error);
    if (json.message) {
      ErrorNotification(json.message);
    }
  } finally {
    // Always enable button and hide loading indicator after request completes
    createButton.disabled = false;
    createButton.textContent = "Create Account"; // Change button text back to original
  }
};
