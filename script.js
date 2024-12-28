const input = document.querySelector('#search-bar');
const suggestions = document.querySelector('#suggestions');

let gamesData = [];

// Fetch the JSON data
fetch('games.json')
    .then((response) => response.json())
    .then((data) => {
        gamesData = data; // Store the JSON data in a variable
    })
    .catch((error) => console.error('Error loading games.json:', error));

input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (searchTerm.trim() !== '') {
        // Filter the games data based on the search term
        const filteredGames = gamesData.filter((game) =>
            game.title.toLowerCase().includes(searchTerm)
        );

        // Create suggestion cards for each filtered game
        filteredGames.forEach((game) => {
            const card = document.createElement('a'); // Create an <a> element for the card
            card.classList.add('suggestion-card');
            card.href = "game.html?id="+game.id; // Use the path from the JSON data
            card.setAttribute('data-players', game.data_players); // Add player data if available
            card.innerHTML = `
                <img src="${game.imgpath}" alt="${game.title}">
                <p>${game.title}</p>
            `;
            suggestions.appendChild(card); // Add the card to suggestions
        });
    }
});






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
            card.classList.add('card'); // Add the card class for styling
            card.href = `game.html?id=${game.id}`; // Create a link to the game page

            // Set the card's inner HTML to include an image and title
            card.innerHTML = `
                <img src="${game.imgpath}" alt="${game.title}" />
                <p>${game.title}</p>
            `;

            gamesContainer.appendChild(card); // Add the card to the container
        });
    }
});
