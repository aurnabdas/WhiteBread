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