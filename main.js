const arena = document.querySelector('.arenas')
const randomButton = document.querySelector('.control .button')

const makePlayer = ({id, name, hp, img, weapon = []} = {})  => {
    return {
        id,
        name,
        hp,
        img,
        weapon,
        attack: function () {
            console.log(`${this.name} Fight...`)
        }
    }
}

const playerOne = makePlayer({id: 1, name: 'Scorpion', hp: 100, img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', weapon: ['knife', 'fireball']})
const playerTwo = makePlayer({id: 2, name: 'Sonya', hp: 100, img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif', weapon: ['boobs', 'gun']})

const makeElement = ({tagName = '', className = '', styles = {}, attributes = {}, text = ''} = {}) => {
    const element = document.createElement(tagName)

    if (className !== '') {
        element.classList.add(className)
    }

    if (text.length > 0) {
        element.innerText = text
    }

    if (Object.keys(styles).length > 0) {
        let cssText = ''

        for (const styleKey in styles) {
            cssText += `${styleKey}:${styles[styleKey]};`
        }

        element.style.cssText = cssText
    }

    if (Object.keys(attributes).length > 0) {
        for (const attributeKey in attributes) {
            element.setAttribute(attributeKey, attributes[attributeKey])
        }
    }

    return element
}

const createPlayer = (player) => {
    const character = makeElement({tagName: 'div', className: `player${player.id}`})
    const characterAvatar = makeElement({tagName: 'img', attributes: {alt: player.name, src: player.img}})
    const characterLifeBar = makeElement({tagName: 'div', className: 'life', styles: {width: `${player.hp}%`}})
    const characterName = makeElement({tagName: 'div', className: 'name', text: player.name})
    const characterAvatarContainer = makeElement({tagName: 'div', className: 'character'})
    const characterProgressbar = makeElement({tagName: 'div', className: 'progressbar'})

    characterProgressbar.append(characterLifeBar, characterName)
    characterAvatarContainer.append(characterAvatar)

    character.append(characterProgressbar, characterAvatarContainer)

    return character
}

const changeHP = (playerOne, playerTwo) => {
    const calculateDamage = (player) => {
        const playerLife = document.querySelector(`.player${player.id} .life`)
        // random between 5 and 20
        player.hp -= Math.floor(Math.random() * 16) + 5

        if (player.hp <= 0) {
            player.hp = 0
        }

        playerLife.style.width = `${player.hp}%`
    }

    calculateDamage(playerOne)
    calculateDamage(playerTwo)

    showWinner()
}

const showWinner = () => {
    if (playerOne.hp === 0 || playerTwo.hp === 0) {
        const winner = makeElement({tagName: 'div', className: 'loseTitle'})
        let innerText = `${playerOne.hp > playerTwo.hp ? playerOne.name : playerTwo.name} wins!`

        if (playerOne.hp === playerTwo.hp) {
            innerText = 'Both lose!'
        }

        winner.innerText = innerText

        arena.appendChild(winner)
        randomButton.disabled = true
    }
}

arena.appendChild(createPlayer(playerOne))
arena.appendChild(createPlayer(playerTwo))

randomButton.addEventListener('click', function () {
    changeHP(playerOne, playerTwo)
})