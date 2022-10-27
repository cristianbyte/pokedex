const pokedexOut = document.getElementById('pokedex__toggle')
const pokedex = document.getElementById('pokedexOpen')
function move(){
    pokedex.classList.toggle('pokedex__open')
}
pokedexOut.addEventListener('click', move)

function capitalize(word) {return word[0].toUpperCase() + word.slice(1);}

const pokedex__window = document.getElementsByClassName('dataPokemon')
let pokedexPrincipalImg = document.getElementsByTagName('img')
const tecladoPokedex = document.getElementsByClassName('pokedex__2-buttons')[0]
let pokedex__window2Info = document.getElementsByClassName('pokedex__2-window--down')[0]
let numberForSearching = ''

tecladoPokedex.addEventListener('click',(e)=>{
    datos = {
        w_element_s:e.target.clientWidth,
        h_element_s:e.target.clientHeight,
        x_pointer:e.target.offsetLeft,
        y_pointer:e.target.offsetTop,
    }
    if(datos.y_pointer == 0){
        numberForSearching += Math.trunc(datos.x_pointer/datos.w_element_s)
    }
    else{
        numberForSearching += Math.trunc(datos.x_pointer/datos.w_element_s) + 5
    }
    if(numberForSearching.length == 4){
        numberForSearching = numberForSearching.substring(1)
    }
    pokedex__window2Info.innerHTML = numberForSearching
})

let pokeData = {}
let pokePrincipalData = {}
let pokeDataTemp = ''

async function loadPokemon(num=27){
    pokePrincipalData = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    pokePrincipalData = await pokePrincipalData.json()
    pokedex__window[0].innerHTML= `${capitalize(pokePrincipalData.name)} <br><br>Habilidades:<br>`;
    pokePrincipalData.abilities.forEach((e)=>{
        pokeDataTemp += `${capitalize(e.ability.name)} <br>`
        console.log(pokePrincipalData);
    })
    pokeDataTemp += 'Tipos: <br>'
    pokePrincipalData.types.forEach((e)=>{
        pokeDataTemp += `${capitalize(e.type.name)} <br>`
    })
    pokedex__window[0].innerHTML+=`${pokeDataTemp} `
    pokedexPrincipalImg[0].setAttribute('src',`${pokePrincipalData.sprites.other.dream_world.front_default}`)
}
loadPokemon()


// .sprites.front_default
// weight

// stats [] base_stat stat.name

const tiposTranslate = {steel:'acero', 
water: 'agua', bug: 'bicho', dragon:'dragón',
electric:'eléctrico', ghost:'fantasma',fire:'fuego',
fairy:'hada',ice:'hielo',fighthing:'lucha',
normal:'normal',grass:'planta',psychic:'psíquico',
rock:'roca',dark:'siniestro',ground:'tierra',
poison:'veneno',flying:'volador'}