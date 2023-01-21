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
class Sprite // moving images in game are called sprite
{
    constructor({ position, velocity, color = 'green', offset }) // this is the constructor of this class
        {
            this.position = position
            this.velocity = velocity
            this.width = 50
            this.height = 150
            this.lastKey
            this.health = 100
            this.attackBox = {
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                offset, // going to make the enemy hitbox be forward if that makes sense
                width: 100,
                height: 50
            }
            this.color = color
            this.isAttacking
        }

    draw() {

        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
            //attack box
        if (this.isAttacking) {
            c.fillStyle = 'yellow'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    update() {
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x // makes attackbox independently track the character 
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height)
        //if the player is above the bottom of the canvas the velocity should be zero meaning it should not be moving
        //side note the reason why we are comparing canvas.height is because the y coordinate of these objects start at the top of the screen, therfore in order to ger the position of the bottom you want the height, which repersents bottom of the cavanas
        {
            this.velocity.y = 0
        } else
            this.velocity.y += gravity //gravity makes sures that the two players are all the way on the floor
    }
    attack()

    {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false // pauses attack after 100 ms after activation
        }, 100)

    }

}




const player = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    offset: { x: 0, y: 0 } // don't need to change player's attackbox since it's fine as it is
})

const enemy = new Sprite({
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

function rectangularCollision({ rectangle1, rectangle2 }) 
{ // function made for easy code-reading for the collision of the attack boxes 
    return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= enemy.position.x &&
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        ) //rec1 is player, rec2 is enemy
}



function determineWinner({player,enemy, timerId})
{
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex' 

    if( player.health === enemy.health)
        {
            document.querySelector('#displayText').innerHTML = 'Tie'
        }
        
        else if(player.health > enemy.health)
        {
            document.querySelector('#displayText').innerHTML = 'PLAYER WINS'
        }

        else if(player.health < enemy.health)
        {
            document.querySelector('#displayText').innerHTML = 'ENEMY WINS'
        }
}

let timer = 60 // this is just a variable for the timer 
let timerId
function decreaseTimer()
{
    timerId = setTimeout(decreaseTimer,1000) // this creates a infinite loop

    if(timer > 0) // the timer has to be above 0, otherwise if you subtract 1 from the timer the value will be negative
    { 
        timer--
        document.querySelector('#timer').innerHTML = timer // the querySelector grabs the html element with the id timer, then the .innerHTML goes into the value of the actually div, once we go that we are putting places the variable timer that we made into the div
    
    }

    if(timer === 0)
    {
        determineWinner({player,enemy, timerId})
    }   
}
decreaseTimer()



function animate() 
{
    window.requestAnimationFrame(animate) // this creates a infinte loops, hence it creates a animation
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height) //this wont draw anything when we call it. this remove the paint like effect 
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
        //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -10
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 10
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
        enemy.health-=20 // this decreases the enemies health 
        document.querySelector('#enemyHealth').style.width = enemy.health + "%" // this represents it on the health bar

    }
    // we have to make the same if statement for the enemy because they are going to be attacking as well
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking)

    {
        enemy.isAttacking = false // only lets you attack once if you pressed space once 
        player.health-=20 // this decreases the players health 
        document.querySelector('#playerHealth').style.width = player.health + "%" // this represents the players health on the bar

    }

    //endgame based on health 
    if(enemy.health<=0 || player.health<= 0)
    {
        determineWinner({player,enemy, timerId})
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