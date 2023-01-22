
// this is for the background animation 
class Sprite // moving images in game are called sprite
{
    constructor({ position, imageSrc}) // this is the constructor of this class
        {
            this.position = position
            this.width = 50
            this.height = 150
            this.image = new Image() //this creates a html image within a javascript property
            this.image.src = imageSrc
            
        }

    draw() 
    {
        c.drawImage(this.image, this.position.x, this.position.y )//canvas function. also the three function you need is the image it self and the x and y coordinate
    }

    update() 
    {
        this.draw()
    }
}


//This is for the player animation
class Fighter // moving images in game are called sprite
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

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96)
        //if the player is above the bottom of the canvas the velocity should be zero meaning it should not be moving
        //side note the reason why we are comparing canvas.height is because the y coordinate of these objects start at the top of the screen, therfore in order to ger the position of the bottom you want the height, which repersents bottom of the cavanas
        // NOTE: this was a update made at 2:05:00, which was cavas.height - 96, this basically makes the players stand on the ground element of your image, this will have to change based on whatvever image you use for the background
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