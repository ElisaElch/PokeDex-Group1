//On Homepage, fetch and display a list of Pokémon from the PokéAPI.
let allPokemonList = [];
let currentIndex = 0;

const pokemonGrid = document.getElementById("pokemon-grid");
const template = document.getElementById("pokemon-card-template");

function createPokemonCard(pokemon) {
  const card = template.content.cloneNode(true);
  const capitalizedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  card.querySelector("[data-id]").textContent = `#${pokemon.id}`;
  card.querySelector("img").src = pokemon.sprites.front_default;
  card.querySelector("[data-name]").textContent = capitalizedName;

  const hp = pokemon.stats.find((s) => s.stat.name === "hp").base_stat;
  const attack = pokemon.stats.find((s) => s.stat.name === "attack").base_stat;
  card.querySelector("[data-stats]").textContent = `HP ${hp} · ATK ${attack}`;

  const catchBtn = card.querySelector("[data-catch-btn]");

  const caught = JSON.parse(localStorage.getItem("caughtPokemon")) || [];
  const isAlreadyCaught = caught.some((p) => p.id === pokemon.id);

  function markAsCaught(button) {
    button.textContent = "Caught!";
    button.classList.remove("bg-gold", "text-forest");
    button.classList.add("bg-red", "text-cream");
    button.disabled = true;
  }

  if (isAlreadyCaught) {
    markAsCaught(catchBtn);
  }

  catchBtn.addEventListener("click", (event) => {
    catchPokemon(pokemon);
    markAsCaught(event.target);
  });

  return card;
}

function catchPokemon(pokemon) {
  const caught = JSON.parse(localStorage.getItem("caughtPokemon")) || [];

  const alreadyCaught = caught.some((p) => p.id === pokemon.id);
  if (alreadyCaught) {
    return;
  }
  caught.push({
    id: pokemon.id,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    sprite: pokemon.sprites.front_default,
    hp: pokemon.stats.find((s) => s.stat.name === "hp").base_stat,
    atk: pokemon.stats.find((s) => s.stat.name === "attack").base_stat,
    def: pokemon.stats.find((s) => s.stat.name === "defense").base_stat,
    note: "",
  });
  localStorage.setItem("caughtPokemon", JSON.stringify(caught));
}

function loadNextBatch() {
  for (let i = currentIndex; i < currentIndex + 12; i++)
    fetch(allPokemonList[i].url)
      .then((response) => response.json())
      .then((pokemonData) => {
        const card = createPokemonCard(pokemonData);
        pokemonGrid.appendChild(card);
      });
  currentIndex = currentIndex + 12;
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then((response) => response.json())
  .then((data) => {
    allPokemonList = data.results;
    loadNextBatch();
  });

const loadMoreBtn = document.getElementById("load-more-btn");
loadMoreBtn.addEventListener("click", loadNextBatch);

//Add a search bar; on submit (by name or numeric ID), show results/feedback in a dialog.
//
// -------------- S E A R C H  -  S T A R T -----------------------
//

// const baseUrl = 'https://pokeapi.co/api/v2/';
const searchForm = document.querySelector("#SearchForm");
const dialog = document.getElementById("myDialog");
const dialogFailure = document.getElementById("myDialogFailure");

//console.log(dialog);

/*
 * Makes an asynchronous search / fetch of
 * a single Pokemon Object by using PokeAPI
 */
async function getPokemonByNameOrId(pokemonNameOrId) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`,
    );
    const data = await response.json();
    console.log(data);

    // some usefull data suggested by claude
    const newPokemon = {
      id: data.id,
      name: data.name,
      // height: data.height,
      // weight: data.weight,
      // types: data.types.map((t) => t.type.name),
      // abilities: data.abilities.map((a) => a.ability.name),
      // stats: data.stats.map((s) => ({
      // name: s.stat.name,
      // value: s.base_stat,
      // })),
      images: {
        front_default: data.sprites.front_default,
        // back_default: data.sprites.back_default,
        // front_shiny: data.sprites.front_shiny,
        // official_artwork: data.sprites.other["official-artwork"].front_default,
        // dream_world: data.sprites.other.dream_world.front_default,
      },
    };

    return newPokemon;
  } catch (error) {
    openFailure(
      "Nothing Found",
      `The Pokemon with ID or name '${pokemonNameOrId}' could not be found!`,
    );
    //console.error(error);
  }
}

/*
 * Checks if the searchInput is empty and rises an error messag if it is
 */
const searchInputOk = (searchInput) => {
  if (!searchInput) {
    openFailure("Wrong input", "You have to enter at least a name or and ID");
    return false;
  } else {
    return true;
  }
};

/*
 * opens a dialog with the given haeder and msg
 */
const openFailure = (header, msg) => {
  const failerHeader = document.getElementById("failerInputHeader");
  const failerMsg = document.getElementById("failerInputMsg");
  failerHeader.textContent = header;
  failerMsg.textContent = msg;
  dialogFailure.showModal();
};

/*
 * main event listener for the search
 */
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let foundPokemon;

  let searchInput = e.target.elements.searchInput.value;
  console.log("entered Value: " + searchInput);

  if (!searchInputOk(searchInput)) return;

  // radio buttons
  const selected = document.querySelector('input[name="search-mode"]:checked');
  console.log(selected.value); // "searchLocal" or "searchWithPokeAPI"

  if (selected.value === "searchLocal") {
    openFailure("Error", "Local search not yet implemented");
    return;
  } else if (selected.value === "searchWithPokeAPI") {
    console.log("fetchDataFromPokeAPI if ", selected.value);
    foundPokemon = await getPokemonByNameOrId(searchInput);
  } else {
    // this never happens the radios have a default selection. But anway, ho knows...
    openFailure(
      "Wrong Input",
      "You have to select a radio button. (lokal of API)",
    );
  }

  if (!foundPokemon) {
    return;
  }

  // here we are everything should be fine!
  console.log("found Pokemon:", JSON.stringify(foundPokemon));
  showPokemon(foundPokemon);
});

/*
 * enventListener for close failure dialog button
 */
document
  .getElementById("closeDialogFailureBtn")
  .addEventListener("click", () => {
    dialogFailure.close();
  });

/*
 * eventlistener for the close dialog button
 */
document.getElementById("closeBtn").addEventListener("click", () => {
  dialog.close();
});

const fetchPogemonByUrl = async (url) => {
  try {
    console.log("Searched URL", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

function showPokemon(foundPokemon) {

  document.getElementById("dialogResultMsg").textContent =
    `Result for '${foundPokemon.name}'`;

  document.getElementById("dialogPokeName").textContent = foundPokemon.name;
  
  document.getElementById("dialogPokeImg").src =
    foundPokemon.images.front_default;

  dialog.showModal();
}

const fetchDataLocaly = (input) => {
  /*
  console.log("fetchDataLocaly reached");

  let pokeName = "";
  
  for(let poke of allPokemonList) {

    if(poke.name == input) {
      pokeName = poke.name;
      break;
    }
    
  }

  console.log("found poke name: ",pokeName);


  const foundPokemon = allPokemonList.find((pokemon) => pokemon.name == input);

  console.log("found pokemon" ,JSON.stringify(foundPokemon));

  if(!foundPokemon) {
    console.log("pokomon ",input,"notfound");
  }

  //const foundPokemonComplete =  fetchPogemonByUrl(foundPokemon.url);

  return foundPokemonComplete;
*/
};

//
// -------------- S E A R C H  -  E N D -----------------------
//

//Display each Pokémon’s image, name, and stats in a card.
//“Catch” button stores the Pokémon as an object in an array inside localStorage.
