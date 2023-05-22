import Products from "./Products.js";

var usp = new URLSearchParams(window.location.search);
const uri = "https://burgerkingmongodb.onrender.com/products";

if (!usp.has("category")) {
    const products = new Products(
        uri,
        "all"
    );
    products.download("product-container");
}

var products;

switch (usp.get("category")) {
    case "beef":
        products = new Products(
            uri,
            "beef"
        );
        products.download("product-container");
        document.getElementById("page-title").textContent = "Үхэр";
        break;
    case "chicken":
        products = new Products(
            uri,
            "chicken"
        );
        products.download("product-container");
        document.getElementById("page-title").textContent = "Тахиа";
        break;
    case "set":
        products = new Products(
            uri,
            "set"
        );
        products.download("product-container");
        document.getElementById("page-title").textContent = "Багц";
        break;
    case "single":
        products = new Products(
            uri,
            "single"
        );
        products.download("product-container");
        document.getElementById("page-title").textContent = "Дан ";
        break;
    case "hachir":
        products = new Products(
            uri,
            "hachir"
        );
        products.download("product-container");
        document.getElementById("page-title").textContent = "Хачир";
        break;
    case "merch":
        products = new Products(
            uri,
            "merch"
        );
        products.download("product-container");
        document.getElementById("page-title").textContent = "Мерчендайз";
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
