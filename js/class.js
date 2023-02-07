// this is for the background animation 
class Sprite // moving images in game are called sprite
{
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 } }) // this is the constructor of this class
        {
            this.position = position
            this.width = 50
            this.height = 150
            this.image = new Image() //this creates a html image within a javascript property
            this.image.src = imageSrc
            this.scale = scale
            this.framesMax = framesMax
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 5
            this.offset = offset

        }

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }
    animateFrames() {
        this.framesElapsed++

            if (this.framesElapsed % this.framesHold === 0) {
                if (this.framesCurrent < this.framesMax - 1) {
                    this.framesCurrent++
                } else {
                    this.framesCurrent = 0
                }
            }
    }
    update() {
        this.draw()
        this.animateFrames()

    }
}




//This is for the player animation
class Fighter extends Sprite // moving images in game are called sprite
{
    constructor({ position, velocity, color = 'green', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites }) // this is the constructor of this class
        {
            super({ position, imageSrc, scale, framesMax, offset })
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
            this.framesCurrent = 0
            this.framesElapsed = 0
            this.framesHold = 5
            this.sprites = sprites

            for (const sprite in this.sprites) {
                sprites[sprite].image = new Image()
                sprites[sprite].image.src = sprites[sprite].imageSrc
            }
        }

    update() {
        this.draw()
        this.animateFrames()


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
            this.position.y = 330
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

    switchSprite(sprite) {
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0 // helps when it comes to switching to jump (which has a lower frame rate)
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0 // helps when it comes to switching to jump (which has a lower frame rate)

                }
                break
            case 'jump':
                if (this.image != this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0 // helps when it comes to switching to jump (which has a lower frame rate)

                }
                break
            case 'fall':
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break


        }

    }
}