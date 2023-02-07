const canvas = document.querySelector('canvas') //we are storing the html canvas inside a javascript variable
const c = canvas.getContext('2d')


//this creates the size
canvas.width = 1024
canvas.height = 576

//colors the background
// c.fillStyle = "teal"

// c.font = "50px serif";
// c.fillText("Crip" , 50, 90)
//this fills in the space that we want to color 
c.fillRect(0, 0, canvas.width, canvas.height) // (in total there are four arguments)the first and second paramets are the x and y positions, and the last two are the sizes 

const gravity = 0.8

const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './img/madgurl.png'

})

const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    offset: { x: 0, y: 0 }, // don't need to change player's attackbox since it's fine as it is
    imageSrc: './img/Sprites/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: { x: 215, y: 157 },
    sprites: { idle: { imageSrc: './img/Sprites/Idle.png', framesMax: 8 }, run: { imageSrc: './img/Sprites/Run.png', framesMax: 8 } }
})

const enemy = new Fighter({
    position: { x: 900, y: 0 },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: { x: -50, y: 0 }, // x is -50 to move the attackbox forward for the enemy so its even

})


console.log(enemy)
console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}


decreaseTimer()



function animate() {
    window.requestAnimationFrame(animate) // this creates a infinte loops, hence it creates a animation
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) //this wont draw anything when we call it. this remove the paint like effect 
    background.update()
    player.update()
        // enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
        //player movement
    player.image = player.sprites.idle.image
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -10
        player.image = player.sprites.run.image
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 10
        player.image = player.sprites.run.image
    }


    //enemy movement

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -10
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 10
    }
    //detect for collision
    if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking)

    {
        player.isAttacking = false // only lets you attack once if you pressed space once 
        enemy.health -= 20 // this decreases the enemies health 
        document.querySelector('#enemyHealth').style.width = enemy.health + "%" // this represents it on the health bar

    }
    // we have to make the same if statement for the enemy because they are going to be attacking as well
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking)

    {
        enemy.isAttacking = false // only lets you attack once if you pressed space once 
        player.health -= 20 // this decreases the players health 
        document.querySelector('#playerHealth').style.width = player.health + "%" // this represents the players health on the bar

    }

    //endgame based on health 
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId })
    }
}


animate()

window.addEventListener('keydown', (event) => { //this is to make a keybind and connect it with an action or in this case an event

    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -10
            break
        case ' ':
            player.attack()
            break
            //arrows keydown for enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -10
            break
        case 'ArrowDown':
            enemy.isAttacking = true
            enemy.attack() // REMOVE this if there is a problem with the hit box
            break
    }


})
window.addEventListener('keyup', (event) => { //this is to make a keybind and connect it with an action or in this case an event
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

    }
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

    }


})