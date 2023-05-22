let totalQuantity = 0;
for (let i = 0; i < localStorage.length; i++) {
    totalQuantity += parseInt(localStorage.getItem(localStorage.key(i)));
    document.getElementsByClassName("cart-number")[0].innerHTML = totalQuantity;
} 