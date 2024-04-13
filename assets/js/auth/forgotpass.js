import {url, SuccessNotification,ErrorNotification } from "../utils/utils.js";

//form forgot password
const form_forgot_password = document.getElementById("form_forgot_password");
const notification = document.getElementById("notification"); // Assuming you have a notification element

form_forgot_password.onsubmit = async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  try {
    const response = await fetch(url + "/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      SuccessNotification("Password reset link sent to your email!");
      notification.textContent = "Password reset link sent to your email!";
    } else {
      const json = await response.json();
      ErrorNotification(json.message);
      notification.textContent = json.message;
    }
  } catch (error) {
    console.error("Network error:", error);
    ErrorNotification("Network error occurred. Please try again later.");
    notification.textContent = "Network error occurred. Please try again later.";
  }
};
