import { productsUrl } from "./api.js";
import { displayMessage } from "./displayMessage.js";
import { createMenu } from "./menu.js";
import { getToken } from "./storage.js";
import { deleteButton } from "./delete.js";

const token = getToken();

if (!token) {
    location.href = "./login.html";
}

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if(!id) {
    document.location.href = "/";
}

const url = productsUrl + "/" + id;
const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const imageUpload = document.querySelector("#imageUpload");
const featured = document.querySelector("#featured");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function() {
    try {
        const response = await fetch(url);
        const details = await response.json();

        title.value = details.title;
        price.value = details.price;
        description.value = details.description;
        featured.checked = details.featured;
        idInput.value = details.id;

        deleteButton(details.id);

        console.log(details);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        loading.style.display = "none";
        form.style.display = "block";
    }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const featuredValue = featured.checked;
    const idValue = idInput.value;

    if(titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
        return displayMessage("warning", "You must fill in all fields", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, featuredValue, idValue);
}

async function updateProduct(title, price, description, featured, id) {

    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured});

    const formData = new FormData();

    if (imageUpload.files.length !== 0) {
        const file = imageUpload.files[0];

        formData.append("files.image", file, file.name);
    }

    
    formData.append("data", data);

    const options = {
        method: "PUT",
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json);

        if(json.updated_at) {
            displayMessage("success", "Product updated", ".message-container");
        }

        if(json.error) {
            displayMessage("error", json.message, ".message-container");
        }
    }
    catch(error) {
        console.log(error);
    }
}