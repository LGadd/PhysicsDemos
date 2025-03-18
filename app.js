// Select canvas and get 2D context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 500;
canvas.height = 500;

// Ball settings
const ball = {
    x: 250,
    y: 300,
    radius: 20,
    velocityX: 0,
    velocityY: 0,
    mass: 1
};

// Spring settings
let restHeight = 300;
let springStiffness = 20;
let dampingCoefficient = 2;
let velocity = { x: 0, y: 0 };

// Update sliders dynamically
const restHeightSlider = document.getElementById('rest-height');
const springStiffnessSlider = document.getElementById('spring-stiffness');
const dampingCoefficientSlider = document.getElementById('damping-coefficient');
const restHeightValue = document.getElementById('rest-height-value');
const springStiffnessValue = document.getElementById('spring-stiffness-value');
const dampingCoefficientValue = document.getElementById('damping-coefficient-value');

// Update slider values
restHeightSlider.addEventListener('input', () => {
    restHeight = restHeightSlider.value;
    restHeightValue.textContent = restHeight;
});

springStiffnessSlider.addEventListener('input', () => {
    springStiffness = springStiffnessSlider.value;
    springStiffnessValue.textContent = springStiffness;
});

dampingCoefficientSlider.addEventListener('input', () => {
    dampingCoefficient = dampingCoefficientSlider.value;
    dampingCoefficientValue.textContent = dampingCoefficient;
});

// Impulse application
const impulseButton = document.getElementById('apply-impulse');
impulseButton.addEventListener('click', () => {
    const impulseX = parseFloat(document.getElementById('impulse-x').value) || 0;
    const impulseY = parseFloat(document.getElementById('impulse-y').value) || 0;
    
    // Apply impulse as force
    ball.velocityX += impulseX / ball.mass;
    ball.velocityY += impulseY / ball.mass;
});

// Physics calculations
function updatePhysics() {
    // Gravity
    const gravity = 0.5;
    const forceGravity = ball.mass * gravity;

    // Spring force (Hooke's law)
    const springForce = -springStiffness * (ball.y - restHeight);
    
    // Damping force
    const dampingForce = -dampingCoefficient * ball.velocityY;

    // Net force in Y direction
    const netForceY = springForce + dampingForce + forceGravity;

    // Update velocity and position using simple physics equations
    const accelerationY = netForceY / ball.mass;
    ball.velocityY += accelerationY;
    ball.y += ball.velocityY;

    // Set velocity display
    document.getElementById('velocity').textContent = `${ball.velocityX.toFixed(2)}, ${ball.velocityY.toFixed(2)}`;

    // Update the rest height line (vertical line starting from bottom of the circle)
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y + ball.radius); // Start from bottom of the circle
    ctx.lineTo(ball.x, restHeight); // Rest height line
    ctx.strokeStyle = "#ff8c00";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9e1b";
    ctx.fill();
    ctx.strokeStyle = "#d87c00";
    ctx.stroke();

    // Update physics
    updatePhysics();

    // Draw the rest height line
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y + ball.radius);
    ctx.lineTo(ball.x, restHeight);
    ctx.strokeStyle = "#ff8c00";
    ctx.lineWidth = 2;
    ctx.str
