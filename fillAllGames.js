document.addEventListener('DOMContentLoaded', () => {
    const gamesContainer = document.getElementById('games');

    let gamesData = [];

    // Fetch the JSON data
    fetch('games.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            gamesData = data; // Store the JSON data
            populateGames(data); // Populate the games dynamically
        })
        .catch((error) => console.error('Error loading games.json:', error));

    // Function to populate games dynamically
    function populateGames(data) {
        gamesContainer.innerHTML = ''; // Clear existing content

        data.forEach((game) => {
            const card = document.createElement('a'); // Create an anchor element
            card.href = `game.html?id=${game.id}`; // Create a link to the game page

            // Set the card's inner HTML to include an image and title
            card.innerHTML = `
              <div class="card" data-players="${game.data_players}">
                <img src="${game.imgpath}" alt="${game.title}">
                <h3>${game.title}</h3>
              </div>
            `;

            gamesContainer.appendChild(card); // Add the card to the container
        });
    }
});
