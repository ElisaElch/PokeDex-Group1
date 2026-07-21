
/*
 * Task 3: Render the caught Pokémon grid dynamically + wire up the counter
 * Task 4: Toggle empty state when nothing has been caught yet
 * Depends on:
 *  - pokemon-storage.js  (getCaughtPokemon, setCaughtPokemon)
 *  - pokemon-card.js     (renderPokemonCard)
 * Expects these elements in pokedex.html:
 *  - #pokedexGrid   (grid container the cards get appended to)
 *  - #emptyState    (hidden by default, shown when nothing is caught)
 *  - #caughtCount   (text node showing "X caught")
 */

function renderPokedexPage() {
  const grid = document.getElementById('pokedexGrid');
  const emptyState = document.getElementById('emptyState');
  const countLabel = document.getElementById('caughtCount');

  const caught = getCaughtPokemon();

  // --- update the counter ---
  countLabel.textContent = `${caught.length} caught`;

  // --- toggle empty state vs grid ---
  if (caught.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    grid.replaceChildren(); // clear out any stale cards
    return;
  }

  grid.classList.remove('hidden');
  emptyState.classList.add('hidden');

  // --- render each caught Pokémon as a card ---
  grid.replaceChildren(); // clear before re-rendering, avoids duplicates

  caught.forEach(pokemon => {
    const card = renderPokemonCard(pokemon, handleRelease);
    grid.appendChild(card);
  });
}

/*
 * Called when a card's Release button is clicked.
 * Removes that Pokémon from localStorage, then re-renders the page
 * so the grid, empty state, and counter all stay in sync.
 * @param {number} id - the Pokédex id of the Pokémon to release
 */
function handleRelease(id) {
  const updated = getCaughtPokemon().filter(p => p.id !== id);
  setCaughtPokemon(updated);
  renderPokedexPage();
}

// Render as soon as the page loads
document.addEventListener('DOMContentLoaded', renderPokedexPage);