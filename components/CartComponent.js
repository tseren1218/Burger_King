class CartComponent extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
                <article id="cart-container">
                    <table id="cart-table">
                        <tr>
                            <th>Бараа</th>
                            <th>Тоо/ширхэг</th>
                            <th>Үнэ</th>
                            <th>Нийт</th>
                        </tr>
                        <div class="product-section"></div>
                    </table>
                </article>
                
                <style>
                    #cart-container {
                        display: flex;
                        justify-content: center;
                    }
                </style>
        `;
        
    }

    static get observedAttributes() {
        return ["json"];
    }

}

customElements.define("cart-component", CartComponent);

