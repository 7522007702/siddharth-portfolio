/* =========================================================
   SIDDHARTH.DEV
   PREMIUM DEVELOPER PORTFOLIO
   PART 3 — script.js
========================================================= */

"use strict";


/* =========================================================
   01. GLOBAL HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   02. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();

    initializeHeader();

    initializeMobileMenu();

    initializeSmoothNavigation();

    initializeActiveNavigation();

    initializeBackToTop();

    initializeCursor();

    initializeRevealAnimations();

    initializeCodeTyping();

    initializeTerminalTyping();

    initializeHeroParallax();

    initializeContactActions();

    initializeCurrentYear();

    initializeExternalLinks();

});


/* =========================================================
   03. PAGE LOADER
========================================================= */

function initializeLoader() {

    const loader = $(".page-loader");

    if (!loader) {
        return;
    }

    const minimumDisplayTime = 900;

    const startTime = performance.now();

    window.addEventListener("load", () => {

        const elapsed = performance.now() - startTime;

        const remainingTime =
            Math.max(
                0,
                minimumDisplayTime - elapsed
            );

        setTimeout(() => {

            loader.classList.add("loaded");

            document.body.classList.add("page-ready");

        }, remainingTime);

    });

}


/* =========================================================
   04. HEADER SCROLL EFFECT
========================================================= */

function initializeHeader() {

    const header = $(".site-header");

    if (!header) {
        return;
    }

    const updateHeader = () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   05. MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuButton = $(".mobile-menu-button");
    const mobileNav = $(".mobile-nav");

    if (!menuButton || !mobileNav) {
        return;
    }

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.addEventListener("click", () => {

        const isOpen =
            mobileNav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        const icon = $("i", menuButton);

        if (icon) {

            icon.className = isOpen
                ? "fa-solid fa-xmark"
                : "fa-solid fa-bars";

        }

    });


    /* Close menu after navigation */

    $$("a", mobileNav).forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = $("i", menuButton);

            if (icon) {

                icon.className =
                    "fa-solid fa-bars";

            }

        });

    });


    /* Close on outside click */

    document.addEventListener("click", event => {

        if (
            !mobileNav.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            mobileNav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = $("i", menuButton);

            if (icon) {

                icon.className =
                    "fa-solid fa-bars";

            }

        }

    });


    /* Close when desktop size returns */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            mobileNav.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            const icon = $("i", menuButton);

            if (icon) {

                icon.className =
                    "fa-solid fa-bars";

            }

        }

    });

}


/* =========================================================
   06. SMOOTH NAVIGATION
========================================================= */

function initializeSmoothNavigation() {

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                $(".site-header");

            const headerHeight =
                header
                    ? header.offsetHeight + 15
                    : 15;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}


/* =========================================================
   07. ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const navLinks =
        $$(".nav-link");

    if (!navLinks.length) {
        return;
    }

    const sections =
        navLinks
            .map(link => {

                const href =
                    link.getAttribute("href");

                if (!href || !href.startsWith("#")) {
                    return null;
                }

                return document.querySelector(href);

            })
            .filter(Boolean);


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        `#${entry.target.id}`;

                    navLinks.forEach(link => {

                        const active =
                            link.getAttribute("href") === id;

                        link.classList.toggle(
                            "active-nav",
                            active
                        );

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold:
                    0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   08. BACK TO TOP
========================================================= */

function initializeBackToTop() {

    const button = $(".back-top");

    if (!button) {
        return;
    }

    const update = () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    };

    update();

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );


    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* =========================================================
   09. CUSTOM CURSOR
========================================================= */

function initializeCursor() {

    const cursor = $(".cursor-dot");

    if (!cursor) {
        return;
    }

    const supportsFinePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;

    if (!supportsFinePointer) {

        cursor.style.display = "none";

        return;

    }


    let mouseX = -100;
    let mouseY = -100;

    let currentX = -100;
    let currentY = -100;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        { passive: true }
    );


    const animate = () => {

        currentX +=
            (mouseX - currentX) * 0.22;

        currentY +=
            (mouseY - currentY) * 0.22;

        cursor.style.left =
            `${currentX}px`;

        cursor.style.top =
            `${currentY}px`;

        requestAnimationFrame(animate);

    };

    animate();


    const interactiveElements =
        $$("a, button, .skill-category, .principle-card, .education-card, .code-window");


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.style.width = "8px";
                cursor.style.height = "8px";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.style.width = "5px";
                cursor.style.height = "5px";

            }
        );

    });

}


/* =========================================================
   10. SCROLL REVEAL
========================================================= */

function initializeRevealAnimations() {

    const elements = $$(

        ".section-heading, " +
        ".about-profile, " +
        ".about-content, " +
        ".principle-card, " +
        ".education-item, " +
        ".skill-category, " +
        ".part-placeholder"

    );

    if (!elements.length) {
        return;
    }


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   11. CODE WINDOW TYPING
========================================================= */

function initializeCodeTyping() {

    const element =
        $(".js-code-output");

    if (!element) {
        return;
    }

    const originalText =
        element.textContent.trim();

    if (!originalText) {
        return;
    }

    let hasStarted = false;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !hasStarted
                    ) {

                        hasStarted = true;

                        typeText(
                            element,
                            originalText,
                            10
                        );

                        observer.disconnect();

                    }

                });

            },
            {
                threshold: 0.2
            }
        );


    observer.observe(element);

}


/* =========================================================
   12. GENERIC TYPEWRITER
========================================================= */

function typeText(
    element,
    text,
    speed = 25
) {

    element.textContent = "";

    let index = 0;


    const type = () => {

        if (index >= text.length) {
            return;
        }

        element.textContent +=
            text[index];

        index++;

        setTimeout(
            type,
            speed
        );

    };


    type();

}


/* =========================================================
   13. TERMINAL TYPING EFFECT
========================================================= */

function initializeTerminalTyping() {

    const terminal =
        $(".terminal-command[data-command]");

    if (!terminal) {
        return;
    }

    const command =
        terminal.dataset.command;

    if (!command) {
        return;
    }

    const prefix =
        terminal.dataset.prefix || "$ ";

    let index = 0;

    terminal.textContent =
        prefix;


    const typeCommand = () => {

        if (index >= command.length) {
            return;
        }

        terminal.textContent +=
            command[index];

        index++;

        setTimeout(
            typeCommand,
            55
        );

    };


    setTimeout(
        typeCommand,
        700
    );

}


/* =========================================================
   14. HERO PARALLAX
========================================================= */

function initializeHeroParallax() {

    const visual =
        $(".hero-visual");

    if (!visual) {
        return;
    }


    const supportsFinePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;

    if (!supportsFinePointer) {
        return;
    }


    visual.addEventListener(
        "mousemove",
        event => {

            const rect =
                visual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const rotateY =
                (x - 0.5) * 5;

            const rotateX =
                (0.5 - y) * 5;


            const windowElement =
                $(".code-window", visual);

            if (!windowElement) {
                return;
            }


            windowElement.style.transform =
                `perspective(1000px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)
                 translateY(-2px)`;

        }
    );


    visual.addEventListener(
        "mouseleave",
        () => {

            const windowElement =
                $(".code-window", visual);

            if (!windowElement) {
                return;
            }

            windowElement.style.transform =
                `perspective(1000px)
                 rotateY(-3deg)
                 rotateX(2deg)`;

        }
    );

}


/* =========================================================
   15. CONTACT ACTIONS
========================================================= */

function initializeContactActions() {

    /*
       Email / phone / social buttons are handled
       automatically through their HTML href values.

       This section only adds a small developer-style
       feedback when an email link is clicked.
    */


    const emailLinks =
        $$('a[href^="mailto:"]');


    emailLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                showToast(
                    "Opening email client..."
                );

            }
        );

    });

}


/* =========================================================
   16. TOAST SYSTEM
========================================================= */

function showToast(message) {

    let toast =
        $(".dev-toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "dev-toast";

        Object.assign(
            toast.style,
            {

                position: "fixed",

                left: "50%",

                bottom: "30px",

                zIndex: "9999",

                padding: "10px 15px",

                border:
                    "1px solid rgba(0,255,156,.2)",

                borderRadius: "8px",

                background:
                    "rgba(7,10,14,.95)",

                color:
                    "#00ff9c",

                font:
                    '9px "Fira Code", monospace',

                boxShadow:
                    "0 15px 40px rgba(0,0,0,.3)",

                transform:
                    "translate(-50%, 20px)",

                opacity: "0",

                transition:
                    "all .3s ease",

                pointerEvents:
                    "none"

            }
        );

        document.body.appendChild(toast);

    }


    toast.textContent =
        `> ${message}`;


    requestAnimationFrame(() => {

        toast.style.opacity = "1";

        toast.style.transform =
            "translate(-50%, 0)";

    });


    clearTimeout(
        toast._timeout
    );


    toast._timeout =
        setTimeout(() => {

            toast.style.opacity = "0";

            toast.style.transform =
                "translate(-50%, 20px)";

        }, 2200);

}


/* =========================================================
   17. CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const yearElements =
        $$("[data-current-year]");

    if (!yearElements.length) {
        return;
    }

    const year =
        new Date().getFullYear();

    yearElements.forEach(element => {

        element.textContent =
            year;

    });

}


/* =========================================================
   18. EXTERNAL LINKS
========================================================= */

function initializeExternalLinks() {

    $$('a[href^="http"]').forEach(link => {

        const currentHost =
            window.location.hostname;

        try {

            const url =
                new URL(link.href);

            if (
                url.hostname &&
                url.hostname !== currentHost
            ) {

                link.target = "_blank";

                link.rel =
                    "noopener noreferrer";

            }

        } catch {
            /* Invalid URL — leave unchanged. */
        }

    });

}


/* =========================================================
   19. IMAGE ERROR HANDLER
========================================================= */

function initializeImageFallbacks() {

    $$("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

            },
            {
                once: true
            }
        );

    });

}


/* =========================================================
   20. KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           ESC
           Close mobile menu.
        */

        if (event.key === "Escape") {

            const mobileNav =
                $(".mobile-nav");

            const menuButton =
                $(".mobile-menu-button");

            if (mobileNav) {

                mobileNav.classList.remove(
                    "open"
                );

            }

            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    $("i", menuButton);

                if (icon) {

                    icon.className =
                        "fa-solid fa-bars";

                }

            }

        }

    }
);


/* =========================================================
   21. RESIZE SAFETY
========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer =
            setTimeout(() => {

                /*
                   Prevent accidental horizontal overflow
                   after responsive breakpoint changes.
                */

                document.documentElement
                    .style.overflowX = "hidden";

            }, 150);

    }
);


/* =========================================================
   22. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.body.dataset.pageState =
                "background";

        } else {

            document.body.dataset.pageState =
                "active";

        }

    }
);


/* =========================================================
   23. CONSOLE BRANDING
========================================================= */

console.log(
    "%cSIDDHARTH.DEV",
    "color:#00ff9c;font-size:24px;font-weight:700;"
);

console.log(
    "%c> Portfolio system initialized.",
    "color:#b4beca;font-family:monospace;font-size:12px;"
);

console.log(
    "%c> Developer: Siddharth Mishra",
    "color:#00d9ff;font-family:monospace;font-size:12px;"
);

console.log(
    "%c> Status: ONLINE",
    "color:#00ff9c;font-family:monospace;font-size:12px;"
);


/* =========================================================
   24. INITIALIZE OPTIONAL IMAGE FALLBACKS
========================================================= */

initializeImageFallbacks();


/* =========================================================
   25. FINAL SYSTEM MESSAGE
========================================================= */

window.SiddharthPortfolio = {

    version:
        "1.0.0",

    developer:
        "Siddharth Mishra",

    status:
        "online",

    initialized:
        true

};