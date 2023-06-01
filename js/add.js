import { createMenu } from "./menu.js";
import { displayMessage } from "./displayMessage.js";
import { getToken } from "./storage.js";
import {productsUrl} from "./api.js";

const token = getToken();

if (!token) {
    location.href = "./login.html";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imagePicker = document.querySelector("#imagePicker");
const featured = document.querySelector("#featured");
const message = document.querySelector(".message-container");
const imageError = document.querySelector(".image-error");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "You must fill in all fields", ".message-container");
    }

    if (imagePicker.files.length === 0) {
        return displayMessage("warning", "You must add an image", ".image-error");
    }

    addProduct(titleValue, priceValue, descriptionValue, featuredValue);
}

async function addProduct(title, price, description, featured) {
    const url = productsUrl;

    const formData = new FormData();

    const file = imagePicker.files[0];

    const data = { title: title, price: price, description: description, featured: featured};

    formData.append("files.image", file, file.name);
    formData.append("data", JSON.stringify(data));

    
    console.log(file);
    console.log(data);

    const options = {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {

        console.log("formData", formData);

        const response = await fetch(url, options);
        const json = await response.json();

        if(json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);
    }
    catch(error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}