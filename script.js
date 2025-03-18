const canvas = document.getElementById('physicsCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let ball = {
  x: canvas.width / 2,
  y: 50,
  radius: 20,
  color: 'skyblue',
  vy: 0,
  force: 0,
  mass: 10,
  gravity: 9.8,
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
  ball.vy += (ball.gravity - ball.force / ball.mass) * 0.1; // Physics formula
  ball.y += ball.vy;

  if (ball.y + ball.radius > canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.vy *= -0.8; // Bounce back with damping
  }
}

function animate() {
  drawBall();
  updateBall();
  requestAnimationFrame(animate);
}

document.getElementById('force').addEventListener('input', (e) => {
  ball.force = parseFloat(e.target.value);
});

document.getElementById('mass').addEventListener('input', (e) => {
  ball.mass = parseFloat(e.target.value);
});

document.getElementById('gravity').addEventListener('input', (e) => {
  ball.gravity = parseFloat(e.target.value);
});

animate();
