(() => {
    const input = document.querySelector('#search-bar');
    const suggestions = document.querySelector('#suggestions');

    // Encapsulate `gamesData` in this script's scope
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
                card.href = "game.html?id=" + game.id; // Use the path from the JSON data
                card.setAttribute('data-players', game.data_players); // Add player data if available
                card.innerHTML = `
                    <img src="${game.imgpath}" alt="${game.title}">
                    <p>${game.title}</p>
                `;
                suggestions.appendChild(card); // Add the card to suggestions
            });
        }
    });
})();
