const makePlayer = ({name, hp, img, weapon = []} = {})  => {
    return {
        name,
        hp,
        img,
        weapon,
        attack: function () {
            console.log(`${this.name} Fight...`)
        }
    }
}

const createPlayer = (playerPosition, player) => {
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

    const character = makeElement({tagName: 'div', className: playerPosition})
    const characterAvatar = makeElement({tagName: 'img', attributes: {alt: player.name, src: player.img}})
    const characterLifeBar = makeElement({tagName: 'div', className: 'life', styles: {width: `${player.hp}%`}})
    const characterName = makeElement({tagName: 'div', className: 'name', text: player.name})
    const characterAvatarContainer = makeElement({tagName: 'div', className: 'character'})
    const characterProgressbar = makeElement({tagName: 'div', className: 'progressbar'})

    characterProgressbar.append(characterLifeBar, characterName)
    characterAvatarContainer.append(characterAvatar)

    character.append(characterProgressbar, characterAvatarContainer)

    document.getElementsByClassName('arenas')[0].appendChild(character)
}


const playerOne = makePlayer({name: 'Scorpion', hp: 30, img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', weapon: ['knife', 'fireball']})
const playerTwo = makePlayer({name: 'Sonya', hp: 100, img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif', weapon: ['boobs', 'gun']})


createPlayer(`player1`, playerOne)
createPlayer(`player2`, playerTwo)