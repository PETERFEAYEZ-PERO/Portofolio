// ================= DARK MODE =================

const btn = document.getElementById("themeBtn");

btn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

btn.innerHTML =
document.body.classList.contains("dark")
? '<i class="fas fa-sun"></i>'
: '<i class="fas fa-moon"></i>';

});

// ================= CFD SIMULATION =================

const canvas = document.getElementById("fluidCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
x:null,
y:null
};

window.addEventListener("mousemove",(e)=>{

mouse.x = e.x;
mouse.y = e.y;

});

window.addEventListener("resize",()=>{

canvas.width = innerWidth;
canvas.height = innerHeight;

});

class FlowParticle{

constructor(){

this.reset();

}

reset(){

this.x = Math.random()*canvas.width;
this.y = Math.random()*canvas.height;

this.speed = Math.random()*1.5 + 0.5;

this.angle = Math.random()*Math.PI*2;

}

update(){

const centerX = canvas.width/2;
const centerY = canvas.height/2;

const dx = centerX - this.x;
const dy = centerY - this.y;

const dist = Math.sqrt(dx*dx + dy*dy);

this.angle += 0.0008 * dist;

this.x += Math.cos(this.angle)*this.speed;
this.y += Math.sin(this.angle)*this.speed;

this.x += dx * 0.0008;
this.y += dy * 0.0008;

if(mouse.x){

const mdx = this.x - mouse.x;
const mdy = this.y - mouse.y;

const mdist = Math.sqrt(mdx*mdx + mdy*mdy);

if(mdist < 140){

const force = (140-mdist)/140;

this.x += mdx * force * 0.06;
this.y += mdy * force * 0.06;

this.angle += force * 0.4;

}

}

if(dist < 40){

this.reset();

}

}

draw(){

ctx.beginPath();

ctx.strokeStyle =
"rgba(114,183,255,0.15)";

ctx.lineWidth = 1.1;

ctx.moveTo(this.x,this.y);

ctx.lineTo(
this.x - Math.cos(this.angle)*25,
this.y - Math.sin(this.angle)*25
);

ctx.stroke();

}

}

const particles = [];

for(let i=0;i<2500;i++){

particles.push(new FlowParticle());

}

function animate(){

ctx.fillStyle =
"rgba(5,8,15,0.06)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

particles.forEach(p=>{

p.update();
p.draw();

});

requestAnimationFrame(animate);

}

animate();