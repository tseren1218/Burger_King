import CardComponent from "../components/CardComponent.js";
window.customElements.define("card-component", CardComponent);

class ProductItem {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.category = item.category;
        this.calories = item.calories;
        this.description = item.description;
        this.price = item.price;
        this.image = item.image;
    }

    render(mode) {
        return `
            <card-component id="${this.id}" 
            mode="${mode}"
            imgSrc="${this.image}" 
            imgAlt="${this.name}" 
            name="${this.name}" 
            calories="${this.calories}"
            description="${this.description}">
            </card-component>
           `;
    }

    // <a role="button" id="${this.id}" class="product-item">
    //               <img class="product-image" src="${this.image}" alt="${this.name}" height="200">
    //               <h2 class="product-title">${this.name}</h2>
    //               <h4 class="product-calories">${this.calories}</h4>
    //         </a>
}

export default class Products {
    constructor(productsUrl, category) {
        this._productsList = [];
        this._productsUrl = productsUrl;
        this._category = category;
    }

    download(targetElement) {
        fetch(this._productsUrl)
            .then((products) => {
                products.json().then((jsob) => {
                    const filteredProducts = jsob.record.filter(
                        (productItem) => {
                            if (this._category == "all") return productItem;
                            else if (
                                productItem.category.includes(this._category)
                            )
                                return productItem;
                        }
                    );

                    document.getElementById(targetElement).innerHTML =
                        filteredProducts
                            .map((productItem) => {
                                const _productItem = new ProductItem(
                                    productItem
                                );
                                this._productsList.push(_productItem);

                                return _productItem.render(document.URL.includes("menu.html") ? "menu-item": "delivery-item");
                            })
                            .reduce((prev, curr) => prev + curr + "");
                });
            })
            .catch((error) => console.log(error));
    }
}
