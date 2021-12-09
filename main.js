const makePlayer = ({name, hp, img, weapon} = {})  => {
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
    const playerElement = document.createElement('div')
    playerElement.classList.add(playerPosition)
    playerElement.innerHTML = `
        <div class="progressbar">
            <div class="life" style="width: 100%"></div>
            <div class="name">${player.name}</div>
        </div>
        <div class="character">
            <img src="${player.img}"  alt="${player.name}"/>
        </div>
    `

    document.getElementsByClassName('arenas')[0].appendChild(playerElement)
}

const players = [
    makePlayer({name: 'Scorpion', hp: 100, img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif', weapon: 'knife'}),
    makePlayer({name: 'Sonya', hp: 100, img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif', weapon: 'boobs'})
]

players.forEach((value, index) => {
    createPlayer(`player${index + 1}`, value)
})