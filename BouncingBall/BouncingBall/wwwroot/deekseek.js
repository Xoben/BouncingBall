class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 2; // Initial horizontal velocity
        this.vy = 0; // Initial vertical velocity
        this.gravity = 0.1; // Gravity effect
        this.friction = 0.99; // Friction effect
    }

    update(hexagonAngle) {
        // Apply gravity
        this.vy += this.gravity;

        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Check collision with hexagon walls
        const hexRadius = 150;
        const centerX = 200;
        const centerY = 200;

        // Convert ball position to hexagon's local coordinate system
        const angle = hexagonAngle * Math.PI / 180;
        const dx = this.x - centerX;
        const dy = this.y - centerY;
        const rotatedX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
        const rotatedY = dx * Math.sin(-angle) + dy * Math.cos(-angle);

        // Check if ball is outside the hexagon
        const distance = Math.sqrt(rotatedX * rotatedX + rotatedY * rotatedY);
        if (distance + this.radius > hexRadius) {
            // Calculate normal vector at collision point
            const normalX = rotatedX / distance;
            const normalY = rotatedY / distance;

            // Reflect velocity vector
            const dot = this.vx * normalX + this.vy * normalY;
            this.vx -= 2 * dot * normalX;
            this.vy -= 2 * dot * normalY;

            // Move ball back inside the hexagon
            const overlap = distance + this.radius - hexRadius;
            this.x -= overlap * normalX * Math.cos(angle) - overlap * normalY * Math.sin(angle);
            this.y -= overlap * normalX * Math.sin(angle) + overlap * normalY * Math.cos(angle);
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

class Hexagon {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.angle = 0;
    }

    update() {
        this.angle += 1; // Rotate hexagon
        if (this.angle >= 360) this.angle -= 360;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60) * Math.PI / 180;
            const x = this.radius * Math.cos(angle);
            const y = this.radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.restore();
    }
}

let ball, hexagon;

export function initializeSimulation(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');

    ball = new Ball(200, 100, 10, "red");
    hexagon = new Hexagon(200, 200, 150);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hexagon.update();
        hexagon.draw(ctx);

        ball.update(hexagon.angle);
        ball.draw(ctx);

        requestAnimationFrame(animate);
    }

    animate();
}

