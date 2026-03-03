<script>
/* ================= NAV COLOR SWITCH ================= */

const sections=document.querySelectorAll("section");
const links=document.querySelectorAll("#navMenu a");

const hoverColors={
hero:["#ff0096","#ff33cc","#ff66ff","#ff99ff","#ffccff"],
about:["#444","#555","#666","#777","#888"],
services:["#3b82f6","#60a5fa","#93c5fd","#bfdbfe","#dbeafe"],
pricing:["#facc15","#fcd34d","#fde68a","#fff9c2","#ffffe0"],
contact:["#9333ea","#a855f7","#c084fc","#d8b4fe","#f0abfc"]
};

const observer=new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){

const color=getComputedStyle(entry.target).color;
const sectionId=entry.target.id;

links.forEach((link,i)=>{
link.style.color=color;

link.onmouseover=()=>{
link.style.color=color==="rgb(255, 255, 255)"?"black":"white";
link.style.setProperty("--shape-color",hoverColors[sectionId][i]);
};

link.onmouseout=()=>{
link.style.color=color;
};
});

}
});
},{threshold:0.6});

sections.forEach(sec=>observer.observe(sec));

const sphereCanvas = document.getElementById("pricingSpheres");
const sctx = sphereCanvas.getContext("2d");

let spheres = [];

function resizeSphereCanvas() {
  sphereCanvas.width = sphereCanvas.offsetWidth;
  sphereCanvas.height = sphereCanvas.offsetHeight;
}
resizeSphereCanvas();
window.addEventListener("resize", resizeSphereCanvas);

class Sphere {
  constructor() {
    this.radius = Math.random() * 180 + 120;
    this.x = Math.random() * sphereCanvas.width;
    this.y = Math.random() * sphereCanvas.height;

    this.direction = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.2 + 0.05;

    this.opacity = Math.random() * 0.25 + 0.08;

    this.turnTimer = Math.random() * 200 + 100;
  }

  move() {
    // move in current direction
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    // slowly change direction
    this.turnTimer--;

    if (this.turnTimer <= 0) {
      this.direction += (Math.random() - 0.5) * 1.5;
      this.turnTimer = Math.random() * 200 + 100;
    }

    // wrap around screen instead of bouncing
    if (this.x < -this.radius) this.x = sphereCanvas.width + this.radius;
    if (this.x > sphereCanvas.width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = sphereCanvas.height + this.radius;
    if (this.y > sphereCanvas.height + this.radius) this.y = -this.radius;
  }

  draw() {
    const gradient = sctx.createRadialGradient(
      this.x, this.y, this.radius * 0.1,
      this.x, this.y, this.radius
    );

    gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    sctx.beginPath();
    sctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    sctx.fillStyle = gradient;
    sctx.fill();
  }
}

function initSpheres() {
  spheres = [];
  for (let i = 0; i < 5; i++) { // 4-5 spheres
    spheres.push(new Sphere());
  }
}
initSpheres();

function animateSpheres() {
  sctx.clearRect(0, 0, sphereCanvas.width, sphereCanvas.height);

  spheres.forEach(s => {
    s.move();
    s.draw();
  });

  requestAnimationFrame(animateSpheres);
}
animateSpheres();

/* ================= GENERATE FLAT CIRCLES ================= */

const aboutCircles = document.querySelector(".about-circles");

const flatColors = [
  "#6c63ff",
  "#ff4d6d",
  "#00c2ff",
  "#ffb703",
  "#2ec4b6",
  "#8338ec",
  "#ff006e",
  "#3a86ff"
];

for(let i = 0; i < 15; i++){

  const circle = document.createElement("span");

  const size = Math.random() * 180 + 80; // 80–260px
  circle.style.width = size + "px";
  circle.style.height = size + "px";

  circle.style.top = Math.random() * 100 + "%";
  circle.style.left = Math.random() * 100 + "%";

  circle.style.background = flatColors[Math.floor(Math.random() * flatColors.length)];

  circle.style.animationDuration = (Math.random() * 20 + 20) + "s";
  circle.style.animationDelay = (Math.random() * 10) + "s";

  aboutCircles.appendChild(circle);
}

</script>