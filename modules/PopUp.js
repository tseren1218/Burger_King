export default class PopUp{
    constructor(){}

    close() {
        const closeModalButton = document.getElementById("close-button")
        closeModalButton.addEventListener("click", () => {
            const link = document.getElementById("style")
            link.remove();
            const modal = document.getElementById("modal");
            modal.remove();
            const overlay = document.getElementById("overlay")
            overlay.remove();
        });

}
}


