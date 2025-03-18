<template>
    <section id="timeline">
        <div class="timeline">
            <canvas id="cvs3" ref="canvas"></canvas>
            <article>
                <h2>Education</h2>
                <figure>
                    <figcaption>Lorem</figcaption>
                    <h6>2011 - NOW</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero. Ut ut libero in nibh convallis sollicitudin. Maecenas ante erat, lacinia commodo pretium vel, ultricies eget nibh. Duis et felis lectus. Donec orci libero, auctor eget sodales at, euismod venenatis nibh.
                    </p>
                </figure>
                <figure>
                    <figcaption>ipsum</figcaption>
                    <h6>2013</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                    </p>
                </figure>
                <figure>
                    <figcaption>consectetur</figcaption>
                    <h6>2007 - 2010</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                    </p>
                </figure>
                <figure>
                    <figcaption>sit amet</figcaption>
                    <h6>2009</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                    </p>
                </figure>
            </article>

            <article>
                <h2>Work</h2>
                <figure>
                    <figcaption>ornare</figcaption>
                    <h6>2012 - 06.2013</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                    </p>
                </figure>
                <figure>
                    <figcaption>libero</figcaption>
                    <h6>2010 - 2011</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                    </p>
                </figure>
                <figure>
                    <figcaption>adipiscing</figcaption>
                    <h6>2010</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et ipsum pulvinar, blandit neque in, ornare libero.
                    </p>
                </figure>
            </article>
            <br style="clear:both" />
        </div>
    </section>
</template>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    color: #2C2C2C;
    min-width: 600px;
    height: 100%;
    background: white;
    font: 400 1em 'Lato';
    -webkit-font-smoothing: antialiased;
}

#timeline {
    padding-top: 5%;
}

.timeline {
    height: 100%;
    position: relative;

    canvas {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    figcaption {
        font: 900 190% 'Lato';
        text-transform: uppercase;
        -webkit-text-stroke: .25px;
    }

    h2 {
        font: 400 400% 'Raleway';
        padding-bottom: 100px;
        color: #b2cde9;
    }

    h6 {
        color: #0090F5;
        font: 400 80% Tahoma;
    }

    p, ol {
        font: 400 95% 'Raleway';
        padding: 3px 0 20px 0;
        color: #575757;
        text-align: justify;
        width: 70%;
    }

    ol {
        list-style: disc;
        margin-top: -20px;
        padding-left: 40px;
    }

    figure {
        float: right;
        width: 100%;
    }

    article {
        position: relative;
        width: 38%;
        overflow: hidden;
        margin-bottom: 100px;

        &:first-of-type {
            float: left;
            text-align: right;

            p, figure {
                float: right;
            }
        }

        &:last-of-type {
            float: right;

            h2 {
                color: #c6e0aa;
            }

            h6, a {
                color: #40aa00;
            }

            a:hover {
                color: #95D40D;
            }
        }
    }
}
</style>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let ctx = null;
let rafid = 0;
let mouse = { x: 0, y: 0 };
let paused = true;

const self = reactive({
    lines: [],
    isOK: false,
    options: {
        speed: 0.1,
        density: 8,
        radius: 600,
    },
    targets: [
        [29, 32, 48, 68],
        [29, 33, 38]
    ],
    dotColors: [
        ['#13669b', 'rgba(19, 102, 155, 0.3)', 'rgba(19, 102, 155, 0.08)'],
        ['#7dd317', 'rgba(113, 222, 15, 0.3)', 'rgba(91, 164, 22, 0.12)'],
    ],
});

function isPaused() {
    return paused;
}

function InitDots() {
    const tl = document.querySelector('.timeline');
    const top = tl.querySelector('h2').offsetHeight;

    self.lines[0].dots = [];
    let y = top;
    tl.querySelectorAll('article:first-of-type figure').forEach((figure) => {
        self.lines[0].dots.push([figure.offsetWidth + 20, y + 20]);
        y += figure.offsetHeight;
    });

    self.lines[1].dots = [];
    y = top;
    tl.querySelectorAll('article:last-of-type figure').forEach((figure) => {
        self.lines[1].dots.push([canvas.value.offsetWidth - figure.offsetWidth - 20, y + 20]);
        y += figure.offsetHeight;
    });
}

function OnResize() {
    canvas.value.width = canvas.value.offsetWidth;
    canvas.value.height = canvas.value.offsetHeight;

    const wasPaused = paused;
    toggle(false);
    // Init lines
    self.lines[0].reset(canvas.value.offsetWidth / 2 - 15);
    self.lines[1].reset(canvas.value.offsetWidth / 2 + 15);

    InitDots();

    toggle(!wasPaused);
}

function init() {
    let result = false;
    try {
        result = !!(canvas.value.getContext && (ctx = canvas.value.getContext('2d')));

        self.lines[0] = new Line(0, canvas.value.offsetHeight - 100, '#4789a3', self.options, mouse);
        self.lines[1] = new Line(0, canvas.value.offsetHeight - 100, '#a0d59c', self.options, mouse);
    } catch (e) {
        return false;
    }

    canvas.value.addEventListener('mousemove', (e) => {
        if (e.offsetX) {
            mouse.x = e.offsetX;
            mouse.y = e.offsetY;
        } else if (e.layerX) {
            mouse.x = e.layerX;
            mouse.y = e.layerY;
        } else {
            mouse.x = e.pageX - canvas.value.offsetLeft;
            mouse.y = e.pageY - canvas.value.offsetTop;
        }
    });

    window.addEventListener('resize', OnResize);

    OnResize();

    return result;
}

function Line(y, height, color, options, mouse) {
    const self = this;

    self.color = color;
    self.options = options;
    self.mouse = mouse;
    self.height = height;
    self.dots = [];
    self.y = y;

    self.points = [];

    self.reset = function (x) {
        self.points = [];
        for (let y = self.y; y < self.height; y += self.options.density) {
            self.points.push(new Point(x, y, self.color));
        }
    };

    self.update = function () {
        for (let i = 0; i < self.points.length; i++) {
            self.points[i].update(self.mouse, self.options);
        }
    };

    function Point(x, y) {
        this.y = y;
        this.x = x;
        this.base = { x: x, y: y };

        this.update = function (mouse, options) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const alpha = Math.atan2(dx, dy);
            const d = options.radius / Math.sqrt(dx * dx + dy * dy);

            this.y += Math.cos(alpha) * d + (this.base.y - this.y) * options.speed;
            this.x += Math.sin(alpha) * d + (this.base.x - this.x) * options.speed;
        };
    }
}

function drawCircle(p, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
}

function drawLine(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.closePath();
}

function redraw() {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    for (let i = 0; i < 2; i++) {
        const points = self.lines[i].points;

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = self.lines[i].color;
        ctx.moveTo(points[15].x, points[15].y);

        for (let j = 15; j < points.length - 2; j++) {
            const point = points[j];

            const xc = (points[j + 1].x + point.x) / 2;
            const yc = (points[j + 1].y + point.y) / 2;

            ctx.quadraticCurveTo(point.x, point.y, xc, yc);
        }
        ctx.stroke();
        ctx.closePath();

        // Dots
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = self.dotColors[i][2];
        for (let j = 0; j < self.lines[i].dots.length; j++) {
            const dot = self.lines[i].dots[j];
            const id = self.targets[i][j];
            const dot2 = [
                (self.lines[i].points[id].x + self.lines[i].points[id + 1].x) / 2,
                (self.lines[i].points[id].y + self.lines[i].points[id + 1].y) / 2,
            ];

            const p1 = { x: dot[0], y: dot[1] };
            const p2 = { x: dot2[0], y: dot2[1] };

            drawLine(p1, p2);
            drawCircle(p1, 3, self.dotColors[i][0]);

            drawCircle(p2, 11, self.dotColors[i][1]);
            drawCircle(p2, 5.5, self.dotColors[i][0]);
        }
    }
}

function animate() {
    rafid = requestAnimationFrame(animate);

    self.lines[0].update();
    self.lines[1].update();

    redraw();
}

function toggle(run) {
    if (!self.isOK) return false;

    if (run === undefined) {
        toggle(!paused);
    } else if (run && paused) {
        paused = false;
        animate();
    } else if (!run) {
        paused = true;
        cancelAnimationFrame(rafid);
    }
    return true;
}

onMounted(() => {
    self.isOK = init();
    toggle(true);
});

onUnmounted(() => {
    toggle(false);
});
</script>