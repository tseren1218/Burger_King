import PopUp from "../modules/PopUp.js"

const template = document.createElement("template");

template.innerHTML = `
            <link rel="stylesheet" href="./../styles/menu.css"/>
            <a role="button" id="" class="product-item">
                  <img class="product-image" height="200">
                  <h2 class="product-title"></h2>
                  <h4 class="product-calories"></h4>
                  <p class="product-description"></p>
            </a>
`;

class ProductCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["id", "imgSrc", "imgAlt", "productName", "productCalories", "productDescription"];
    }

    connectedCallback() {
        this.addEventListener("click", () => {
            this.insertAdjacentHTML("afterend", `
            <link id="style" rel="stylesheet" href="./../styles/productCardStyle.css">
            <div class="modal active" id="modal">
                <div class="modal-body">
                    <button data-close-button class="close-button" id="close-button">&times;</button>
                    <img src="${this.getAttribute("imgSrc")}" alt="${this.getAttribute("imgAlt")}"class="product-image" height="200">
                    <h2 class="product-title">${this.getAttribute("productName")}</h2>
                    <h4 class="product-calories">${this.getAttribute("productCalories")}</h4>
                    <p class="product-description">${this.getAttribute("productDescription")}</p>
                </div>
            </div>
            <div class="active" id="overlay"></div>
            `
            );
            const popUp = new PopUp();
            popUp.close();
        }
        )
        
      
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
