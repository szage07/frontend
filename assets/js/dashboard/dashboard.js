"use strict";

import {url, SuccessNotification,ErrorNotification } from "../utils/utils.js";

const logout_btn = document.getElementById("logout_btn");

logout_btn.onclick = async() => {

    const response = await fetch(url + "/api/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " +   localStorage.getItem("token"),
         //   localStorage.setItem("token", json.token);
        },
      
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        
        localStorage.clear();
    
        
        window.location.pathname = "assets/index.html";
  
     
          
        } else {
            const json = await response.json();
            alert(json.message);
        }
      } 
//access user profile api endpoint
getLoggedUser();
async function getLoggedUser(){

    const response = await fetch(url + "/api/profile/show", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " +   localStorage.getItem("token"),
         //   localStorage.setItem("token", json.token);
        },
      
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);


        document.getElementById("user_logged").innerHTML = 
                json.firstname + " " + json.lastname;
        } else {
          console.log(json);
            const json = await response.json();
            alert(json.message);
            ErrorNotification(json.message)
        }
      } 
      
      