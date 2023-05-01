const template = document.createElement("template");

template.innerHTML = `
            <link rel="stylesheet" href="../../styles/menu.css"/>
            <a role="button" id="" class="product-item">
                  <img class="product-image" height="200">
                  <h2 class="product-title"></h2>
                  <h4 class="product-calories"></h4>
            </a>
`;

class ProductCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["id", "imgSrc", "imgAlt", "productName", "productCalories"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector("a img").id = this.getAttribute("id");
        this.shadowRoot.querySelector("a img").src = this.getAttribute("imgSrc");
        this.shadowRoot.querySelector("a img").alt = this.getAttribute("imgAlt");
        this.shadowRoot.querySelector("a h2").innerHTML = this.getAttribute("productName");
        this.shadowRoot.querySelector("a h4").innerHTML = this.getAttribute("productCalories");        
    }   
}

export default ProductCard
