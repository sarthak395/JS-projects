console.log("Executing script.js")

const canvas = document.getElementById("canvas")
const draw = canvas.getContext("2d")

const endforx = canvas.width;
const endfory = canvas.height;

var rect=canvas.getBoundingClientRect()

//Math.random generates a number between 0 and 1
//A ball constructor (CAN'T be like Ball=()=>{})
function Ball(x, y) {
    this.fillcolor = "rgba(" + Math.round(Math.random() * 250) + "," + Math.round(Math.random() * 250) + "," + Math.round(Math.random() * 250) + "," + Math.ceil(Math.random() * 10) / 10 + ")";
    this.strokecolor = "rgba(" + Math.round(Math.random() * 250) + "," + Math.round(Math.random() * 250) + "," + Math.round(Math.random() * 250) + "," + Math.ceil(Math.random() * 10) / 10 + ")";
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    if(x==undefined)
        this.x = Math.random() * (endforx - this.radius * 2) + this.radius;
    else
        this.x=x;
    if(y==undefined)
        this.y = Math.random() * (endfory - this.radius)
    else
        this.y=y;

    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);

    // this.vel = Math.random() / 5; //velocity of balls

    this.drawball = () => {
        draw.beginPath();
        draw.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        draw.fillStyle = this.fillcolor;
        draw.strokeStyle = this.strokecolor
        draw.fill()
        draw.stroke()
    };
}

var ball = [] //empty list of balls

for (var i = 0; i < 50; i++) {
    ball.push(new Ball()); //create 50 balls
}

canvas.addEventListener("click", function(e){
    console.log("executing click event")
    mousex = e.clientX-rect.left;
    mousey = e.clientY-rect.top;
    
    ball.push(new Ball(mousex,mousey))
    ball.splice(0, 1); //at position 0, remove 1 element
})


const animate = () => {
    requestAnimationFrame(animate) //kind of like set interval only better

    draw.clearRect(0, 0, endforx, endfory) //clears frame for next animation

    for (var i = 0; i < ball.length; i++) {
        ball[i].drawball();
        ball[i].x += ball[i].dx;
        ball[i].y += ball[i].dy;

        //bouncing off walls effect
        if ((ball[i].y + ball[i].radius) >= endfory || (ball[i].y - ball[i].radius < 0)) {
            ball[i].dy = -ball[i].dy;
        }
        if ((ball[i].x + ball[i].radius) >= endforx || (ball[i].x - ball[i].radius < 0)) {
            ball[i].dx = -ball[i].dx;
        }
    }
}

animate();

setInterval(() => {
    ball.push(new Ball());
    ball.splice(0, 1); //at position 0, remove 1 element 
}, 400)