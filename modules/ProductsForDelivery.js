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
        return `<article class="delivery-item">
                  <img class="delivery-image" src="${this.image}" alt="${this.name}" height="200">
                  <h2 class="delivery-title">${this.name}</h2>
                  <h4 class="delivery-calories">${this.calories}</h4>
                  <hr>
                  <p class="price">${this.price}</p>
                  <a href="" class="order-button">Сагсанд хийх</a>
            </article>`;
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