const pokedex = document.getElementById('pokedex__toggle')

function move(){
    pokedex.classList.toggle('pokedex__open')
}

pokedex.addEventListener('click', move)