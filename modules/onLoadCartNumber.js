let quantityForSpan = localStorage.getItem("totalQuantity");
quantityForSpan = parseInt(quantityForSpan);
document.getElementsByClassName("cart-number")[0].innerHTML = isNaN(quantityForSpan) ? 0 : quantityForSpan;

 


 
    


