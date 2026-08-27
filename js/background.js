"use strict";

/*
=========================================================
LIVE PROGRAMMING BACKGROUND
=========================================================

This creates a lightweight animated programming/data
background using Canvas.

No external library is required.
=========================================================
*/

(function () {

    const canvas =
        document.getElementById("programmingCanvas");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let width = 0;
    let height = 0;

    let animationFrame = null;

    const symbols = [
        "01",
        "10",
        "{}",
        "[]",
        "()",
        "</>",
        "=>",
        "&&",
        "||",
        "SQL",
        "JS",
        "PY",
        "CSS",
        "HTML",
        "SELECT",
        "FROM",
        "JOIN",
        "const",
        "function",
        "return",
        "async",
        "await",
        "API",
        "DATA",
        "AI",
        "git"
    ];


    const particles = [];


    const config = {

        particleCount:
            window.innerWidth < 700
                ? 35
                : 70,

        speed: 0.25,

        opacity:
            0.25,

        fontSize:
            11

    };


    function resizeCanvas() {

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;

        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }


    function random(min, max) {

        return (
            Math.random() *
            (max - min)
        ) + min;

    }


    function createParticle() {

        return {

            x:
                random(0, width),

            y:
                random(0, height),

            speed:
                random(
                    config.speed * .5,
                    config.speed * 1.8
                ),

            opacity:
                random(.05, config.opacity),

            symbol:
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ],

            size:
                random(9, config.fontSize + 2),

            drift:
                random(-.18, .18)

        };

    }


    function initialize() {

        particles.length = 0;

        for (
            let i = 0;
            i < config.particleCount;
            i++
        ) {

            particles.push(
                createParticle()
            );

        }

    }


    function drawGrid() {

        const spacing = 80;

        ctx.save();

        ctx.strokeStyle =
            "rgba(56,189,248,.025)";

        ctx.lineWidth = 1;

        for (
            let x = 0;
            x < width;
            x += spacing
        ) {

            ctx.beginPath();

            ctx.moveTo(x, 0);

            ctx.lineTo(x, height);

            ctx.stroke();

        }


        for (
            let y = 0;
            y < height;
            y += spacing
        ) {

            ctx.beginPath();

            ctx.moveTo(0, y);

            ctx.lineTo(width, y);

            ctx.stroke();

        }

        ctx.restore();

    }


    function drawParticle(particle) {

        ctx.save();

        ctx.font =
            `${particle.size}px "Courier New", monospace`;

        ctx.fillStyle =
            `rgba(56,189,248,${particle.opacity})`;

        ctx.fillText(
            particle.symbol,
            particle.x,
            particle.y
        );

        ctx.restore();

    }


    function updateParticle(particle) {

        particle.y +=
            particle.speed;

        particle.x +=
            particle.drift;

        if (
            particle.y >
            height + 40
        ) {

            particle.y =
                -40;

            particle.x =
                random(0, width);

        }

        if (
            particle.x >
            width + 80
        ) {

            particle.x = -80;

        }

        if (
            particle.x <
            -80
        ) {

            particle.x =
                width + 80;

        }

    }


    function drawConnections() {

        const maxDistance = 130;

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const a =
                    particles[i];

                const b =
                    particles[j];

                const dx =
                    a.x - b.x;

                const dy =
                    a.y - b.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (
                    distance <
                    maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            distance /
                            maxDistance
                        ) * .05;

                    ctx.strokeStyle =
                        `rgba(56,189,248,${opacity})`;

                    ctx.beginPath();

                    ctx.moveTo(
                        a.x,
                        a.y
                    );

                    ctx.lineTo(
                        b.x,
                        b.y
                    );

                    ctx.stroke();

                }

            }

        }

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        drawGrid();

        drawConnections();


        particles.forEach(
            particle => {

                updateParticle(
                    particle
                );

                drawParticle(
                    particle
                );

            }
        );


        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    function start() {

        resizeCanvas();

        initialize();

        animate();

    }


    let resizeTimeout;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimeout
            );

            resizeTimeout =
                setTimeout(
                    () => {

                        resizeCanvas();

                        initialize();

                    },
                    150
                );

        }
    );


    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                if (animationFrame) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                    animationFrame =
                        null;

                }

            } else {

                if (!animationFrame) {

                    animate();

                }

            }

        }
    );


    start();

})();