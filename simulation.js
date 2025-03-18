// Set up canvas and context
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Ball class to store ball information
class Ball {
    constructor(x, y, radius, restHeight, springStiffness, dampingCoefficient) {
        this.x = x; // Position of the ball (X-axis)
        this.y = y; // Position of the ball (Y-axis)
        this.radius = radius; // Radius of the ball
        this.restHeight = restHeight; // Rest height for spring behavior
        this.springStiffness = springStiffness; // Spring stiffness constant
        this.dampingCoefficient = dampingCoefficient; // Damping coefficient
        this.velocity = 0; // Initial velocity of the ball
        this.acceleration = 0; // Initial acceleration of the ball
        this.mass = 1; // Mass of the ball (default to 1)
    }

    // Method to draw the ball on the canvas
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'orange'; // Fill color
        ctx.fill();
        ctx.closePath();
    }

    // Method to apply a force to the ball
    applyForce(force) {
        const acceleration = force / this.mass;
        this.velocity += acceleration;
    }

    // Method to update the position of the ball based on velocity and apply spring force
    update() {
        // Simple gravity force (you can replace with custom forces later)
        const gravity = 9.81;
        const springForce = -this.springStiffness * (this.y - this.restHeight); // Spring force (Hooke's Law)
        const dampingForce = -this.dampingCoefficient * this.velocity; // Damping force

        // Total force = gravity + spring force + damping force
        const totalForce = gravity + springForce + dampingForce;
        this.applyForce(totalForce);

        // Update velocity and position based on time step (assuming deltaTime is fixed for now)
        this.velocity *= 0.99; // Damping effect
        this.y += this.velocity; // Update position based on velocity

        // Prevent the ball from falling below the ground
        if (this.y + this.radius >= canvas.height) {
            this.y = canvas.height - this.radius; // Stop at the bottom
            this.velocity = -this.velocity/2; // Reset velocity on ground contact
        }
    }
}

// Create a ball instance
const ball = new Ball(400, 100, 30, 300, 0.05, 0.1);

// Function to animate and update the simulation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before each new frame

    ball.update(); // Update the ball's position based on physics
    ball.draw(); // Redraw the ball at the new position

    requestAnimationFrame(animate); // Continue animation
}

// Start the animation loop
animate();
