export default class PopUp{
    constructor(){}

    close() {
        const closeModalButton = document.getElementById("close-button")
        closeModalButton.addEventListener("click", () => {
            document.getElementById("style").remove();
            document.getElementById("modal").remove();
            document.getElementById("overlay").remove();
        });

}
}


