/* =========================================================
   SIDDHARTH.DEV
   PREMIUM DEVELOPER PORTFOLIO
   JAVASCRIPT SYSTEM
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initLoader();

        initHeader();

        initMobileMenu();

        initSmoothScroll();

        initActiveNavigation();

        initBackToTop();

        initRevealAnimations();

        initTypingSystem();

        initCodeWindow();

        initCustomCursor();

        initCurrentYear();

        initTerminal();

        initKeyboardShortcuts();

        initExternalLinks();

        initMagneticButtons();

        initParallax();

        console.log(
            "%cSIDDHARTH.DEV",
            `
            color:#00ff9c;
            font-size:24px;
            font-weight:800;
            font-family:monospace;
            `
        );

        console.log(
            "%cBuild. Learn. Improve.",
            `
            color:#8d98a5;
            font-size:12px;
            font-family:monospace;
            `
        );

    }
);


/* =========================================================
   01. LOADER
========================================================= */

function initLoader() {

    const loader =
        document.querySelector(
            ".page-loader"
        );

    if (!loader) return;


    window.addEventListener(
        "load",
        () => {

            setTimeout(
                () => {

                    loader.classList.add(
                        "loaded"
                    );

                    document.body.classList.add(
                        "page-ready"
                    );

                },
                700
            );

        }
    );

}


/* =========================================================
   02. HEADER
========================================================= */

function initHeader() {

    const header =
        document.querySelector(
            ".site-header"
        );

    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 25) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   03. MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.querySelector(
            ".mobile-menu-button"
        );

    const menu =
        document.querySelector(
            ".mobile-nav"
        );

    if (!button || !menu) return;


    button.addEventListener(
        "click",
        () => {

            const opened =
                menu.classList.toggle(
                    "open"
                );


            button.setAttribute(
                "aria-expanded",
                opened
            );


            const icon =
                button.querySelector(
                    "i"
                );


            if (icon) {

                icon.className =
                    opened
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";

            }

        }
    );


    menu.querySelectorAll(
        "a"
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !menu.contains(
                    event.target
                ) &&
                !button.contains(
                    event.target
                )
            ) {

                menu.classList.remove(
                    "open"
                );

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    button.querySelector(
                        "i"
                    );


                if (icon) {

                    icon.className =
                        "fa-solid fa-bars";

                }

            }

        }
    );

}


/* =========================================================
   04. SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !id ||
                        id === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) return;


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const offset =
                        header
                            ? header.offsetHeight
                            : 0;


                    const position =
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        offset
                        -
                        10;


                    window.scrollTo({

                        top:
                            position,

                        behavior:
                            "smooth"

                    });

                }
            );

        }
    );

}


/* =========================================================
   05. ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !links.length
    ) return;


    function update() {

        let current =
            "";


        const position =
            window.scrollY + 180;


        sections.forEach(
            section => {

                if (
                    position >=
                        section.offsetTop
                    &&
                    position <
                        section.offsetTop +
                        section.offsetHeight
                ) {

                    current =
                        section.id;

                }

            }
        );


        links.forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "active-nav",
                    href === `#${current}`
                );

            }
        );

    }


    update();


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );

}


/* =========================================================
   06. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.querySelector(
            ".back-top"
        );

    if (!button) return;


    button.addEventListener(
        "click",
        event => {

            event.preventDefault();


            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );

}


/* =========================================================
   07. REVEAL ANIMATION
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".info-card, " +
            ".skill-card, " +
            ".featured-project, " +
            ".mini-project, " +
            ".timeline-item, " +
            ".philosophy-box, " +
            ".contact-card"
        );


    if (!elements.length) return;


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) return;


    elements.forEach(
        (element, index) => {

            element.style.opacity =
                "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity .7s ease, transform .7s ease";

            element.style.transitionDelay =
                `${Math.min(index * 45, 300)}ms`;

        }
    );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold:
                    0.08,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   08. TYPING SYSTEM
========================================================= */

function initTypingSystem() {

    const labels =
        document.querySelectorAll(
            ".terminal-label"
        );


    labels.forEach(
        label => {

            const original =
                label.textContent.trim();


            if (!original) return;


            /*
             * The visual terminal label is
             * intentionally kept static for
             * professional loading behavior.
             */

        }
    );

}


/* =========================================================
   09. CODE WINDOW
========================================================= */

function initCodeWindow() {

    const windowElement =
        document.querySelector(
            ".code-window"
        );


    if (!windowElement) return;


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const touch =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (
        reduceMotion ||
        touch
    ) return;


    document.addEventListener(
        "mousemove",
        event => {

            const rect =
                windowElement.getBoundingClientRect();


            if (
                event.clientX <
                    rect.left - 250 ||
                event.clientX >
                    rect.right + 250 ||
                event.clientY <
                    rect.top - 250 ||
                event.clientY >
                    rect.bottom + 250
            ) {

                return;

            }


            const centerX =
                rect.left +
                rect.width / 2;


            const centerY =
                rect.top +
                rect.height / 2;


            const x =
                (event.clientX - centerX)
                /
                rect.width;


            const y =
                (event.clientY - centerY)
                /
                rect.height;


            const rotateY =
                x * 5;


            const rotateX =
                y * -5;


            windowElement.style.transform =
                `
                perspective(1000px)
                rotateY(${rotateY}deg)
                rotateX(${rotateX}deg)
                `;

        }
    );


    windowElement.addEventListener(
        "mouseleave",
        () => {

            windowElement.style.transform =
                `
                perspective(1000px)
                rotateY(-3deg)
                rotateX(2deg)
                `;

        }
    );

}


/* =========================================================
   10. CUSTOM CURSOR
========================================================= */

function initCustomCursor() {

    const cursor =
        document.querySelector(
            ".cursor-dot"
        );


    if (!cursor) return;


    const touch =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (touch) {

        cursor.style.display =
            "none";

        return;

    }


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    function animate() {

        currentX +=
            (mouseX - currentX) * .18;

        currentY +=
            (mouseY - currentY) * .18;


        cursor.style.left =
            `${currentX}px`;

        cursor.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animate
        );

    }


    animate();


    const interactive =
        document.querySelectorAll(
            "a, button, .skill-card, " +
            ".info-card, .mini-project, " +
            ".timeline-card"
        );


    interactive.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursor.style.width =
                        "10px";

                    cursor.style.height =
                        "10px";

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursor.style.width =
                        "5px";

                    cursor.style.height =
                        "5px";

                }
            );

        }
    );

}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const elements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    const year =
        new Date().getFullYear();


    elements.forEach(
        element => {

            element.textContent =
                year;

        }
    );

}


/* =========================================================
   12. TERMINAL SYSTEM
========================================================= */

function initTerminal() {

    const terminal =
        document.querySelector(
            "[data-terminal]"
        );


    if (!terminal) return;


    const input =
        terminal.querySelector(
            "[data-terminal-input]"
        );


    const output =
        terminal.querySelector(
            ".terminal-output"
        );


    if (
        !input ||
        !output
    ) return;


    const commands = {

        help: [
            "Available commands:",
            "about",
            "skills",
            "projects",
            "education",
            "contact",
            "clear"
        ],


        about: [
            "Siddharth Mishra",
            "Developer / Programmer / Creator",
            "Based in Lucknow, India.",
            "Currently building Univichar AI."
        ],


        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "Flutter / Dart",
            "Firebase",
            "Git",
            "AI / Gemini"
        ],


        projects: [
            "01 — Univichar AI",
            "02 — Developer Portfolio",
            "03 — Music System",
            "04 — Programming Experiments"
        ],


        education: [
            "12th — UP Board PCB",
            "O Level",
            "BBA — Ambalika Institute of Management & Technology"
        ],


        contact: [
            "Phone: +91 75220 07890",
            "GitHub: siddharthmishra8",
            "LinkedIn: siddharthmishra8",
            "Instagram: siddharthmishr.a"
        ]

    };


    function printLine(
        text,
        type = "normal"
    ) {

        const line =
            document.createElement(
                "div"
            );


        if (
            type === "command"
        ) {

            line.innerHTML =
                `
                <span class="green">
                    $
                </span>
                ${escapeHTML(text)}
                `;

        } else {

            line.textContent =
                text;

            line.className =
                "terminal-response";

        }


        output.appendChild(
            line
        );


        output.scrollTop =
            output.scrollHeight;

    }


    function execute(
        rawCommand
    ) {

        const command =
            rawCommand
                .trim()
                .toLowerCase();


        if (!command) return;


        printLine(
            command,
            "command"
        );


        if (
            command === "clear"
        ) {

            output.innerHTML =
                "";

            return;

        }


        if (
            !commands[command]
        ) {

            printLine(
                `command not found: ${command}`
            );

            printLine(
                "Type 'help' to see available commands."
            );

            return;

        }


        commands[command].forEach(
            line => {

                printLine(
                    line
                );

            }
        );

    }


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) return;


            execute(
                input.value
            );


            input.value =
                "";

        }
    );

}


/* =========================================================
   13. KEYBOARD SHORTCUTS
========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            const target =
                event.target;


            const typing =
                target &&
                (
                    target.tagName ===
                        "INPUT"
                    ||
                    target.tagName ===
                        "TEXTAREA"
                    ||
                    target.isContentEditable
                );


            /*
             * / = terminal
             */

            if (
                event.key === "/" &&
                !typing
            ) {

                const input =
                    document.querySelector(
                        "[data-terminal-input]"
                    );


                if (input) {

                    event.preventDefault();

                    input.focus();

                }

            }


            /*
             * ESC = close mobile menu
             */

            if (
                event.key === "Escape"
            ) {

                const menu =
                    document.querySelector(
                        ".mobile-nav"
                    );

                const button =
                    document.querySelector(
                        ".mobile-menu-button"
                    );


                if (menu) {

                    menu.classList.remove(
                        "open"
                    );

                }


                if (button) {

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        button.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }

            }

        }
    );

}


/* =========================================================
   14. EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

    document.querySelectorAll(
        'a[href^="http"]'
    ).forEach(
        link => {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );

}


/* =========================================================
   15. MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    const touch =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (touch) return;


    buttons.forEach(
        button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `
                        translate(
                            ${x * .08}px,
                            ${y * .08}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   16. PARALLAX
========================================================= */

function initParallax() {

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (!heroVisual) return;


    const touch =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    const reduced =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        touch ||
        reduced
    ) return;


    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;


            if (
                scroll > window.innerHeight
            ) return;


            heroVisual.style.transform =
                `translateY(${scroll * .05}px)`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   17. ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* =========================================================
   18. GLOBAL PORTFOLIO OBJECT
========================================================= */

window.SiddharthPortfolio = {

    name:
        "Siddharth Mishra",

    displayName:
        "Siddharth",

    role:
        "Developer / Programmer",

    location:
        "Lucknow, India",

    mainProject:
        "Univichar AI",

    github:
        "siddharthmishra8",

    linkedin:
        "siddharthmishra8",

    instagram:
        "siddharthmishr.a",

    version:
        "2.0.0",

    status:
        "ONLINE"

};