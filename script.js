/* =========================================================
   SIDDHARTH.DEV
   DEVELOPER PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   GLOBAL STATE
========================================================= */

const state = {
    theme: localStorage.getItem("siddharth-theme") || "dark",
    commandOpen: false,
    menuOpen: false,
    selectedCommand: 0
};


/* =========================================================
   PRELOADER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const preloader = $("#preloader");
    const loaderBar = $("#loaderBar");
    const loaderPercent = $("#loaderPercent");

    let progress = 0;

    const interval = setInterval(() => {

        progress += Math.floor(Math.random() * 8) + 3;

        if (progress >= 100) {
            progress = 100;
        }

        if (loaderBar) {
            loaderBar.style.width = `${progress}%`;
        }

        if (loaderPercent) {
            loaderPercent.textContent = `${progress}%`;
        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                preloader?.classList.add("hidden");

                document.body.classList.remove("no-scroll");

            }, 350);
        }

    }, 90);

});


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

    if (theme === "light") {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.remove("light-theme");
    }

    const icon = $("#themeToggle i");

    if (icon) {

        icon.className =
            theme === "light"
                ? "fa-solid fa-moon"
                : "fa-solid fa-sun";

    }

    localStorage.setItem(
        "siddharth-theme",
        theme
    );

    state.theme = theme;
}


applyTheme(state.theme);


$("#themeToggle")?.addEventListener("click", () => {

    applyTheme(
        state.theme === "dark"
            ? "light"
            : "dark"
    );

    showToast(
        "Theme Changed",
        state.theme === "light"
            ? "Light theme enabled."
            : "Dark theme enabled."
    );

});


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = $("#header");
const backTop = $("#backTop");

function handleScroll() {

    const scrollY = window.scrollY;

    if (header) {
        header.classList.toggle(
            "scrolled",
            scrollY > 30
        );
    }

    if (backTop) {
        backTop.classList.toggle(
            "show",
            scrollY > 600
        );
    }

    updateActiveNavigation();

}


window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);


/* =========================================================
   BACK TO TOP
========================================================= */

backTop?.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu = $("#mobileMenu");
const nav = $("#nav");

mobileMenu?.addEventListener("click", () => {

    state.menuOpen = !state.menuOpen;

    mobileMenu.classList.toggle(
        "active",
        state.menuOpen
    );

    nav?.classList.toggle(
        "open",
        state.menuOpen
    );

});


$$(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        state.menuOpen = false;

        mobileMenu?.classList.remove("active");
        nav?.classList.remove("open");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const sections = $$("main section[id]");

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";

    sections.forEach(section => {

        if (
            scrollPosition >= section.offsetTop
        ) {
            currentSection = section.id;
        }

    });

    $$(".nav-link").forEach(link => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   COUNTERS
========================================================= */

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;

                const target =
                    Number(
                        element.dataset.count
                    );

                animateCounter(
                    element,
                    target
                );

                counterObserver.unobserve(
                    element
                );

            });

        },
        {
            threshold: .7
        }
    );


$$("[data-count]").forEach(
    counter => counterObserver.observe(counter)
);


function animateCounter(
    element,
    target
) {

    let current = 0;

    const duration = 1300;

    const startTime =
        performance.now();

    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );

        current =
            Math.floor(
                target * eased
            );

        element.textContent =
            current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }

    }

    requestAnimationFrame(update);

}


/* =========================================================
   TERMINAL TYPING
========================================================= */

const terminalTyping =
    $("#terminalTyping");

const terminalCommands = [
    "npm run build",
    "git status",
    "flutter run",
    "python main.py",
    "git push origin main",
    "keep_learning()"
];

let commandIndex = 0;
let characterIndex = 0;
let deleting = false;

function terminalType() {

    if (!terminalTyping) {
        return;
    }

    const command =
        terminalCommands[commandIndex];

    if (!deleting) {

        terminalTyping.textContent =
            command.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (
            characterIndex ===
            command.length
        ) {

            deleting = true;

            setTimeout(
                terminalType,
                1400
            );

            return;
        }

    } else {

        terminalTyping.textContent =
            command.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            commandIndex =
                (commandIndex + 1) %
                terminalCommands.length;

        }

    }

    setTimeout(
        terminalType,
        deleting ? 45 : 80
    );

}

setTimeout(
    terminalType,
    1000
);


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
    $$(".filter-btn");

const projectCards =
    $$(".project-card");

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            button.classList.add(
                "active"
            );

            const filter =
                button.dataset.filter;

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove(
                        "hidden"
                    );

                    requestAnimationFrame(() => {

                        card.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "translateY(10px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 300,
                                easing:
                                    "cubic-bezier(.2,.8,.2,1)"
                            }
                        );

                    });

                } else {

                    card.classList.add(
                        "hidden"
                    );

                }

            });

        }
    );

});


/* =========================================================
   CERTIFICATE SYSTEM
========================================================= */

const certificateInput =
    $("#certificateInput");

const certificateGallery =
    $("#certificateGallery");

let certificates =
    JSON.parse(
        localStorage.getItem(
            "siddharth-certificates"
        ) || "[]"
    );


function renderCertificates() {

    if (!certificateGallery) {
        return;
    }

    certificateGallery.innerHTML = "";

    if (!certificates.length) {

        certificateGallery.innerHTML = `
            <div class="certificate-card placeholder-card">
                <div class="certificate-placeholder">
                    <i class="fa-solid fa-certificate"></i>
                </div>

                <div class="certificate-info">
                    <h4>Your Certificate</h4>
                    <p>
                        Upload an image to showcase it here.
                    </p>
                </div>
            </div>
        `;

        return;
    }


    certificates.forEach(
        (certificate, index) => {

            const card =
                document.createElement("div");

            card.className =
                "certificate-card";

            card.innerHTML = `
                <img
                    class="certificate-image"
                    src="${certificate.image}"
                    alt="${escapeHTML(certificate.name)}"
                >

                <div class="certificate-info">

                    <h4>
                        ${escapeHTML(certificate.name)}
                    </h4>

                    <p>
                        Personal Certificate
                    </p>

                    <button
                        class="certificate-delete"
                        data-index="${index}"
                        style="
                            margin-top:10px;
                            padding:6px 9px;
                            background:transparent;
                            color:#ff7087;
                            border:1px solid rgba(255,112,135,.2);
                            border-radius:6px;
                            font-size:8px;
                            cursor:pointer;
                        "
                    >
                        Delete
                    </button>

                </div>
            `;

            certificateGallery.appendChild(
                card
            );

        }
    );


    $$(".certificate-delete").forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    certificates.splice(
                        index,
                        1
                    );

                    saveCertificates();

                    renderCertificates();

                    showToast(
                        "Certificate Removed",
                        "Certificate deleted from this browser."
                    );

                }
            );

        }
    );

}


function saveCertificates() {

    try {

        localStorage.setItem(
            "siddharth-certificates",
            JSON.stringify(certificates)
        );

    } catch (error) {

        showToast(
            "Storage Limit",
            "Browser storage is full. Use smaller images."
        );

    }

}


certificateInput?.addEventListener(
    "change",
    event => {

        const files =
            [...event.target.files];

        files.forEach(file => {

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {
                return;
            }

            const reader =
                new FileReader();

            reader.onload = () => {

                certificates.push({
                    name:
                        file.name
                            .replace(/\.[^/.]+$/, ""),
                    image:
                        reader.result
                });

                saveCertificates();

                renderCertificates();

                showToast(
                    "Certificate Added",
                    `${file.name} added successfully.`
                );

            };

            reader.readAsDataURL(file);

        });

        event.target.value = "";

    }
);


renderCertificates();


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    $("#contactForm");

const formMessage =
    $("#formMessage");


contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const name =
            $("#name")?.value.trim();

        const email =
            $("#email")?.value.trim();

        const subject =
            $("#subject")?.value.trim();

        const message =
            $("#message")?.value.trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            setFormMessage(
                "Please complete all fields.",
                true
            );

            return;
        }


        if (!isValidEmail(email)) {

            setFormMessage(
                "Please enter a valid email address.",
                true
            );

            return;
        }


        /*
         * Frontend-only portfolio form.
         *
         * To make it actually send email, connect this
         * form to Formspree, EmailJS, Web3Forms or your
         * own backend/API.
         */

        const mailto =
            `mailto:your-email@example.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `${message}`
            )}`;


        window.location.href =
            mailto;


        setFormMessage(
            "Opening your email client...",
            false
        );

        contactForm.reset();

    }
);


function setFormMessage(
    message,
    error = false
) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent =
        message;

    formMessage.style.color =
        error
            ? "#ff7087"
            : "var(--green)";

}


function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   RESUME GENERATOR
========================================================= */

$("#downloadResume")?.addEventListener(
    "click",
    () => {

        const resumeHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Siddharth Mishra - Resume</title>

<style>

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 50px;
    color: #111;
    line-height: 1.6;
}

h1 {
    margin-bottom: 5px;
}

h2 {
    margin-top: 30px;
    border-bottom: 2px solid #111;
    padding-bottom: 5px;
}

.muted {
    color: #666;
}

.tag {
    display: inline-block;
    padding: 4px 8px;
    margin: 3px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

</style>

</head>

<body>

<h1>Siddharth Mishra</h1>

<p class="muted">
Developer • Programmer • Technology Learner
</p>

<p>
Passionate about programming, application development,
web technologies, AI and digital products.
</p>

<h2>Technical Skills</h2>

<p>
<span class="tag">HTML5</span>
<span class="tag">CSS3</span>
<span class="tag">JavaScript</span>
<span class="tag">Python</span>
<span class="tag">Dart</span>
<span class="tag">Flutter</span>
<span class="tag">Firebase</span>
<span class="tag">Git</span>
<span class="tag">GitHub</span>
<span class="tag">REST APIs</span>
</p>

<h2>Projects</h2>

<h3>Univichar AI</h3>

<p>
AI-powered education application with conversational AI,
learning features, notes, quizzes, authentication and
cloud-based services.
</p>

<h3>Developer Portfolio</h3>

<p>
Modern responsive developer portfolio with interactive
components, animations, technology showcase and
programmer-focused UI.
</p>

<h3>Programming Experiments</h3>

<p>
Programming experiments involving Python, JavaScript,
application logic and technology exploration.
</p>

<h2>Developer Philosophy</h2>

<p>
Build. Learn. Improve.
</p>

<h2>Contact</h2>

<p>
Email: your-email@example.com
</p>

</body>
</html>
        `;

        const blob =
            new Blob(
                [resumeHTML],
                {
                    type:
                        "text/html;charset=utf-8"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const anchor =
            document.createElement("a");

        anchor.href = url;

        anchor.download =
            "Siddharth-Mishra-Resume.html";

        document.body.appendChild(anchor);

        anchor.click();

        anchor.remove();

        URL.revokeObjectURL(url);


        showToast(
            "Resume Generated",
            "Your resume file has been generated."
        );

    }
);


/* =========================================================
   PRINT
========================================================= */

$("#printResume")?.addEventListener(
    "click",
    () => {

        window.print();

    }
);


/* =========================================================
   COMMAND PALETTE
========================================================= */

const commandOverlay =
    $("#commandOverlay");

const commandInput =
    $("#commandInput");

const commandResults =
    $("#commandResults");

const closeCommand =
    $("#closeCommand");


function openCommandPalette() {

    state.commandOpen = true;

    commandOverlay?.classList.add(
        "open"
    );

    document.body.classList.add(
        "no-scroll"
    );

    setTimeout(
        () => commandInput?.focus(),
        100
    );

}


function closeCommandPalette() {

    state.commandOpen = false;

    commandOverlay?.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


closeCommand?.addEventListener(
    "click",
    closeCommandPalette
);


commandOverlay?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            commandOverlay
        ) {
            closeCommandPalette();
        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        const modifier =
            event.ctrlKey ||
            event.metaKey;


        if (
            modifier &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommandPalette();

            return;
        }


        if (
            event.key === "Escape" &&
            state.commandOpen
        ) {

            closeCommandPalette();

            return;
        }


        if (
            state.commandOpen &&
            event.key === "ArrowDown"
        ) {

            event.preventDefault();

            moveCommandSelection(1);

        }


        if (
            state.commandOpen &&
            event.key === "ArrowUp"
        ) {

            event.preventDefault();

            moveCommandSelection(-1);

        }


        if (
            state.commandOpen &&
            event.key === "Enter"
        ) {

            event.preventDefault();

            const selected =
                $$(".command-results button")[
                    state.selectedCommand
                ];

            selected?.click();

        }

    }
);


/* =========================================================
   COMMAND SEARCH
========================================================= */

commandInput?.addEventListener(
    "input",
    () => {

        const query =
            commandInput.value
                .toLowerCase()
                .trim();

        $$(".command-results button")
            .forEach(button => {

                const text =
                    button.textContent
                        .toLowerCase();

                button.style.display =
                    text.includes(query)
                        ? "flex"
                        : "none";

            });

        state.selectedCommand = 0;

    }
);


$$(".command-results button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const command =
                    button.dataset.command;

                navigateToCommand(
                    command
                );

                closeCommandPalette();

            }
        );

    });


function navigateToCommand(
    command
) {

    const target =
        document.getElementById(command);

    if (!target) {
        return;
    }

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


function moveCommandSelection(
    direction
) {

    const buttons =
        $$(".command-results button")
            .filter(
                button =>
                    button.style.display !==
                    "none"
            );

    if (!buttons.length) {
        return;
    }

    state.selectedCommand +=
        direction;

    if (
        state.selectedCommand <
        0
    ) {
        state.selectedCommand =
            buttons.length - 1;
    }

    if (
        state.selectedCommand >=
        buttons.length
    ) {
        state.selectedCommand = 0;
    }

    buttons.forEach(
        button =>
            button.classList.remove(
                "selected"
            )
    );

    buttons[
        state.selectedCommand
    ]?.classList.add(
        "selected"
    );

}


/* =========================================================
   MOUSE CURSOR
========================================================= */

const cursorDot =
    $(".cursor-dot");

const cursorRing =
    $(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


window.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        }

    },
    { passive: true }
);


function animateCursor() {

    ringX +=
        (mouseX - ringX) * .18;

    ringY +=
        (mouseY - ringY) * .18;

    if (cursorRing) {

        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;

    }

    requestAnimationFrame(
        animateCursor
    );

}

animateCursor();


$$(
    "a, button, input, textarea, .skill-card, .project-card"
).forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => {
            cursorRing?.classList.add(
                "hover"
            );
        }
    );

    element.addEventListener(
        "mouseleave",
        () => {
            cursorRing?.classList.remove(
                "hover"
            );
        }
    );

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const terminal =
    $(".terminal-window");

if (
    terminal &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            const rect =
                terminal.getBoundingClientRect();

            const centerX =
                rect.left +
                rect.width / 2;

            const centerY =
                rect.top +
                rect.height / 2;

            const rotateY =
                (event.clientX - centerX) /
                rect.width *
                5;

            const rotateX =
                -(event.clientY - centerY) /
                rect.height *
                5;

            terminal.style.transform =
                `perspective(1200px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

$$(".btn-primary").forEach(button => {

    button.addEventListener(
        "mousemove",
        event => {

            if (
                !window.matchMedia(
                    "(pointer:fine)"
                ).matches
            ) {
                return;
            }

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
                `translate(
                    ${x * .08}px,
                    ${y * .08}px
                )`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(
    title,
    message
) {

    const toast =
        $("#toast");

    const toastTitle =
        $("#toastTitle");

    const toastMessage =
        $("#toastMessage");


    if (!toast) {
        return;
    }

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3500
        );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /[&<>"']/g,
            character => {

                const entities = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#039;"
                };

                return entities[
                    character
                ];

            }
        );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    $("#currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

$$('a[href^="#"]').forEach(
    anchor => {

        anchor.addEventListener(
            "click",
            event => {

                const href =
                    anchor.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        href
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement.tagName !==
                "INPUT" &&
            document.activeElement.tagName !==
                "TEXTAREA"
        ) {

            event.preventDefault();

            openCommandPalette();

        }

    }
);


/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.addEventListener(
    "error",
    event => {

        if (
            event.target instanceof
            HTMLImageElement
        ) {

            event.target.style.display =
                "none";

        }

    },
    true
);


/* =========================================================
   PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {
            document.title =
                "Come back • Siddharth.dev";
        } else {
            document.title =
                "Siddharth.dev — Developer Portfolio";
        }

    }
);


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.clear();

console.log(
    "%c SIDDHARTH.DEV ",
    `
        background:#00ff9d;
        color:#00130c;
        font-size:20px;
        font-weight:800;
        padding:8px 14px;
        border-radius:8px;
    `
);

console.log(
    "%c Developer Portfolio initialized.",
    "color:#00ff9d;font-size:12px;"
);

console.log(
    "%c Build. Learn. Improve.",
    "color:#8a9691;font-size:11px;"
);


/* =========================================================
   INITIALIZATION
========================================================= */

function initializePortfolio() {

    handleScroll();

    renderCertificates();

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        $$(".reveal").forEach(
            element =>
                element.classList.add(
                    "visible"
                )
        );

    }

}


initializePortfolio();


/* =========================================================
   END
========================================================= */