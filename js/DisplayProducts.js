import products from "../json/products.json" assert { type: "json" };

function productTemplate(product) {
    return `
    
            <article class="product-item">
                  <img class="product-image" src="${product.image}" alt="${product.name}" height="200">
                  <h2 class="product-title">${product.name}</h2>
                  <h4 class="product-calories">${product.calories}</h4>
                  <h4 class="product-description">${product.description}</h4>
            </article>

    `;
}

document.getElementById("product-container").innerHTML += `
    ${products.map(productTemplate).join("")}
`;
