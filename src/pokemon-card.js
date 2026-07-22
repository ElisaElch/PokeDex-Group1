/**
 * pokemon-card.js
 * Builds a single Pokémon card showing image, name, and stats.
 */

function renderPokemonCard(pokemon) {
  const { name, sprite, hp, atk, def } = pokemon;

  const card = document.createElement('div');
  card.className = 'card p-5 space-y-3';

  const img = document.createElement('img');
  img.src = sprite;
  img.alt = name;
  img.className = 'h-16';

  const nameLine = document.createElement('p');
  nameLine.className = 'font-name text-lg font-extrabold';
  nameLine.textContent = name;

  const statsLine = document.createElement('p');
  statsLine.className = 'text-[10px] font-extrabold text-forest/60';
  statsLine.textContent = `HP ${hp} · ATK ${atk} · DEF ${def}`;

  card.append(img, nameLine, statsLine);
  return card;
}