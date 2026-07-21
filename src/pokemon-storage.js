//Pokédex page lists favourite Pokémon from localStorage, showing image, name, stats.
//Allow adding notes to each Pokémon; persist the note on the same object in localStorage.
/**
 * Task 1: Read caught Pokémon from localStorage
 * Data shape (one entry per caught Pokémon):
 * {
 *   id: 25,                    // Pokédex number
 *   name: "Pikachu",
 *   sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
 *   hp: 35,
 *   atk: 55,
 *   def: 40,
 *   note: "",                  // user's personal note, editable
 *   favourite: true            // shows the gold star
 * }
 *
 * This matches what the Homepage "Catch" button should write when a
 * Pokémon is caught (see task 9: verify against Homepage catch flow).
 */
 const STORAGE_KEY = 'caughtPokemon';
 /*
 * Reads the caught Pokémon list from localStorage.
 * Falls back to an empty array if the key is missing, empty,
 * or contains invalid/corrupted JSON — so the page never crashes.
 * @returns {Array<Object>} array of caught Pokémon objects
 */
function getCaughtPokemon(){
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (! raw) return [];
    const parsed = JSON.parse(raw);
    // Guard against corrupted data that isn't actually an array
   if (!Array.isArray(parsed)) {
      console.warn('caughtPokemon in localStorage was not an array. Resetting to empty.');
      return [];
    }
      // Filter out any malformed entries missing required fields
      return parsed.filter(p => p && typeof p.id !== 'undefined' && typeof p.name === 'string' && typeof p.sprite === 'string');

    } catch (err) {
     console.warn('Could not parse caughtPokemon from localStorage:', err);
    return [];
  }
}
/*
 * Overwrites the full caught Pokémon list in localStorage.
 * Used by catch/release/note-editing features (later tasks),
 * included here so the read/write logic for this key lives in one place.
 * @param {Array<Object>} list
 */
function setCaughtPokemon(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        return true;
    } catch (err) {
        console.error('Could not save caughtPokemon to localStorage:', err);
        return false;
    }
}
/*
 * Convenience helper: how many Pokémon are currently caught.
 * Used for the "X caught" counter in the page header.
 * @returns {number}
 */
function getCaughtCount() {
    return getCaughtPokemon().length;
}