const CARDCONTAINER = document.querySelector(".cardContainer")
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')

function fetchKantoPokemon() {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=25')

    .then(response => response.json())

    .then(function(allpokemon) {
        allpokemon.results.forEach(function(pokemon){
            console.log(pokemon)
            makeCard(pokemon)
        })
    })
}

function makeCard(data){
    let card = document.createElement('div')
    let content = document.createElement('div')
    let front = document.createElement('div')
    let back = document.createElement('div')

    card.className = "card"
    content.className = "content"
    front.className = "front"
    back.className = "back"

    ///// populate card data //////
    let nameTag = document.createElement('p')
    nameTag.textContent = data.name
   
    function loadPage() {
        getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then(
            async (data) => {
                for (const singlePokemon of data.results) {
                    await getAPIData(singlePokemon.url).then(
                        (pokeData) => populatePokeCard(pokeData)
                    )
                }
            }
        )
    }

    card.appendChild(content)
    content.appendChild(front)
    content.appendChild(back)
    front.appendChild(nameTag)
    CARDCONTAINER.appendChild(card)

}

// function populateCardFront(pokemon) {
//     console.log(pokemon)
//     let pokeFront = document.createElement('div')
//     pokeFront.className = 'card__face card__face--front'
//     let frontLabel = document.createElement('p')
//     frontLabel.textContent = pokemon.name
//     let frontImage = document.createElement('img')
//     frontImage.src = `images/${getImageFileName(pokemon)}.png`

//     pokeFront.appendChild(frontLabel)
//     pokeFront.appendChild(frontImage)
//     return pokeFront
// }

// function populateCardBack(pokemon) {
//     let pokeBack = document.createElement('div')
//     pokeBack.className = 'card__face card__face--back'
//     let backLabel = document.createElement('p')
//     backLabel.textContent = `Moves: ${pokemon.moves.length}`
//     pokeBack.appendChild(backLabel)
//     return pokeBack
// }

// function getImageFileName(pokemon) {
//     if (pokemon.id < 10) {
//         return `00${pokemon.id}`
//     } else if (pokemon.id > 9 && pokemon.id < 100) {
//         return `0${pokemon.id}`
//     }
// }

/* 
<div class="card">
    <div class="content">
        <div class="front">
            Front
        </div>
        <div class="back">
            Back!
    </div>
</div>
*/
fetchKantoPokemon()