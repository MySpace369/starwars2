const CARDCONTAINER = document.querySelector(".cardContainer")
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')

loadButton.addEventListener('click', () => {
    loadPage()
})

fetchButton.addEventListener('click', () => {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/25`).then(
        (data) => {
            populatePokeCard(data)
        }
    )
})

// function fetchKantoPokemon() {

//     fetch('https://pokeapi.co/api/v2/pokemon?limit=25')

//     .then(response => response.json())

//     .then(function(allpokemon) {
//         allpokemon.results.forEach(function(pokemon){
//             console.log(pokemon)
//             makeCard(pokemon)
//         })
//     })
// }



function makeCard(data){
    let card = document.createElement('div')
    let content = document.createElement('div')
    let front = document.createElement('div')
    let back = document.createElement('div')

    // let frontImage = document.createElement('img')
    // frontImage.src = `images/${getImageFileName(pokemon)}.png`

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
    front.appendChild(nameTag)
    CARDCONTAINER.appendChild(card)

}

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

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}