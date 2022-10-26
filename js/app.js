const pokedexOut = document.getElementById('pokedex__toggle')
const pokedex = document.getElementById('pokedexOpen')
function move(){
    pokedex.classList.toggle('pokedex__open')
}

pokedexOut.addEventListener('click', move)

async function loadPokemon(){
    let pokeData = await fetch('https://pokeapi.co/api/v2/pokemon/1')
    pokeData = await pokeData.json()
    console.log(pokeData);
}
/*

.name

.sprites.other.dream_world.front_default
.sprites.front_default img

abilities


*/




loadPokemon()