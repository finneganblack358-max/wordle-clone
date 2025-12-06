const newGameButton = document.getElementById("newGame");
if (newGameButton) {
    newGameButton.addEventListener("click", () => {
        const url = newGameButton.dataset.href || "/new_game";
        window.location.href = url;
    });
}