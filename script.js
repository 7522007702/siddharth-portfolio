/* =========================================================
   SIDDHARTH DEVELOPER PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPreloader();

    initNavbar();

    initMobileMenu();

    initScrollReveal();

    initBackToTop();

    initActiveNavigation();

    initCustomCursor();

    initSmoothLinks();

    initTerminalInteraction();

    initProjectHover();

});


/* =========================================================
   PRELOADER
========================================================= */

function initPreloader() {

    const preloader =
        document.getElementById("preloader");

    if (!preloader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("loaded");

        }, 1200);

    });

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar =
        document.getElementById("navbar");

    if (!navbar) return;


    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById("mobileMenuBtn");

    const menu =
        document.getElementById("navMenu");

    if (!button || !menu) return;


    button.addEventListener("click", () => {

        button.classList.toggle("active");

        menu.classList.toggle("open");

        document.body.classList.toggle(
            "menu-open"
        );

    });


    const links =
        menu.querySelectorAll(".nav-link");


    links.forEach(link => {

        link.addEventListener("click", () => {

            button.classList.remove("active");

            menu.classList.remove("open");

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById("backToTop");

    if (!button) return;


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 600) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        },
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            const href =
                                link.getAttribute(
                                    "href"
                                );


                            if (
                                href === `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.25,
                rootMargin:
                    "-20% 0px -60% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCustomCursor() {

    const dot =
        document.querySelector(
            ".cursor-dot"
        );

    const outline =
        document.querySelector(
            ".cursor-outline"
        );


    if (!dot || !outline) return;


    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (isTouchDevice) {

        dot.style.display = "none";
        outline.style.display = "none";

        return;

    }


    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;

            mouseY = event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.15;

        outlineY +=
            (mouseY - outlineY) * 0.15;


        outline.style.left =
            `${outlineX}px`;

        outline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactiveElements =
        document.querySelectorAll(
            "a, button, .skill-card, .project-card"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                outline.classList.add(
                    "hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                outline.classList.remove(
                    "hover"
                );

            }
        );

    });

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                const navbar =
                    document.getElementById(
                        "navbar"
                    );


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    navbarHeight
                    -
                    10;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   TERMINAL INTERACTION
========================================================= */

function initTerminalInteraction() {

    const terminal =
        document.querySelector(
            ".terminal-window"
        );

    if (!terminal) return;


    terminal.addEventListener(
        "mouseenter",
        () => {

            terminal.style.borderColor =
                "rgba(124,255,107,0.25)";

        }
    );


    terminal.addEventListener(
        "mouseleave",
        () => {

            terminal.style.borderColor =
                "rgba(255,255,255,0.09)";

        }
    );

}


/* =========================================================
   PROJECT HOVER
========================================================= */

function initProjectHover() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -4;


                const rotateY =
                    ((x / rect.width) - 0.5) * 4;


                card.style.transform =
                    `translateY(-8px)
                     perspective(700px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================================
   TERMINAL TYPING EFFECT
========================================================= */

function terminalTypingEffect() {

    const element =
        document.querySelector(
            ".typing-small"
        );

    if (!element) return;


    const commands = [
        "whoami",
        "code",
        "build",
        "create",
        "learn"
    ];


    let commandIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    function type() {

        const currentCommand =
            commands[commandIndex];


        if (!deleting) {

            element.textContent =
                currentCommand.substring(
                    0,
                    characterIndex + 1
                );

            characterIndex++;


            if (
                characterIndex ===
                currentCommand.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    1200
                );

                return;

            }

        } else {

            element.textContent =
                currentCommand.substring(
                    0,
                    characterIndex - 1
                );

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                commandIndex =
                    (commandIndex + 1)
                    % commands.length;

            }

        }


        setTimeout(
            type,
            deleting ? 50 : 100
        );

    }


    type();

}


/* =========================================================
   START TERMINAL TYPING
========================================================= */

terminalTypingEffect();


/* =========================================================
   PARALLAX HERO TERMINAL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        const terminal =
            document.querySelector(
                ".hero-terminal-wrap"
            );


        if (!terminal) return;


        if (window.innerWidth <= 850) {
            return;
        }


        const scroll =
            window.scrollY;


        if (scroll < 900) {

            terminal.style.transform =
                `translateY(${scroll * 0.06}px)`;

        }

    },
    { passive: true }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "hidden"
        ) {

            document.title =
                "Come back • Siddharth";

        } else {

            document.title =
                "Siddharth — Developer Portfolio";

        }

    }
);


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%c<Siddharth />",
    `
        color:#7cff6b;
        font-size:24px;
        font-weight:bold;
        font-family:monospace;
    `
);

console.log(
    "%cWelcome to Siddharth's portfolio.",
    `
        color:#aab4c2;
        font-size:13px;
        font-family:monospace;
    `
);

console.log(
    "%cBuild. Learn. Improve.",
    `
        color:#7cff6b;
        font-size:12px;
        font-family:monospace;
    `
);