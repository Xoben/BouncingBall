// wwwroot/scripts/canvasInterop.js
export function drawScene(canvas, ballX, ballY, ballRadius, hexagonRotation) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw the rotating hexagon.
    const centerX = width / 2;
    const centerY = height / 2;
    const hexRadius = 250;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(hexagonRotation);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3;
        const x = hexRadius * Math.cos(angle);
        const y = hexRadius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();

    // Draw the ball.
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}
