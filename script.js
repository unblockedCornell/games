const input = document.querySelector('#search-bar');
const games = document.querySelectorAll('#games a img'); // Updated to fetch images within <a> tags
const suggestions = document.querySelector('#suggestions');

input.addEventListener('input', () => {
    const searchTerm = input.value.toLowerCase();
    suggestions.innerHTML = ''; // Clear previous suggestions

    if (searchTerm.trim() !== '') {
        games.forEach((game) => {
            const parentLink = game.parentElement; // Get the parent <a> element
            if (game.alt.toLowerCase().includes(searchTerm)) {
                const card = document.createElement('a'); // Create an <a> element for the card
                card.classList.add('suggestion-card');
                card.href = parentLink.href; // Use the href from the parent <a>
                card.setAttribute('data-players', 'haha'); // Optional: Add player data if available
                card.innerHTML = `<img src="${game.src}" alt="${game.alt}"><p>${game.alt}</p>`;
                suggestions.appendChild(card); // Add the card to suggestions
            }
        });
    }
});
