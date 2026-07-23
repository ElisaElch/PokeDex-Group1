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

const STORAGE_KEY = 'caughtPokemon';

function getCaughtPokemon() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  return JSON.parse(raw);
}