
class TotalPrice extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                .total-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .confirm {
                    background-color: red;
                    color: #ffefdc;
                    border-style: none;
                    border-radius: 25px;
                    padding: 5% 15%;
                    font-size: 1.5em;
                    cursor: pointer;
                    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                    transition-duration: 200ms;
                }
                .confirm:hover {
                    background-color: darkred;
                    transition-duration: 200ms;
                    transform: scale(1.05);
                }
            </style>
            <div class="total-container">
                <h2>Нийт үнэ: <span class="grand-total"></span></h2>
                <button class="confirm">Захиалах</button>
            </div>
        `
    }

    connectedCallback() {
        this.listenToCustomEvent();
        this.listenToButtonEvent();
    }

    listenToCustomEvent() {
        addEventListener("priceChanged", () => {
            console.log("hi");
            let productsList = JSON.parse(localStorage.getItem("cart"));
            if (productsList == null) {
                this.shadowRoot.querySelector(".grand-total").innerHTML = "0₮";
                return;
            }
            let total = 0;
            for (let i = 0; i < productsList.length; i++) {
                total += parseInt(productsList[i].price) * parseInt(productsList[i].quantity);
            }
            this.shadowRoot.querySelector(".grand-total").innerHTML = total + "₮";   
        })
    }

    listenToButtonEvent() {
        this.shadowRoot.querySelector(".confirm").addEventListener("click", () => {
            let productsList = JSON.parse(localStorage.getItem("cart"));
            if (productsList == null) {
                alert("Сагс хоосон байна!");
                return;
            }
                
            let totalQuantity = 0;
            productsList.forEach(element => {
                totalQuantity += element.quantity;
            });
            totalQuantity == 0 ? alert("Сагс хоосон байна!") : alert("Амжилттай");
        })
    }
}

window.customElements.define("total-price", TotalPrice)