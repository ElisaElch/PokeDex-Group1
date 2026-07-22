//On Homepage, fetch and display a list of Pokémon from the PokéAPI.
let allPokemonList = [];
let currentIndex = 0;


const pokemonGrid = document.getElementById("pokemon-grid")
const template = document.getElementById("pokemon-card-template")

function createPokemonCard(pokemon) {
    const card = template.content.cloneNode(true);
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    card.querySelector("[data-id]").textContent = `#${pokemon.id}`;
    card.querySelector("img").src=pokemon.sprites.front_default;
    card.querySelector("[data-name]").textContent = capitalizedName;

    const hp = pokemon.stats.find(s => s.stat.name === "hp").base_stat;
    const attack = pokemon.stats.find(s => s.stat.name === "attack").base_stat;
    card.querySelector("[data-stats]").textContent = `HP ${hp} · ATK ${attack}`;

    card.querySelector("[data-catch-btn]").addEventListener("click", () => {
        catchPokemon(pokemon);
        event.target.textContent = "Caught!";
        event.target.classList.remove("bg-gold", "text-forest");
        event.target.classList.add("bg-red", "text-cream");
    });

    return card; 
}

function catchPokemon (pokemon) {
    const caught = JSON.parse(localStorage.getItem("caughtPokemon")) || [];

    const alreadyCaught = caught.some(p => p.id === pokemon.id);
    if (alreadyCaught){
        return;
    }
    caught.push(pokemon);
    localStorage.setItem("caughtPokemon", JSON.stringify(caught))
}

function loadNextBatch () {
    for (let i = currentIndex; i< currentIndex + 12; i++)
        fetch(allPokemonList[i].url)
    .then(response => response.json())
    .then(pokemonData => {
        const card = createPokemonCard(pokemonData);
        pokemonGrid.appendChild(card);
    });
    currentIndex = currentIndex + 12; 
}

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
.then(response => response.json())
.then(data => {
    allPokemonList = data.results;
    loadNextBatch();
    }
);

const loadMoreBtn = document.getElementById("load-more-btn")
loadMoreBtn.addEventListener("click", loadNextBatch)

//Add a search bar; on submit (by name or numeric ID), show results/feedback in a dialog.
//Display each Pokémon’s image, name, and stats in a card.
//“Catch” button stores the Pokémon as an object in an array inside localStorage.
