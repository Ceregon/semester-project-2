import { baseUrl, productsUrl, bannerUrl } from "./api.js";
import { createMenu } from "./menu.js";


createMenu();

(async function () {
    const container = document.querySelector(".hero-banner");

    try {
        const response = await fetch(bannerUrl);
        const json = await response.json();

        console.log(json);
        container.innerHTML = "";
        container.innerHTML += `<img class="banner-img" src=${baseUrl}${json.hero_banner.url}>`;
        

    } catch (error) {
        console.log(error);
    }
})();

async function getFeatured() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();
        console.log(products);

        const featuredContainer = document.querySelector(".featured-container");
        featuredContainer.innerHTML = "";

        products.forEach((product) => {

            if (product.featured === true) {
                featuredContainer.innerHTML += `<div class="card">
                <a class="featured-product" href="details.html?id=${product.id}">
                <img src=${baseUrl}${product.image.url}>
                <h3>${product.title}</h3>
                <div>Price: ${product.price}</div>
                <button>More info</button>
                </div>`;
            } 
        });

        return products;

    } catch (error) {
        console.log(error);
    }
    
};

getFeatured();
