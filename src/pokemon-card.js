
/*
 * pokemon-card.js
 * Task 2: Builds a single caught-Pokémon card as a real DOM element.
 * @param {Object} pokemon - one entry from getCaughtPokemon()
 * @param {Function} [onRelease] - called with the pokemon's id when Release is clicked
 * @returns {HTMLElement} the card element, ready to append to the grid
 */
function renderPokemonCard (pokemon,onRelease) {
    const {
    id,
    name,
    sprite,
    hp = '—',
    atk = '—',
    def = '—',
    note = '',
    favourite = false,
  } = pokemon;
  const paddedId = String(id).padStart(3, '0');
   // --- card container ---
   const card = document.createElement('div');
   card.className = 'pokemon-card';
   card.dataset.pokemonId = id;

    // --- gold star (favourite marker) ---
   if (favourite) {
      const star = document.createElement('span');
    star.className = 'absolute top-4 right-4 text-gold text-lg';
    star.textContent = '★';
    card.appendChild(star);
    
     // --- top row: sprite + info ---
  const topRow = document.createElement('div');
  topRow.className = 'flex gap-4';
 
  const spriteBox = document.createElement('div');
  spriteBox.className = 'h-20 w-20 bg-white/50 rounded-lg flex items-center justify-center shrink-0';
 
  const img = document.createElement('img');
  img.src = sprite;
  img.alt = name;
  img.className = 'h-16';
  img.addEventListener('error', () => {
    const fallback = document.createElement('span');
    fallback.className = 'text-3xl text-forest/30';
    fallback.textContent = '❓';
    img.replaceWith(fallback);
  }, { once: true });
  spriteBox.appendChild(img);
 
  const info = document.createElement('div');
 
  const idLine = document.createElement('p');
  idLine.className = 'text-[10px] font-bold text-forest/40';
  idLine.textContent = `#${paddedId}`;
 
  const nameLine = document.createElement('p');
  nameLine.className = 'font-name text-lg font-extrabold';
  nameLine.textContent = name;
 
  const statsLine = document.createElement('p');
  statsLine.className = 'text-[10px] font-extrabold text-forest/60';
  statsLine.textContent = `HP ${hp} · ATK ${atk} · DEF ${def}`;
 
  info.append(idLine, nameLine, statsLine);
  topRow.append(spriteBox, info);
 
  // --- note field ---
  const noteLabel = document.createElement('label');
  noteLabel.className = 'block font-name text-[10px] uppercase tracking-wide text-forest/50 font-bold';
  noteLabel.textContent = 'My note';
 
  const noteInput = document.createElement('textarea');
  noteInput.className = 'w-full bg-white/60 border border-gold/40 rounded-lg p-2 text-xs font-body font-semibold';
  noteInput.rows = 2;
  noteInput.placeholder = 'Add a note...';
  noteInput.value = note; // .value, not textContent — safe from injection either way
 
  // --- release button ---
  const releaseBtn = document.createElement('button');
  releaseBtn.className = 'text-xs font-name font-bold text-red';
  releaseBtn.textContent = 'Release';
  releaseBtn.addEventListener('click', () => {
    if (typeof onRelease === 'function') onRelease(id);
  });
 
  card.append(topRow, noteLabel, noteInput, releaseBtn);
 
  return card;
}
 
  }