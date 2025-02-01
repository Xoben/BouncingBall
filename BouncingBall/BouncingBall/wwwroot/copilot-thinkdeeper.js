window.simulation = {
    start: function (dotNetHelper) {
        const canvas = document.getElementById('simulationCanvas');
        const context = canvas.getContext('2d');
        
        function animate() {
            console.log('animate');
            dotNetHelper.invokeMethodAsync('UpdateSimulation').then(data => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                console.log('UpdateSimulation');
                // Draw Hexagon
                drawHexagon(context, data.hexagon);

                // Draw Ball
                drawBall(context, data.ball);

                requestAnimationFrame(animate);
            });
        }

        function drawHexagon(ctx, hexagon) {
            
            ctx.save();
            ctx.translate(hexagon.centerX, hexagon.centerY);
            ctx.rotate(hexagon.rotation);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                let angle = i * (Math.PI / 3);
                let x = hexagon.radius * Math.cos(angle);
                let y = hexagon.radius * Math.sin(angle);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.strokeStyle = '#000';
            ctx.stroke();
            ctx.restore();
        }

        function drawBall(ctx, ball) {
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
        }

        animate();
    }
};
