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
c.fillRect(0, 0 ,canvas.width ,canvas.height) // (in total there are four arguments)the first and second paramets are the x and y positions, and the last two are the sizes 

const gravity = 0.2
class Sprite // moving images in game are called sprite
{
    constructor({position, velocity}) // this is the constructor of this class
    {
        this.position = position
        this.velocity  = velocity
        this.height = 150

    }

    draw()
    {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }
    update()
    {
        this.draw()
        
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height) 
        //if the player is above the bottom of the canvas the velocity should be zero meaning it should not be moving
        //side note the reason why we are comparing canvas.height is because the y coordinate of these objects start at the top of the screen, therfore in order to ger the position of the bottom you want the height, which repersents bottom of the cavanas
        {
            this.velocity.y = 0
        }
        else 
        this.velocity.y += gravity //gravity makes sures that the two players are all the way on the floor
    }
}

const player = new Sprite({ 
    position: {x:0 , y:0}
    ,
    velocity: {x:0, y:0}
})

const enemy = new Sprite({ 
    position: {x:900 , y:0}
    ,
    velocity: {x:0, y:0}
})


console.log(enemy)
console.log(player)



function animate()
{
    window.requestAnimationFrame(animate)// this creates a infinte loops, hence it creates a animation
    c.fillStyle = 'red'
    c.fillRect(0 , 0, canvas.width , canvas.height)//this wont draw anything when we call it. this remove the paint like effect 
    player.update()
    enemy.update()
}

animate()

