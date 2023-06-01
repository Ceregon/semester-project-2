import { baseUrl, productsUrl } from "./api.js";
import { createMenu } from "./menu.js";

createMenu();

async function getProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);

    }
};

const productsContainer = document.querySelector(".products-container");

let productList;

function renderProducts(filteredProducts) {
    productsContainer.innerHTML = "";

    filteredProducts.forEach((product) => {
        productsContainer.innerHTML += `<div class="card">
                                        <a class="product" href="details.html?id=${product.id}">
                                        <h3>${product.title}</h3>
                                        <div class="price">Price: ${product.price}</div>
                                        <div class="img-container"><img src=${baseUrl}${product.image.url}></div>
                                        </div>`
    })
};

function setProductList(products) {
    productList = products;
}

getProducts().then((products) => {
    setProductList(products);
    renderProducts(products);
});

function initSearchField() {
    const search = document.querySelector(".search");

    search.onkeyup = function (event) {
        const noResults = document.querySelector(".no-results");
        const searchValue = event.target.value.trim();

        const filteredProducts = productList.filter(function (product) {
            if (product.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return true;
            }
        });
        if (filteredProducts.length === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
        renderProducts(filteredProducts);
    };
}

initSearchField();