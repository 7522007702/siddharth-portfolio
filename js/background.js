/* =========================================================
   SIDDHARTH.DEV
   LIVE PROGRAMMING BACKGROUND ENGINE
========================================================= */

"use strict";


(() => {

    const canvas =
        document.getElementById("background-canvas");

    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d", {
            alpha: true
        });


    let width = 0;
    let height = 0;
    let dpr = 1;

    let animationFrame = 0;

    let mouseX = 0;
    let mouseY = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const CONFIG = {

        particles: 85,

        rain: 90,

        stars: 70,

        maxPixelRatio: 2,

        particleSpeed: .25,

        rainSpeedMin: 5,

        rainSpeedMax: 13

    };


    const particles = [];
    const rain = [];
    const stars = [];


    /* =====================================================
       RANDOM
    ===================================================== */

    const random =
        (min, max) =>
            Math.random() * (max - min) + min;


    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

        dpr =
            Math.min(
                window.devicePixelRatio || 1,
                CONFIG.maxPixelRatio
            );

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        canvas.width =
            Math.floor(width * dpr);

        canvas.height =
            Math.floor(height * dpr);

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

        initialize();

    }


    /* =====================================================
       PARTICLE
    ===================================================== */

    function createParticle() {

        return {

            x: random(0, width),

            y: random(0, height),

            radius: random(.4, 1.7),

            speedX: random(-.15, .15),

            speedY: random(
                -.05,
                CONFIG.particleSpeed
            ),

            alpha: random(.15, .6),

            phase: random(0, Math.PI * 2)

        };

    }


    /* =====================================================
       RAIN
    ===================================================== */

    function createRain() {

        return {

            x: random(0, width),

            y: random(-height, height),

            length: random(8, 25),

            speed: random(
                CONFIG.rainSpeedMin,
                CONFIG.rainSpeedMax
            ),

            alpha: random(.04, .16)

        };

    }


    /* =====================================================
       STARS
    ===================================================== */

    function createStar() {

        return {

            x: random(0, width),

            y: random(0, height * .7),

            radius: random(.2, 1),

            alpha: random(.1, .4),

            phase: random(0, Math.PI * 2)

        };

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initialize() {

        particles.length = 0;
        rain.length = 0;
        stars.length = 0;


        const particleCount =
            width < 700
                ? Math.floor(CONFIG.particles * .55)
                : CONFIG.particles;


        const rainCount =
            width < 700
                ? Math.floor(CONFIG.rain * .5)
                : CONFIG.rain;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {
            particles.push(
                createParticle()
            );
        }


        for (
            let i = 0;
            i < rainCount;
            i++
        ) {
            rain.push(
                createRain()
            );
        }


        for (
            let i = 0;
            i < CONFIG.stars;
            i++
        ) {
            stars.push(
                createStar()
            );
        }

    }


    /* =====================================================
       DRAW BACKGROUND
    ===================================================== */

    function drawBackground() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /* sky glow */

        const gradient =
            ctx.createRadialGradient(
                width * .5,
                height * .3,
                0,
                width * .5,
                height * .3,
                Math.max(width, height) * .7
            );

        gradient.addColorStop(
            0,
            "rgba(20,50,75,.16)"
        );

        gradient.addColorStop(
            .45,
            "rgba(8,20,35,.06)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

    }


    /* =====================================================
       DRAW STARS
    ===================================================== */

    function drawStars(time) {

        stars.forEach(star => {

            const twinkle =
                star.alpha +
                Math.sin(
                    time * .001 +
                    star.phase
                ) * .08;

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(150,220,255,${Math.max(
                    .02,
                    twinkle
                )})`;

            ctx.fill();

        });

    }


    /* =====================================================
       DRAW PARTICLES
    ===================================================== */

    function drawParticles(time) {

        particles.forEach(particle => {

            particle.x +=
                particle.speedX;

            particle.y +=
                particle.speedY;

            if (particle.x < -10) {
                particle.x = width + 10;
            }

            if (particle.x > width + 10) {
                particle.x = -10;
            }

            if (particle.y > height + 10) {
                particle.y = -10;
            }


            const pulse =
                particle.alpha +
                Math.sin(
                    time * .0015 +
                    particle.phase
                ) * .1;


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(102,247,212,${Math.max(
                    .02,
                    pulse
                )})`;

            ctx.fill();

        });

    }


    /* =====================================================
       DRAW RAIN
    ===================================================== */

    function drawRain() {

        ctx.lineWidth = .6;

        rain.forEach(drop => {

            drop.y += drop.speed;

            drop.x -= drop.speed * .07;


            if (drop.y > height + 30) {

                drop.y =
                    random(-height * .3, -20);

                drop.x =
                    random(0, width);

            }


            ctx.beginPath();

            ctx.moveTo(
                drop.x,
                drop.y
            );

            ctx.lineTo(
                drop.x - 2,
                drop.y + drop.length
            );

            ctx.strokeStyle =
                `rgba(100,180,220,${drop.alpha})`;

            ctx.stroke();

        });

    }


    /* =====================================================
       PARALLAX
    ===================================================== */

    function updateParallax() {

        mouseX +=
            (targetMouseX - mouseX) * .035;

        mouseY +=
            (targetMouseY - mouseY) * .035;


        const city =
            document.querySelector(".city");

        const terminals =
            document.querySelectorAll(
                ".bg-terminal"
            );

        if (city) {

            city.style.transform =
                `translate3d(
                    ${mouseX * -0.015}px,
                    ${mouseY * -0.008}px,
                    0
                )`;

        }


        terminals.forEach(
            (terminal, index) => {

                const multiplier =
                    index === 0
                        ? -.025
                        : .025;

                terminal.style.marginLeft =
                    `${mouseX * multiplier}px`;

                terminal.style.marginTop =
                    `${mouseY * multiplier}px`;

            }
        );

    }


    /* =====================================================
       MOUSE
    ===================================================== */

    window.addEventListener(
        "mousemove",
        event => {

            targetMouseX =
                event.clientX -
                width / 2;

            targetMouseY =
                event.clientY -
                height / 2;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       TOUCH
    ===================================================== */

    window.addEventListener(
        "touchmove",
        event => {

            const touch =
                event.touches[0];

            if (!touch) {
                return;
            }

            targetMouseX =
                touch.clientX -
                width / 2;

            targetMouseY =
                touch.clientY -
                height / 2;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    function animate(time) {

        drawBackground();

        drawStars(time);

        drawParticles(time);

        drawRain();

        updateParallax();

        animationFrame =
            requestAnimationFrame(
                animate
            );

    }


    /* =====================================================
       VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                cancelAnimationFrame(
                    animationFrame
                );

            } else {

                animationFrame =
                    requestAnimationFrame(
                        animate
                    );

            }

        }
    );


    /* =====================================================
       INIT
    ===================================================== */

    window.addEventListener(
        "resize",
        resize,
        {
            passive: true
        }
    );


    resize();

    animationFrame =
        requestAnimationFrame(
            animate
        );

})();