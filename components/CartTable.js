import "./TotalPrice.js"


const priceChangeEvent = new CustomEvent("priceChanged", {
    details: Date.now()
})

class CartTable extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./styles/cart.css">
        <style>
            #cart-table{
                background-color: var(--background-color);
                color: var(--text-color);
            }
        </style>
            <table id="cart-table">
                <thead>
                    <tr>
                        <th colspan="2">Бараа</th>
                        <th>Тоо/Ширхэг</th>
                        <th>Нэгж үнэ</th>
                        <th>Нийт</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        `
    }

    connectedCallback() {
        this.readFromLocalStorage();
    }

    readFromLocalStorage() {
        const productsList = JSON.parse(localStorage.getItem("cart"));
        if (productsList == null) {
            return;
        }
            
        this.shadowRoot.querySelector("tbody").innerHTML = "";
        for (let i = 0; i < productsList.length; i++) {
            
            this.shadowRoot.querySelector("tbody").innerHTML += `
                    <tr>
                        <td>
                            <button class="remove">&times;</button>
                        </td>
                        <td class="name">${productsList[i].name}</td>
                        <td>
                            <button class="decrement">-</button>
                                <span class="quantity">${productsList[i].quantity}</span>
                            <button class="increment">+</button>
                        </td>
                        <td class="price">${productsList[i].price}</td>
                        <td class="total">${parseInt(productsList[i].price) * parseInt(productsList[i].quantity)}₮</td>
                    </tr>
            `
        }
        this.addQuantityButtonListeners();
        this.addRemoveButtonListeners();
        dispatchEvent(priceChangeEvent);
    }

    addQuantityButtonListeners() {
        let decButtons = this.shadowRoot.querySelectorAll(".decrement");
        for (let i = 0; i < decButtons.length; i++) {
            decButtons[i].addEventListener("click", (event) => {
                
                //updating HTML
                let clickedButton = event.target;
                let parentRow = clickedButton.parentElement.parentElement;
                let productName = parentRow.querySelector(".name").innerHTML;
                let productQuantity = parentRow.querySelector(".quantity").innerHTML;
                productQuantity = parseInt(productQuantity);
                parentRow.querySelector(".quantity").innerHTML = productQuantity == 0 ? 0 : productQuantity - 1;

                this.updateLocalStorage(productName, productQuantity, "decrement");
                this.updateRowTotal(parentRow);
                dispatchEvent(priceChangeEvent);
            })

        }
        let incButtons = this.shadowRoot.querySelectorAll(".increment")
        for (let i = 0; i < incButtons.length; i++) {
            incButtons[i].addEventListener("click", (event) => {
                
                // updating HTML
                let clickedButton = event.target;
                let parentRow = clickedButton.parentElement.parentElement;
                let productName = parentRow.querySelector(".name").innerHTML;
                let productQuantity = parentRow.querySelector(".quantity").innerHTML;
                productQuantity = parseInt(productQuantity);
                parentRow.querySelector(".quantity").innerHTML = productQuantity + 1;

                this.updateLocalStorage(productName, productQuantity, "increment");
                this.updateRowTotal(parentRow);
                dispatchEvent(priceChangeEvent);
            })
        }
        
    }

    updateRowTotal(parentRow) {
        let productPrice = parseInt(parentRow.querySelector(".price").innerHTML);
        let productQuantity = parseInt(parentRow.querySelector(".quantity").innerHTML);
        parentRow.querySelector(".total").innerHTML = productPrice * productQuantity + "₮";
    }

    addRemoveButtonListeners() {
        let removeButtons = this.shadowRoot.querySelectorAll(".remove")
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].addEventListener("click", (event) => {
                let clickedButton = event.target;
                let parentRow = clickedButton.parentElement.parentElement;
                let productName = parentRow.querySelector(".name").innerHTML;
                parentRow.remove();
                let productsList = JSON.parse(localStorage.getItem("cart"));
                let position;
                for (let j = 0; j < productsList.length; j++) {
                    if (productsList[j].name == productName) {
                        position = i;
                        break;
                    }
                }
                productsList.splice(position, 1);
                console.log(productsList);
                localStorage.setItem("cart", JSON.stringify(productsList));
                if(productsList.length == 0) {
                    localStorage.removeItem("cart");
                }
                let cart = document.querySelector("cart-component");
                cart.readFromLocalStorage();
                this.readFromLocalStorage();
                dispatchEvent(priceChangeEvent);
            })
        }
    }

    updateLocalStorage(productName, productQuantity, operation) {
        let productsList = JSON.parse(localStorage.getItem("cart"));
            for (let j = 0; j < productsList.length; j++) {
                if (productsList[j].name == productName) {
                    switch (operation) {
                        case "decrement":
                            productsList[j].quantity = productQuantity == 0 ? 0 : productQuantity - 1;
                            break;
                        case "increment":
                            productsList[j].quantity = productQuantity + 1;
                            break;
                        default:
                            break;
                    }
                    
                }
            }
        localStorage.setItem("cart", JSON.stringify(productsList));
    }

}

window.customElements.define("cart-table", CartTable);