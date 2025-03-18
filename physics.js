
// Get canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: 100, // Start above the rest position
    radius: 20,
    mass: 1, // Mass of the ball
    velocity: 0,
    force: 0,
    damping: 0.1,
    springStiffness: 0.05,
    restHeight: 200, // Rest position of the spring
    gravity: 0.5, // Gravity force
};

// Sliders and labels
const restHeightSlider = document.getElementById('restHeight');
const springStiffnessSlider = document.getElementById('springStiffness');
const dampingSlider = document.getElementById('damping');

const restHeightValue = document.getElementById('restHeightValue');
const springStiffnessValue = document.getElementById('springStiffnessValue');
const dampingValue = document.getElementById('dampingValue');

// Update values from sliders
restHeightSlider.addEventListener('input', () => {
    ball.restHeight = parseFloat(restHeightSlider.value);
    restHeightValue.innerText = ball.restHeight;
});

springStiffnessSlider.addEventListener('input', () => {
    ball.springStiffness = parseFloat(springStiffnessSlider.value);
    springStiffnessValue.innerText = ball.springStiffness;
});

dampingSlider.addEventListener('input', () => {
    ball.damping = parseFloat(dampingSlider.value);
    dampingValue.innerText = ball.damping;
});

// Physics update
function updatePhysics() {
    // Spring Force (Hooke's Law)
    let displacement = ball.y - ball.restHeight; // The displacement from the rest height
    let springForce = -ball.springStiffness * displacement;

    // Damping Force (proportional to velocity)
    let dampingForce = -ball.damping * ball.velocity;

    // Gravity Force (downwards)
    let gravityForce = ball.mass * ball.gravity;

    // Net force on the ball
    let netForce = springForce + dampingForce + gravityForce;

    // Apply acceleration (F = ma)
    let acceleration = netForce / ball.mass;

    // Update velocity and position (Euler method)
    ball.velocity += acceleration; // Update velocity based on acceleration
    ball.y += ball.velocity; // Update position based on velocity

    // Prevent the ball from going below the ground (floor)
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.velocity *= -0.6; // A bit of bounce but not too much
    }

    // Optionally, we can limit the velocity if it goes too high
    if (Math.abs(ball.velocity) > 10) {
        ball.velocity = Math.sign(ball.velocity) * 10;
    }
}

// Draw ball and its current velocity
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the spring's rest position (for visual reference)
    ctx.beginPath();
    ctx.moveTo(0, ball.restHeight);
    ctx.lineTo(canvas.width, ball.restHeight);
    ctx.strokeStyle = "#888";
    ctx.stroke();

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();

    // Show the velocity
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Velocity: ${ball.velocity.toFixed(2)} px/s`, 10, 30);
}

// Game loop
function gameLoop() {
    updatePhysics();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the simulation
gameLoop();
