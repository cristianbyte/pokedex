const pokedexOut = document.getElementById('pokedex__toggle')
const pokedex = document.getElementById('pokedexOpen')
function move(){
    pokedex.classList.toggle('pokedex__open')
}

pokedexOut.addEventListener('click', move)