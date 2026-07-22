/**
 * pokemon-storage.js
 * Reads the list of favourite/caught Pokémon from localStorage.
 *
 * Expected data shape (array of objects):
 * {
 *   id: 25,
 *   name: "Pikachu",
 *   sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
 *   hp: 35,
 *   atk: 55,
 *   def: 40
 * }
 */

const STORAGE_KEY = 'caughtPokemon';                   // localStorage key for the list of caught Pokémon

function getCaughtPokemon() {                        // Returns the list of caught Pokémon from localStorage, or an empty array if none are stored.
  const raw = localStorage.getItem(STORAGE_KEY);    // Get the raw JSON string from localStorage
  if (!raw) return [];                             // If nothing is stored, return an empty array
  return JSON.parse(raw);                        // Parse the JSON string into a JavaScript array and return it
}
function setCaughtPokemon(list) {                // Saves the list of caught Pokémon to localStorage as a JSON string.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));  // Convert the list to a JSON string and store it in localStorage
}
/*
 * Updates the note on a single caught Pokémon, identified by id,
 * and persists the full list back to localStorage.
 * Leaves every other field on the object untouched.
 * @param {number} id - the Pokédex id of the Pokémon being edited
 * @param {string} note - the new note text
 */
function updatePokemonNote(id, note) {                   // Updates the note for a specific Pokémon in the caught list
  const caught = getCaughtPokemon();                     // Get the current list of caught Pokémon from localStorage
  const updated = caught.map(pokemon =>                  // Create a new array with the updated note for the specified Pokémon
    pokemon.id === id ? { ...pokemon, note } : pokemon   // If the Pokémon's id matches, return a new object with the updated note; otherwise, return the original Pokémon object   
  );
  setCaughtPokemon(updated);                              // Save the updated list back to localStorage
}
