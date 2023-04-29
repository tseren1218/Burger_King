import Products from "./Products.js";

var usp = new URLSearchParams(window.location.search);

console.log(usp.toString);

if (!usp.has("category")) {
    const products = new Products(
        "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
        "all"
    );
    products.download("product-container");
}

var products;

switch (usp.get("category")) {
    case "beef":
        products = new Products(
            "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
            "beef"
        );
        products.download("product-container");
        break;
    case "chicken":
        products = new Products(
            "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
            "chicken"
        );
        products.download("product-container");
        break;
    case "set":
        products = new Products(
            "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
            "set"
        );
        products.download("product-container");
        break;
    case "single":
        products = new Products(
            "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
            "single"
        );
        products.download("product-container");
        break;
    case "hachir":
        products = new Products(
            "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
            "hachir"
        );
        products.download("product-container");
        break;
    case "merch":
        products = new Products(
            "https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072",
            "merch"
        );
        products.download("product-container");
        break;
}

const urlParams = new URLSearchParams();

window.onload = () => {
    document.getElementById("beef").addEventListener("click", () => {
        urlParams.set("category", "beef");
        window.location.href = "?" + urlParams.toString();
    });
    document.getElementById("chicken").addEventListener("click", () => {
        urlParams.set("category", "chicken");
        window.location.href = "?" + urlParams.toString();
    });
    document.getElementById("set").addEventListener("click", () => {
        urlParams.set("category", "set");
        window.location.href = "?" + urlParams.toString();
    });
    document.getElementById("single").addEventListener("click", () => {
        urlParams.set("category", "single");
        window.location.href = "?" + urlParams.toString();
    });
    document.getElementById("hachir").addEventListener("click", () => {
        urlParams.set("category", "hachir");
        window.location.href = "?" + urlParams.toString();
    });
    document.getElementById("merch").addEventListener("click", () => {
        urlParams.set("category", "merch");
        window.location.href = "?" + urlParams.toString();
    });
};
