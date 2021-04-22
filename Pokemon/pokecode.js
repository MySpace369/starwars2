const CARDCONTAINER = document.querySelector(".cardContainer")
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')
const newButton = document.querySelector('#newPokemon')

class Pokemon {
    constructor(name, height, weight, abilities, moves) {
        this.id = 900
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = {
            ability:{
                name: abilities
            }
        }
        this.moves = moves
    }
}

loadButton.addEventListener('click', () => {
    loadPage()
})

newButton.addEventListener('click', () => {
    let pokeName = prompt('What is the name of your new Pokemon?')
    let pokeHeight = prompt('What is the height of your Pokemon?')
    let pokeWeight = prompt('Pokemon weight?')
    let abilites = prompt('Pokemon ability?')
    
    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        abilities,
        ['study', 'game']
    )
    //console.log(newPokemon)
    makeCard(newPokemon)
})

fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("Enter Pokemon ID or Name:").toLowerCase()
    //console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => makeCard(data)
    )
})

async function getAPIData(url) {
    try{
        const response = await fetch(url)
        const data = await response.json()
            return data
    } catch (error) {

    }
}

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=61&offset=748`).then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => makeCard(pokeData)
                )
            }
        }
    )
}

// fetchButton.addEventListener('click', () => {
//     getAPIData(`https://pokeapi.co/api/v2/pokemon/25`).then(
//         (data) => {
//             makeCard(data)
//         }
//     )
// })

fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("Enter Pokemon ID or Name:")
    // .toLowerCase()//to lower case of null
    //console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => makeCard(data)
    )
})

function populatePokeCard(singlePokemon) {
    console.log(singlePokemon)
     let pokeScene = document.createElement('div')
     pokeScene.className = 'scene'
     let pokeCard = document.createElement('div')
     pokeCard.className = 'card'
     let pokeGrid = document.createElement('div')
     pokeCard.addEventListener('click', () => {
     pokeCard.classList.toggle('is-flipped')
     })
     pokeCard.appendChild(populateCardFront(singlePokemon))
     pokeCard.appendChild(populateCardBack(singlePokemon))
     pokeScene.appendChild(pokeCard)
     pokeGrid.appendChild(pokeScene)
 }

function abilities(array){
    //console.log(array)
    let abilityContatiner = document.createElement('div')
    let abilityLabel = document.createElement('h1')
    abilityLabel.textContent = "Abilites"
    abilityContatiner.appendChild(abilityLabel)
    abilityContatiner.className = 'ability_container'
    for (let i = 0; i < array.length; i++) {
        let abilityName = document.createElement('p')
        abilityName.textContent = capitalize(array[i].ability.name)
        //console.log(abilityName)
        abilityContatiner.appendChild(abilityName)

        
    }
    return abilityContatiner
    //console.log(abilityContatiner)
}


function makeCard(data){
    // console.log(data.types[0].type.name)
    let card = document.createElement('div')
    let content = document.createElement('div')
    let front = document.createElement('div')
    let back = document.createElement('div')
  
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(data)
    let title = document.createElement('p')
    title.textContent = capitalize(data.name)
    card.className = "card"
    content.className = "content"
    front.className = "front"
    back.className = "back"

    ///// back card content ///////
    setTypeStyle(data,front)
    // console.log(setTypeStyle(data,front))
    
    let abilityContainer = abilities(data.abilities)
    //console.log(abilityContainer)
    ///// populate card data //////
    let nameTag = document.createElement('p')
    nameTag.textContent = data.name


    card.appendChild(content)
    content.appendChild(front)
    content.appendChild(back)
    back.appendChild(abilityContainer)

    front.appendChild(frontImage)
    front.appendChild(title)
    CARDCONTAINER.appendChild(card)
}

 function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')

    
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)

    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontImage)
    return pokeFront
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function populateCardBack(pokemon) {
    // console.log(pokemon)
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('p')
    backLabel.textContent = `Moves: ${pokemon.moves.length}`
    pokeBack.appendChild(backLabel)
    }

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    if (pokemon.id === 900) {
        return `images/pokeball.png`
    }
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}
function setTypeStyle(data,element) {
    let pokeTypes = []
    let pokeType1 = data.types[0].type.name

    if (data.types.length > 1) {
        let pokeType2 = data.types[1].type.name
        pokeTypes = [pokeType1,pokeType2]
        console.log(pokeTypes)
        element.style.setProperty(
        'background',
        `linear-gradient(${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(
            pokeType2,
        )})`,
        )
    } else {
        element.style.setProperty('background', getPokeTypeColor(pokeType1))
        pokeTypes = [pokeType1]
    }
    
    return pokeTypes
}

function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
      case 'grass':
        color = '#0F0'
        break
      case 'fire':
        color = '#F00'
        break
      case 'water':
        color = '#00F'
        break
      case 'bug':
        color = '#7fff00'
        break
      case 'normal':
        color = '#f5f5dc'
        break
      case 'flying':
        color = '#00ffff'
        break
      case 'poison':
        color = '#c300ff'
        break
      case 'electric':
        color = '#c8ff00'
        break
      default:
        color = '#777'
    }
    return color
  }