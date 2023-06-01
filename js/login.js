import { baseUrl } from "./api.js";
import { displayMessage } from "./displayMessage.js";
import { saveToken, saveUser } from "./storage.js";
import { createMenu } from "./menu.js";

const form = document.querySelector("#loginForm");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

createMenu();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "You must enter both username and password", ".message-container");
    }

    doLogin(usernameValue, passwordValue);
};

async function doLogin(username, password) {

    const url = baseUrl + "/auth/local";

    const data = JSON.stringify({identifier: username, password: password});

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if(json.error) {
            displayMessage("warning", "Invalid username and/or password. Remember that both fields are case sensitive", ".message-container");
        }

        if(json.user) {

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "./admin.html";
        }

    } 
    catch(error) {
        console.log(error);
    }
}