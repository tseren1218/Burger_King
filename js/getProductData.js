async function getProductData() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    const response = await fetch('https://tseren1218.github.io/Burger_King/data/products.json');
    const products = await response.json();
    
    if (category) {
      const filteredProducts = products.filter(product => product.category === category);
      return filteredProducts;
    }
    
    return products;
  }
  
  export default getProductData;
  