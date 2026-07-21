//On Homepage, fetch and display a list of Pokémon from the PokéAPI.
//Add a search bar; on submit (by name or numeric ID), show results/feedback in a dialog.

// this is just Test data!!!!
const mockArray = [
  {
    ability: {
      name: "limber",
      url: "https://pokeapi.co/api/v2/ability/7/",
    },
    is_hidden: false,
    slot: 1,
  },
  {
    ability: {
      name: "imposter",
      url: "https://pokeapi.co/api/v2/ability/150/",
    },
    is_hidden: true,
    slot: 3,
  },
  {
    ability: {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/ability/150/",
    },
    is_hidden: true,
    slot: 4,
  }
];

const searchForm = document.querySelector("#SearchForm");
const dialog = document.getElementById("myDialog");
const dialogFailure = document.getElementById("myDialogFailure");

console.log(dialog);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchInput = e.target.elements.searchInput.value;
  console.log("entered Value: "+ searchInput);

  if (!searchInput) {
    dialogFailure.showModal();
    return;
  } 

  dialog.showModal(); // modal, blocks interaction with rest of page
  //dialog.show(); // non-modal version
});


document.getElementById("closeDialogFailureBtn").addEventListener("click", () => {
  dialogFailure.close();
});
document.getElementById("closeBtn").addEventListener("click", () => {
  dialog.close();
});

//Display each Pokémon’s image, name, and stats in a card.
//“Catch” button stores the Pokémon as an object in an array inside localStorage.
