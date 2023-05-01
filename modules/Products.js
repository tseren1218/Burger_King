import ProductCard from "../components/ProductCard.js";
window.customElements.define("product-card", ProductCard);


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

    render() {
        return `
            <product-card id="${this.id}" 
            imgSrc="${this.image}" 
            imgAlt="${this.name}" 
            productName="${this.name}" 
            productCalories="${this.calories}"
            productDescription="${this.description}">
            </product-card>
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
                                return _productItem.render();
                            })
                            .reduce((prev, curr) => prev + curr + "");
                });
            })
            .catch((error) => console.log(error));
    }
}
