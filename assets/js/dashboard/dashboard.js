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