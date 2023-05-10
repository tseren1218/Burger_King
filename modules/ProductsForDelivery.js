import CardComponent from "../components/CardComponent.js";
window.customElements.define("card-component", CardComponent);

class ProductItem {
    constructor(item) {
        this.name = item.name;
        this.category = item.category;
        this.calories = item.calories;
        this.description = item.description;
        this.price = item.price;
        this.image = item.image;
    }

    render() {
        return `
            <card-component id="${this.id}"
            mode="delivery-item" 
            imgSrc="${this.image}" 
            imgAlt="${this.name}" 
            name="${this.name}" 
            calories="${this.calories}"
            description="${this.description}"
            price="${this.price}">
            </card-component>
           `;
    }
}

export default class ProductsForDelivery {
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
                                return _productItem.render();
                            })
                            .reduce((prev, curr) => prev + curr + "");
                });
            })
            .catch((error) => console.log(error));
    }
}