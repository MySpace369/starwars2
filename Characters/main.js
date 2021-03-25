import { people } from '../data/people.js'
import {getLastNumber, removeChildren} from '../utils/index.js'

const mainElement = document.querySelector('#main')

const mainHeader = document.createElement('header')

document.body.insertBefore(mainHeader, mainElement)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
mainHeader.appendChild(maleButton)
maleButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
mainHeader.appendChild(femaleButton)
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))

const othersButton = document.createElement('button')
othersButton.textContent = 'Other Characters'
mainHeader.appendChild(othersButton)
othersButton.addEventListener('click', () => populateDOM(otherCharacters))

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => {
    if (person.gender === 'n/a' ||
        person.gender === 'hermaphrodite') {
        return person
    }
})

function populateDOM(characters) {
    removeChildren(mainElement)

characters.forEach((person) => {
    
    let container = document.createElement('div')
    container.className = "container"
    const charFigure = document.createElement('figure')
    let image = document.createElement('img')
    let charNum = getLastNumber(person.url) 
    image.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    let figcaption = document.createElement('figcaption')
    figcaption.textContent = person.name

    container.appendChild(charFigure)
    charFigure.appendChild(image)
    charFigure.appendChild(figcaption)

    mainElement.appendChild(charFigure)

})
}


