import { getUsername } from "./storage.js";
import { logoutButton } from "./logout.js";

export function createMenu() {

    const {pathname} = document.location;
    const username = getUsername();
    console.log(username);
    const container = document.querySelector(".menu-container");

    let authLink = `<a href="./login.html" class="${pathname === "/login.html" ? "active" : ""}">Log in</a>`;

    if(username) {
        authLink = `<a href="./admin.html" class="${pathname === "/admin.html" ? "active" : ""}">Admin</a>
                    <button id="logout">Log out</button>`;
    }

    container.innerHTML = `<div class="menu">
                                <a href="./index.html" class="${pathname === "/index.html" ? "active" : ""}">Home</a>
                                <a href="./products.html" class="${pathname === "/products.html" ? "active" : ""}">Products</a>
                                <a href="./cart.html" class="${pathname === "/cart.html" ? "active" : ""}">Cart</a>
                                ${authLink}                            
                                </div>`;

    logoutButton();
}