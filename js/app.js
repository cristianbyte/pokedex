const pokedexOut = document.getElementById('pokedex__toggle')
const pokedex = document.getElementById('pokedexOpen')
function move(){
    pokedex.classList.toggle('pokedex__open')
}
pokedexOut.addEventListener('click', move)

const tiposTranslate = {
steel:'acero', water: 'agua', bug: 'bicho',dragon:'dragón',
electric:'eléctrico', ghost:'fantasma',fire:'fuego',fairy:'hada',
ice:'hielo',fighthing:'lucha',normal:'normal',grass:'planta',
psychic:'psíquico',rock:'roca',dark:'siniestro',ground:'tierra',
poison:'veneno',flying:'volador'}

const pokedex__window = document.getElementsByClassName('dataPokemon')
const tecladoPokedex = document.getElementsByClassName('pokedex__2-buttons')[0]
const search = document.getElementsByClassName('pokedex__2-buttons-search')[0]
const borrar = document.getElementsByClassName('pokedex__2-buttons-delete')[0]
const botones = document.getElementsByClassName('pokedex__buttons')[0]
let pokedexPrincipalImg = document.getElementsByTagName('img')
let pokedex__window2Info = document.getElementsByClassName('pokedex__2-window--data')[0]
let pokedex__window2Info2 = document.getElementsByClassName('pokedex__2-window--data2')[0]
let pokedex__window2InfoNumber = document.getElementsByClassName('pokedex__2-window--number')[0]
let numberForSearch = '003'
let pokeData = {}
let pokeDataTemp = ''

function searchEvent(){
    if( 0 < numberForSearch && numberForSearch < 900 ){
        loadPokemon(numberForSearch)
    }
    else{
        numberForSearch = 0
        console.log('error')
    }
    pokedex__window2InfoNumber.innerHTML = numberForSearch
}

function deleteNumber(){
    numberForSearch = '0'
    pokedex__window2InfoNumber.innerHTML = numberForSearch
}

function cleanData(){
    pokeDataTemp = ''
    pokedex__window[0].innerHTML = ''
    pokedex__window2Info.innerHTML = ''
    pokedex__window2Info2.innerHTML = ''
}

async function loadPokemon(num){
    cleanData()
    pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${+num}`)
    pokeData = await pokeData.json()
    
    pokedex__window[0].innerHTML= `${pokeData.name} <br><br>Habilidades:<br>`;
    
    pokeData.abilities.forEach((e)=>{
        pokeDataTemp += `${e.ability.name} <br>`
    })
    pokeDataTemp += 'Tipo: <br>'
    pokeData.types.forEach((e)=>{
        pokeDataTemp += `${tiposTranslate[e.type.name]} <br>`
    })
    pokedex__window[0].innerHTML+=`${pokeDataTemp} `
    pokedex__window2InfoNumber.style.backgroundImage =`url(${pokeData.sprites.front_default})`

    pokeDataTemp = pokeData.sprites.other.dream_world.front_default ?? pokeData.sprites.front_default
    pokedexPrincipalImg[0].setAttribute('src',`${pokeDataTemp}`)

    pokeData.stats.forEach((e)=>{
        pokedex__window2Info.innerHTML += `${e.stat.name}:<br>`
        pokedex__window2Info2.innerHTML += `${e.base_stat}<br>`
    })
}

tecladoPokedex.addEventListener('click',(e)=>{
    datos = {
        w_element_s:e.target.clientWidth,
        h_element_s:e.target.clientHeight,
        x_pointer:e.target.offsetLeft,
        y_pointer:e.target.offsetTop,
    }
    numberForSearch +=''
    if(datos.y_pointer == 0){
        numberForSearch += Math.trunc(datos.x_pointer/datos.w_element_s)
    }
    else{
        numberForSearch += Math.trunc(datos.x_pointer/datos.w_element_s) + 5
    }
    if(numberForSearch.length == 4){
        numberForSearch = numberForSearch.substring(1)
    }
    pokedex__window2InfoNumber.innerHTML = numberForSearch
console.log(pokedex__window2InfoNumber );
})

function preSearch(e){
    numberForSearch = +numberForSearch
    switch (e.target.className) {
        case 'button__left':
            searchEvent(--numberForSearch)
            break;
        case 'button__right':
            searchEvent(++numberForSearch)
            break;
        case 'button__up':
            searchEvent(numberForSearch+=50)
            break;    
        case 'button__down':
            searchEvent(numberForSearch-=50)
            break;   
        case 'button__scan':

            break; 
        default:
            break;
    }
    console.log(e.target.className)
    // if(this.target && this.target.tagName === 'span')
}

loadPokemon(numberForSearch)
pokedex__window2InfoNumber.innerHTML = numberForSearch
borrar.addEventListener('click', deleteNumber )
search.addEventListener('click', searchEvent )
botones.addEventListener('click', preSearch)

// .sprites.front_default
// weight

// stats [] base_stat stat.name
