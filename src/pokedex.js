/**
 * Lists favourite Pokémon from localStorage on page load.
 * Shows the empty-state message when nothing has been caught yet.
 */

function renderPokedexPage() {                         
  const grid = document.getElementById('pokedexGrid');    // Get the grid element where Pokémon cards will be displayed.
  const emptyState = document.getElementById('emptyState');  // Get the element that shows when there are no caught Pokémon.
  const countLabel = document.getElementById('caughtCount');  // Get the element that displays the count of caught Pokémon.
  const caught = getCaughtPokemon();                           // Retrieve the list of caught Pokémon from localStorage.
 

  countLabel.textContent = `${caught.length} caught`; // Update the count label to show how many Pokémon have been caught.

  if (caught.length === 0) {                // If there are no caught Pokémon, show the empty state message and hide the grid.
    emptyState.classList.remove('hidden');   // Show the empty state message.
    grid.classList.add('hidden');            // Hide the grid of Pokémon cards.
    return;
  }
 
  emptyState.classList.add('hidden');    // Hide the empty state message since there are caught Pokémon.
  grid.classList.remove('hidden');       // Show the grid of Pokémon cards.
  grid.replaceChildren();                // clear before re-rendering, avoids duplicate cards
  
 caught.forEach(pokemon => {             // For each caught Pokémon, create a card and append it to the grid.
    const card = renderPokemonCard(pokemon);  // Create a card for the Pokémon using the renderPokemonCard function.
    grid.appendChild(card);                   // Append the created card to the grid.
  });
}
 
document.addEventListener('DOMContentLoaded', renderPokedexPage);  // When the DOM is fully loaded, call renderPokedexPage to display the caught Pokémon.