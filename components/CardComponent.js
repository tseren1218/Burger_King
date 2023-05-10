import PopUp from "../modules/PopUp.js"

const menuTemplate = document.createElement("template");
menuTemplate.innerHTML = `
                <link rel="stylesheet" href="./styles/menu.css"/>
                  <a role="button" class="grid-item">
                        <section>
                              <img>
                              <h2 class="grid-item-title"></h2>
                        </section>
                  </a>
`

const menuItemTemplate = document.createElement("template");
menuItemTemplate.innerHTML = `
            <link rel="stylesheet" href="./styles/menu.css"/>
            <article role="button" id="" class="product-item">
                <div id="item-section">
                    <img class="product-image" height="200">
                    <h2 class="product-title"></h2>
                    <h4 class="product-calories"></h4>
                    <p class="product-description"></p>
                </div>
            </article>
`;

const deliveryItemTemplate = document.createElement("template");
deliveryItemTemplate.innerHTML = `
            <link rel="stylesheet" href="./styles/delivery.css"/>
            <article class="delivery-item">
                <div id="item-section">
                  <img class="card-image" height="200">
                  <h2 class="delivery-title"></h2>
                  <h4 class="delivery-calories"></h4>
                  <hr>
                  <p class="price"></p>
                </div>
                  <a role="button" class="order-button" id="order-button">Сагсанд хийх</a>
            </article>
`

class CardComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        switch (this.getAttribute("mode")) {
            case "menu":
                this.shadowRoot.appendChild(menuTemplate.content.cloneNode(true));
                break;
            case "menu-item":
                this.shadowRoot.appendChild(menuItemTemplate.content.cloneNode(true));
                break;
            case "delivery-item":
                this.shadowRoot.appendChild(deliveryItemTemplate.content.cloneNode(true));
                break;
            default:
                break;
        }
    }

    connectedCallback() {
        if (this.getAttribute("mode") == "menu-item" || this.getAttribute("mode") == "delivery-item") {
                
            this.shadowRoot.getElementById("item-section").addEventListener("click", () => {
            
            this.insertAdjacentHTML("afterend", `
            <link id="style" rel="stylesheet" href="./styles/deliveryItemStyle.css">
            <div class="modal active" id="modal">
                <div class="modal-body">
                    <button data-close-button class="close-button" id="close-button">&times;</button>
                    <img src="${this.getAttribute("imgSrc")}" alt="${this.getAttribute("imgAlt")}"class="product-image" height="200">
                    <h2 class="product-title">${this.getAttribute("name")}</h2>
                    <h4 class="product-calories">${this.getAttribute("calories")}</h4> 
                    <p class="product-description">${this.getAttribute("description")}</p>
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
    }

    static get observedAttributes() {
        return ["id", "imgSrc", "imgAlt", "name", "calories", "description", "price", "mode", "id"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (this.getAttribute("mode")) {
            case "menu":
                this.shadowRoot.querySelector("a").id = this.getAttribute("id");
                this.shadowRoot.querySelector("a section img").src = this.getAttribute("imgSrc");
                this.shadowRoot.querySelector("a section img").alt = this.getAttribute("name");
                this.shadowRoot.querySelector("a section h2").innerHTML = this.getAttribute("name");

                break;
            case "menu-item":
            case "delivery-item":
                this.shadowRoot.querySelector("article div img").id = this.getAttribute("id");
                this.shadowRoot.querySelector("article div img").src = this.getAttribute("imgSrc");
                this.shadowRoot.querySelector("article div img").alt = this.getAttribute("imgAlt");
                this.shadowRoot.querySelector("article div h2").innerHTML = this.getAttribute("name");
                this.shadowRoot.querySelector("article div h4").innerHTML = this.getAttribute("calories");  
                break;
            default:
                break;
        }

        // this.shadowRoot.querySelector(".delivery-item #delivery-item-section .delivery-image").id = this.getAttribute("id");
        // this.shadowRoot.querySelector(".delivery-item #delivery-item-section .delivery-image").src = this.getAttribute("imgSrc");
        // this.shadowRoot.querySelector(".delivery-item #delivery-item-section .delivery-image").alt = this.getAttribute("imgAlt");
        // this.shadowRoot.querySelector(".delivery-item #delivery-item-section .delivery-title").innerHTML = this.getAttribute("name");
        // this.shadowRoot.querySelector(".delivery-item #delivery-item-section .delivery-calories").innerHTML = this.getAttribute("productCalories");
        // this.shadowRoot.querySelector(".delivery-item #delivery-item-section .price").innerHTML = this.getAttribute("productPrice");
    }   
}

export default CardComponent;
