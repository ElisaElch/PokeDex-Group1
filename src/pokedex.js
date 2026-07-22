/**
 * Lists favourite Pokémon from localStorage on page load.
 */

function renderPokedexPage() {
  const grid = document.getElementById('pokedexGrid');
  const emptyState = document.getElementById('emptyState');
  const caught = getCaughtPokemon();
 
  if (caught.length === 0) {
    emptyState.classList.remove('hidden');
    grid.classList.add('hidden');
    return;
  }
 
  emptyState.classList.add('hidden');
  grid.classList.remove('hidden');
 
  caught.forEach(pokemon => {
    const card = renderPokemonCard(pokemon);
    grid.appendChild(card);
  });
}
 
document.addEventListener('DOMContentLoaded', renderPokedexPage);