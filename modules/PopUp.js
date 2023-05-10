export default class PopUp{
    constructor() { }
    
    content() {
        return `
            <link id="style" rel="stylesheet" href="./styles/deliveryItemStyle.css">
            <div class="modal active" id="modal">
                <div class="modal-body">
                    <button data-close-button class="close-button" id="close-button">&times;</button>
                    <img src="${this.getAttribute("imgSrc")}" alt="${this.getAttribute("imgAlt")}"class="product-image" height="200">
                    <h2 class="product-title">${this.getAttribute("name")}</h2>
                    <h4 class="product-calories">${this.getAttribute("calories")}</h4> 
                    <p class="product-description">${this.getAttribute("description")}</p>
                </div>
            </div>
            <div class="active" id="overlay"></div>
            `
    }

    close() {
        const closeModalButton = document.getElementById("close-button")
        closeModalButton.addEventListener("click", () => {
            document.getElementById("style").remove();
            document.getElementById("modal").remove();
            document.getElementById("overlay").remove();
        });
    
    

}
}


