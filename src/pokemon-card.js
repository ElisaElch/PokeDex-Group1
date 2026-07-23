/**
 * pokemon-card.js
 * Builds a single Pokémon card showing image, name, stats, an
 * editable note, and a Release button.
 */

function renderPokemonCard(pokemon, onRelease) {
  const { id, name, sprite, hp, atk, def, note = '' } = pokemon;

  const card = document.createElement('div');
  card.className = 'card p-5 space-y-3 relative';

  // --- favourite star (every card on this page is a favourite) ---
  const star = document.createElement('span');
  star.className = 'absolute top-4 right-4 text-gold text-lg';
  star.textContent = '★';
  card.appendChild(star);

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

  // --- note field ---
  const noteLabel = document.createElement('label');
  noteLabel.className = 'block font-name text-[10px] uppercase tracking-wide text-forest/50 font-bold';
  noteLabel.textContent = 'My note';

  const noteInput = document.createElement('textarea');
  noteInput.className = 'w-full bg-white/60 border border-gold/40 rounded-lg p-2 text-xs font-body font-semibold';
  noteInput.rows = 2;
  noteInput.placeholder = 'Add a note...';
  noteInput.value = note;

  // Save whenever the user finishes editing (loses focus on the textarea).
  // Using 'change' rather than 'input' avoids writing to localStorage on
  // every keystroke.
  noteInput.addEventListener('change', () => {
    updatePokemonNote(id, noteInput.value);
  });

  // --- release button ---
  const releaseBtn = document.createElement('button');
  releaseBtn.className = 'text-xs font-name font-bold text-red';
  releaseBtn.textContent = 'Release';
  releaseBtn.addEventListener('click', () => {
    releasePokemon(id);
    if (typeof onRelease === 'function') onRelease();
  });

  card.append(img, nameLine, statsLine, noteLabel, noteInput, releaseBtn);
  return card;
}