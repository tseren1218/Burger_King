fetch("https://api.jsonbin.io/v3/b/643c9532ace6f33a220ca072")
    .then((product) => {
        return product.json();
    })
    .then((product) => {
        let result = "";

        product.record.forEach(
            (data) =>
                (result += `<article class="product-item">
                  <img class="product-image" src="${data.name}" alt="${data.name}" height="200">
                  <h2 class="product-title">${data.name}</h2>
                  <h4 class="product-calories">${data.calories}</h4>
                  <h4 class="product-description">${data.description}</h4>
            </article>`)
        );

        console.log(result);

        document.getElementById("product-container").innerHTML = result;
    })
    .catch((error) => console.log(error));
