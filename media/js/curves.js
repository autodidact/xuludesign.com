/* Code adapted from http://hakim.se/experiments/html5/wave/03/js/hakim.wave.js
 */

function Wave(wh, ww, color) {
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    counter = 0;

    var params = {
        density: 0.75,
        friction: 1.10,
        mouse_pull: 0.09,
        aoe: 200,
        twitch_interval: 2000,
        no_particles: 20,
        mass: 10,
    };

    var mouse  = {
        x: 0,
        y: 0,
        sx: 0,
        sy: 0,
    }

    this.Initialize = function() {
        
        this.particles = [];

        for (var i=0; i < params.no_particles + 3; i++) {
            this.particles.push({
                x: 400/(params.no_particles-1) * (i-2),
                y: wh+(20*Math.random()-10),
                prev: {x:0, y: wh},
                velocity: {x: 0, y: Math.random()*2},
                force: {x:0, y:0},
            });
        }
            //$(canvas).mousemove(MouseMove);
            //$(window).resize(ResizeCanvas);

            //timeUpdateInterval = setInterval(TimeUpdate, 40);
            //twitchInterval = setInterval( Twitch, params.twitch_interval );
            //ResizeCanvas();
        console.log(this.particles);
    }

    this.Draw = function(context) {
        context.fillStyle = color;
        //context.lineWidth = 20;
        
        context.beginPath();
        startx = (this.particles[0].x)// - this.particles[1].x)/2;
        starty = (this.particles[0].y)// - this.particles[1].y)/2;
        context.moveTo(startx, starty);

        var length = this.particles.length;
        for (var i = 2; i < length-1; i++) {
            curr = this.particles[i];
            prev = this.particles[i-1];
            next = this.particles[i+1];

            counter += 1
            if (prev && next) {

                var forceY = 0;
                forceY += params.density * (curr.y - prev.y);
                forceY += params.density * (curr.y - next.y);
                forceY += params.density/15 * (curr.y - curr.prev.y);

                curr.velocity.y += - (forceY/params.mass) + curr.force.y;
                curr.velocity.y /= params.friction;
                curr.force.y /= params.friction;
                //curr.y += curr.velocity.y

                curr.y *= Math.sin(counter);
                endx = (curr.x + prev.x) / 2
                endy = (curr.y + prev.y) / 2
                context.quadraticCurveTo(prev.x, prev.y, endx, endy);
            }
            console.log(this.particles);
        }

        context.lineTo(this.particles[length-1].x, this.particles[length-1].y);
        //context.lineTo(WIDTH, HEIGHT-100);
        //context.lineTo(0, HEIGHT-100);
        //context.closePath();
        //context.fill();
        context.strokeStyle = 'blue';
        context.stroke();

    }

    function Distance(p1, p2) {
        var dx = p1.x - p2.x
        var dy = p1.y - p2.y

        return Math.sqrt(dx*dx, dy*dy)
    }

    function MouseMove(e) {
        mouse.sx = Math.max(Math.min(e.layerX - mouse.x, 40), -40);
        mouse.sy = Math.max(Math.min(e.layerY - mouse.y, 40), -40);

        mouse.x = e.layerX
        mouse.y = e.layerY
    }

    this.Twitch = function() {
        //if (ms.x < 6 || ms.y < 6) {
            var force = 1 * (2*Math.random() - 1)
            this.InsertImpulse(Math.random() * WIDTH, force)
        //}
    }

    this.InsertImpulse = function(x, force) {
        var particle = this.particles[Math.round(x/WIDTH * this.particles.length)]
        if (particle) {
            particle.force.y += force;
        }
    }

    this.Initialize();
}

