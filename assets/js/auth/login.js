import {url, SuccessNotification,ErrorNotification } from "../utils/utils.js";


//form register
const form_login = document.getElementById("form_login");
const notification = document.getElementById("notification"); // Assuming you have a notification element

form_login.onsubmit = async (e) => {
  e.preventDefault();

  const createButton = document.querySelector("#form_login button");
  createButton.disabled = true;
  createButton.textContent = "Logging in...";
  createButton.classList.add("spinner-button");

  try {
    const password = document.getElementById("password").value;
    const formData = new FormData(form_login);

    const response = await fetch(url + "/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (response.ok) {
      const json = await response.json();
      console.log(json);
      
    
      SuccessNotification("Account Login Successfully!!");
      notification.textContent = "Login successful!";
      
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 

      
      localStorage.setItem("token", json.token);
      form_login.reset();
      
      window.location.pathname = "/assets/js/dashboard/dashboard.html";

    } else if (response.status === 422) {
      const json = await response.json();
      if (json.message === "Incorrect password") {
        ErrorNotification("Incorrect password. Please try again.");
        notification.textContent = "Incorrect password. Please try again.";
        
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 
        
      } else {
        notification.textContent = `Client error: ${json.message}`;
        
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 
        ErrorNotification(json.message);
      }

    } else if (response.status >= 400 && response.status < 500) {
      const json = await response.json();
      notification.textContent = `Client error: ${json.message}`;
      
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 
      ErrorNotification(json.message);

    } else if (response.status >= 500 && response.status < 600) {
      notification.textContent = "Server error occurred. Please try again later.";
      
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 
      ErrorNotification(json.message);

    } else {
      notification.textContent = "An unexpected error occurred. Please try again later.";
      
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 
      ErrorNotification(json.message);
    }

  } catch (error) {
    console.error("Network error:", error);
    notification.textContent = "Network error occurred. Please try again later.";
    
    setTimeout(() => {
        notification.textContent="";
      }, 10000); 
    ErrorNotification(json.message);
  } finally {
    createButton.disabled = false;
    createButton.textContent = "Log in";
    createButton.classList.remove("spinner-button");
  }
};
