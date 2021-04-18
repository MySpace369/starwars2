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
        this.abilities = abilities
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
    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        ['eat', 'sleep'],
        ['study', 'game']
    )
     populatePokeCard(newPokemon)
})

fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("Enter Pokemon ID or Name:").toLowerCase()
    console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => populatePokeCard(data)
    )
})

fetchButton.addEventListener('click', () => {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/25`).then(
        (data) => {
            makeCard(data)
        }
    )
})

fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("Enter Pokemon ID or Name:").toLowerCase()
    console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => populatePokeCard(data)
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
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=76&offset=748`).then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => makeCard(pokeData)
                )
            }
        }
    )
}

function populatePokeCard(singlePokemon) {
     let pokeScene = document.createElement('div')
     pokeScene.className = 'scene'
     let pokeCard = document.createElement('div')
     pokeCard.className = 'card'
     pokeCard.addEventListener('click', () => {
         pokeCard.classList.toggle('is-flipped')
     })
     pokeCard.appendChild(populateCardFront(singlePokemon))
     pokeCard.appendChild(populateCardBack(singlePokemon))
     pokeScene.appendChild(pokeCard)
     pokeGrid.appendChild(pokeScene)
 }

 function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)

    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontImage)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('p')
    backLabel.textContent = `Moves: ${pokemon.moves.length}`
    pokeBack.appendChild(backLabel)
    return pokeBack
}

function makeCard(data){
    let card = document.createElement('div')
    let content = document.createElement('div')
    let front = document.createElement('div')
    let back = document.createElement('div')
  
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(data)
    
    card.className = "card"
    content.className = "content"
    front.className = "front"
    back.className = "back"

    ///// populate card data //////
    let nameTag = document.createElement('p')
    nameTag.textContent = data.name


    card.appendChild(content)
    content.appendChild(front)
    content.appendChild(back)
    front.appendChild(frontImage)
    CARDCONTAINER.appendChild(card)
}

// fetchKantoPokemon() 


function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
} 