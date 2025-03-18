const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let ball = {
  x: canvas.width / 2,
  y: 50,
  vx: 0, // Added horizontal velocity
  vy: 0,
  radius: 20,
  color: 'skyblue',
  force: 0,
  mass: 10,
  gravity: -9.8,
  k: 100,
  d: 10,
  rest: 40,
  hit: 0,
  compressed: 0,
};

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
  ctx.fill();
  ctx.closePath();
}

function updateBall() {
if(ball.y - ball.rest < 0){
  ball.compressed = abs(0 - ball.y - ball.rest);
  spring = ball.k*ball.compressed
  damper = ball.d * ball.y;
  ball.force = spring - damper;
  ball.vy += (ball.gravity + ball.force / ball.mass)*.1;
  ball.y += ball.vy;
}
  
}

// Update slider values dynamically
function updateSliderValue(sliderId, valueId, property) {
  const slider = document.getElementById(sliderId);
  const valueDisplay = document.getElementById(valueId);

  slider.addEventListener('input', (e) => {
    ball[property] = parseFloat(e.target.value);
    valueDisplay.textContent = e.target.value;
  });
}

// Initialize all sliders
updateSliderValue('force', 'forceValue', 'force');
updateSliderValue('mass', 'massValue', 'mass');
updateSliderValue('gravity', 'gravityValue', 'gravity');
updateSliderValue('vx', 'vxValue', 'vx');

function animate() {
  drawBall();
  updateBall();
  requestAnimationFrame(animate);
}

animate();
