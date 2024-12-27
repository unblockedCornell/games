document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");
  
    fetch("games.json")
      .then((response) => response.json())
      .then((games) => {
        const game = games.find((g) => g.id === gameId);
  
        if (!game) {
          document.body.innerHTML = "<h1>Game not found!</h1>";
          return;
        }
  
        // Populate game content
        document.title = game.title;
        document.getElementById("game-title-heading").innerText = game.title;
        document.getElementById("game-frame").src = game.path;
        document.getElementById("game-category").innerText = game.category || "Unknown";
        document.getElementById("game-instructions").innerText = game.instructions || "No instructions available.";
        document.getElementById("game-data_players").innerText = game.data_players || "N/A";

  
        // Populate related games
        const relatedGamesContainer = document.getElementById("related-games");
        game.related.forEach((relatedId) => {
          const relatedGame = games.find((g) => g.id === relatedId);
          if (relatedGame) {
            const card = document.createElement("div");
            card.className = "card";
            card.setAttribute("data-players", relatedGame.data_players || "N/A players");
            card.innerHTML = `
              <a href="game.html?id=${relatedGame.id}">
                <img src="${relatedGame.imgpath}" alt="${relatedGame.title}">
                <h3>${relatedGame.title}</h3>
                <p>${relatedGame.data_players || "N/A"} players</p>
              </a>
            `;
            relatedGamesContainer.appendChild(card);
          }
        });
      })
      .catch((error) => {
        console.error("Error loading game metadata:", error);
      });
  });
  