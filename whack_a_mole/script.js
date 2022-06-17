console.log("hello")
const moles=document.querySelectorAll('.img2')
const holes=document.querySelectorAll('.img1')
const scoreboard=document.querySelector('.score')

var flag=true;

function timer(max,min)
{
    return Math.round(Math.random(max-min)+min)
}

function randommole(moles)
{
    var index=Math.round((Math.random()*100)%(moles.length))
    if(index==moles.length)
        index=0;
    var mole=moles[index]
    return mole;
}

function game()
{
    const time=timer(500,1000);
    const mole=randommole(moles);
    mole.style.display='inline'
    setTimeout(()=>{
        mole.style.display='none';
        if(flag)
            requestAnimationFrame(game)
    },time);
}

var score=0;
function startgame()
{
    document.getElementById('over').textContent="Game Started"
    flag=true;
    scoreboard.textContent=0;
    console.log("starting game")
    game();
    setTimeout(()=>{
        console.log("game over")
        document.getElementById('over').textContent="Game Over"
        flag=false
    },15000)
}

function clickhappen()
{
    score++;
    scoreboard.textContent=score;
    this.style.display='none'
}

moles.forEach(mole=>mole.addEventListener('click',clickhappen))
