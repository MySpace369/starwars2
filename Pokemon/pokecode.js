const CARDCONTAINER = document.querySelector(".cardContainer")

function fetchKantoPokemon() {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')

    .then(response => response.json())

    .then(function(allpokemon) {
        allpokemon.results.forEach(function(pokemon){
            console.log(pokemon)
            makeCard(pokemon)
            //fetchPokemonData(pokemon);
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