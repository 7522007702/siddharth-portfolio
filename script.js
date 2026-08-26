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
    theme:
        localStorage.getItem("siddharth-theme") || "dark",

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

    if (!preloader) {
        document.body.classList.remove("no-scroll");
        return;
    }

    let progress = 0;

    const interval = setInterval(() => {

        progress +=
            Math.floor(Math.random() * 8) + 3;

        if (progress >= 100) {
            progress = 100;
        }

        if (loaderBar) {
            loaderBar.style.width =
                `${progress}%`;
        }

        if (loaderPercent) {
            loaderPercent.textContent =
                `${progress}%`;
        }

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                preloader.classList.add("hidden");

                document.body.classList.remove(
                    "no-scroll"
                );

            }, 350);

        }

    }, 90);

});


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

    } else {

        document.body.classList.remove(
            "light-theme"
        );

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


$("#themeToggle")?.addEventListener(
    "click",
    () => {

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

    }
);


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
    {
        passive: true
    }
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


function closeMobileMenu() {

    state.menuOpen = false;

    mobileMenu?.classList.remove(
        "active"
    );

    nav?.classList.remove(
        "open"
    );

}


mobileMenu?.addEventListener(
    "click",
    () => {

        state.menuOpen =
            !state.menuOpen;

        mobileMenu.classList.toggle(
            "active",
            state.menuOpen
        );

        nav?.classList.toggle(
            "open",
            state.menuOpen
        );

    }
);


$$(".nav-link").forEach(
    link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {

    const sections =
        $$("main section[id]");

    const scrollPosition =
        window.scrollY + 180;

    let currentSection = "home";


    sections.forEach(section => {

        if (
            scrollPosition >=
            section.offsetTop
        ) {

            currentSection =
                section.id;

        }

    });


    $$(".nav-link").forEach(
        link => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target ===
                `#${currentSection}`
            );

        }
    );

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

let revealObserver = null;


if (
    "IntersectionObserver" in window
) {

    revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    $$(".reveal").forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    $$(".reveal").forEach(
        element =>
            element.classList.add(
                "visible"
            )
    );

}


/* =========================================================
   COUNTERS
========================================================= */

let counterObserver = null;


if (
    "IntersectionObserver" in window
) {

    counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const element =
                            entry.target;


                        const target =
                            Number(
                                element.dataset.count
                            );


                        if (
                            Number.isFinite(
                                target
                            )
                        ) {

                            animateCounter(
                                element,
                                target
                            );

                        }


                        counterObserver.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.7
            }
        );


    $$("[data-count]").forEach(
        counter => {

            counterObserver.observe(
                counter
            );

        }
    );

} else {

    $$("[data-count]").forEach(
        element => {

            element.textContent =
                element.dataset.count || "0";

        }
    );

}


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
            1 -
            Math.pow(
                1 - progress,
                3
            );


        current =
            Math.floor(
                target * eased
            );


        element.textContent =
            current;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

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
        terminalCommands[
            commandIndex
        ];


    if (!deleting) {

        terminalTyping.textContent =
            command.substring(
                0,
                characterIndex + 1
            );


        characterIndex++;


        if (
            characterIndex >=
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


        if (
            characterIndex <= 0
        ) {

            characterIndex = 0;

            deleting = false;

            commandIndex =
                (
                    commandIndex + 1
                ) %
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


filterButtons.forEach(
    button => {

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


                projectCards.forEach(
                    card => {

                        const category =
                            card.dataset.category;


                        const visible =
                            filter === "all" ||
                            category === filter;


                        if (visible) {

                            card.classList.remove(
                                "hidden"
                            );


                            requestAnimationFrame(
                                () => {

                                    if (
                                        typeof card.animate ===
                                        "function"
                                    ) {

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

                                    }

                                }
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    }
);


/* =========================================================
   CERTIFICATE SYSTEM
========================================================= */

const certificateInput =
    $("#certificateInput");


const certificateGallery =
    $("#certificateGallery");


let certificates = [];


try {

    certificates =
        JSON.parse(
            localStorage.getItem(
                "siddharth-certificates"
            ) || "[]"
        );

    if (
        !Array.isArray(certificates)
    ) {

        certificates = [];

    }

} catch (error) {

    certificates = [];

}


function saveCertificates() {

    try {

        localStorage.setItem(
            "siddharth-certificates",
            JSON.stringify(
                certificates
            )
        );

        return true;

    } catch (error) {

        showToast(
            "Storage Limit",
            "Browser storage is full. Use smaller images."
        );

        return false;

    }

}


function renderCertificates() {

    if (!certificateGallery) {
        return;
    }


    certificateGallery.innerHTML = "";


    if (
        !certificates.length
    ) {

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
                document.createElement(
                    "div"
                );


            card.className =
                "certificate-card";


            const image =
                document.createElement(
                    "img"
                );

            image.className =
                "certificate-image";

            image.src =
                certificate.image;

            image.alt =
                certificate.name ||
                "Certificate";


            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "certificate-info";


            const title =
                document.createElement(
                    "h4"
                );

            title.textContent =
                certificate.name ||
                "Certificate";


            const description =
                document.createElement(
                    "p"
                );

            description.textContent =
                "Personal Certificate";


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.type =
                "button";

            deleteButton.className =
                "certificate-delete";

            deleteButton.dataset.index =
                index;

            deleteButton.textContent =
                "Delete";


            info.appendChild(title);
            info.appendChild(description);
            info.appendChild(deleteButton);

            card.appendChild(image);
            card.appendChild(info);

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


                    if (
                        Number.isNaN(index)
                    ) {

                        return;

                    }


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


certificateInput?.addEventListener(
    "change",
    event => {

        const files =
            [...(
                event.target.files || []
            )];


        files.forEach(
            file => {

                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    showToast(
                        "Invalid File",
                        `${file.name} is not an image.`
                    );

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload = () => {

                    certificates.push({

                        name:
                            file.name.replace(
                                /\.[^/.]+$/,
                                ""
                            ),

                        image:
                            reader.result

                    });


                    if (
                        saveCertificates()
                    ) {

                        renderCertificates();


                        showToast(
                            "Certificate Added",
                            `${file.name} added successfully.`
                        );

                    }

                };


                reader.onerror = () => {

                    showToast(
                        "Upload Error",
                        `Could not read ${file.name}.`
                    );

                };


                reader.readAsDataURL(
                    file
                );

            }
        );


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


        if (
            !isValidEmail(email)
        ) {

            setFormMessage(
                "Please enter a valid email address.",
                true
            );

            return;

        }


        /*
         * Replace this email address
         * with your actual email address.
         */

        const mailto =
            `mailto:your-email@example.com` +
            `?subject=${encodeURIComponent(
                subject
            )}` +
            `&body=${encodeURIComponent(
                `Name: ${name}\n` +
                `Email: ${email}\n\n` +
                `${message}`
            )}`;


        setFormMessage(
            "Opening your email client...",
            false
        );


        window.location.href =
            mailto;


        setTimeout(
            () => {

                contactForm.reset();

            },
            500
        );

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
   RESUME DOWNLOAD + OPEN
========================================================= */

/*
 * Resume location:
 *
 * assets/resume.pdf
 *
 * Make sure the file exists exactly here:
 *
 * assets/resume.pdf
 *
 * Download button:
 *
 * #downloadResume
 *
 * Behavior:
 *
 * 1. Download PDF.
 * 2. Open same PDF in a new tab.
 *
 * NOTE:
 * Browser security policies may affect automatic
 * downloading on some hosting environments.
 */

const downloadResume =
    $("#downloadResume");


if (downloadResume) {

    downloadResume.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const resumeUrl =
                "assets/resume.pdf";


            const fileName =
                "Siddharth-Mishra-Resume.pdf";


            /*
             * Open resume first in a new tab.
             *
             * Opening from the original click event
             * avoids popup blockers.
             */

            const resumeWindow =
                window.open(
                    resumeUrl,
                    "_blank"
                );


            if (
                resumeWindow
            ) {

                resumeWindow.opener =
                    null;

            }


            /*
             * Create temporary download link.
             */

            const downloadLink =
                document.createElement(
                    "a"
                );


            downloadLink.href =
                resumeUrl;


            downloadLink.download =
                fileName;


            downloadLink.rel =
                "noopener";


            downloadLink.style.display =
                "none";


            document.body.appendChild(
                downloadLink
            );


            /*
             * Trigger download.
             */

            downloadLink.click();


            /*
             * Remove temporary element.
             */

            setTimeout(
                () => {

                    downloadLink.remove();

                },
                1000
            );


            showToast(
                "Resume Download",
                "Your resume has been opened and download has started."
            );

        }
    );

}


/* =========================================================
   PRINT RESUME
========================================================= */

const printResume =
    $("#printResume");


printResume?.addEventListener(
    "click",
    event => {

        event.preventDefault();

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

    if (!commandOverlay) {
        return;
    }


    state.commandOpen = true;

    state.selectedCommand = 0;


    commandOverlay.classList.add(
        "open"
    );


    document.body.classList.add(
        "no-scroll"
    );


    updateCommandSelection();


    setTimeout(
        () => {

            commandInput?.focus();

        },
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


/* =========================================================
   COMMAND KEYBOARD CONTROL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const modifier =
            event.ctrlKey ||
            event.metaKey;


        /*
         * CTRL + K / CMD + K
         */

        if (
            modifier &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (
                state.commandOpen
            ) {

                closeCommandPalette();

            } else {

                openCommandPalette();

            }

            return;

        }


        /*
         * ESC
         */

        if (
            event.key === "Escape"
        ) {

            if (
                state.commandOpen
            ) {

                closeCommandPalette();

                return;

            }


            if (
                state.menuOpen
            ) {

                closeMobileMenu();

                return;

            }

        }


        /*
         * Arrow Down
         */

        if (
            state.commandOpen &&
            event.key === "ArrowDown"
        ) {

            event.preventDefault();

            moveCommandSelection(1);

        }


        /*
         * Arrow Up
         */

        if (
            state.commandOpen &&
            event.key === "ArrowUp"
        ) {

            event.preventDefault();

            moveCommandSelection(-1);

        }


        /*
         * Enter
         */

        if (
            state.commandOpen &&
            event.key === "Enter"
        ) {

            event.preventDefault();


            const buttons =
                getVisibleCommandButtons();


            buttons[
                state.selectedCommand
            ]?.click();

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
            .forEach(
                button => {

                    const text =
                        button.textContent
                            .toLowerCase();


                    button.style.display =
                        text.includes(query)
                            ? "flex"
                            : "none";

                }
            );


        state.selectedCommand =
            0;


        updateCommandSelection();

    }
);


/* =========================================================
   COMMAND BUTTONS
========================================================= */

$$(".command-results button")
    .forEach(
        button => {

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

        }
    );


function getVisibleCommandButtons() {

    return $$(".command-results button")
        .filter(
            button =>
                button.style.display !==
                "none"
        );

}


function updateCommandSelection() {

    const buttons =
        getVisibleCommandButtons();


    if (
        !buttons.length
    ) {

        state.selectedCommand =
            0;

        return;

    }


    if (
        state.selectedCommand >=
        buttons.length
    ) {

        state.selectedCommand =
            buttons.length - 1;

    }


    if (
        state.selectedCommand < 0
    ) {

        state.selectedCommand =
            0;

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


function navigateToCommand(
    command
) {

    if (!command) {
        return;
    }


    const target =
        document.getElementById(
            command
        );


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
        getVisibleCommandButtons();


    if (
        !buttons.length
    ) {

        return;

    }


    state.selectedCommand +=
        direction;


    if (
        state.selectedCommand < 0
    ) {

        state.selectedCommand =
            buttons.length - 1;

    }


    if (
        state.selectedCommand >=
        buttons.length
    ) {

        state.selectedCommand =
            0;

    }


    updateCommandSelection();

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


const finePointer =
    window.matchMedia(
        "(pointer:fine)"
    ).matches;


if (finePointer) {

    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            if (cursorDot) {

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }

        },
        {
            passive: true
        }
    );

}


function animateCursor() {

    if (cursorRing) {

        ringX +=
            (mouseX - ringX) * 0.18;


        ringY +=
            (mouseY - ringY) * 0.18;


        cursorRing.style.left =
            `${ringX}px`;


        cursorRing.style.top =
            `${ringY}px`;

    }


    requestAnimationFrame(
        animateCursor
    );

}


if (cursorRing && finePointer) {

    animateCursor();

}


if (finePointer) {

    $$(
        "a, button, input, textarea, select, " +
        ".skill-card, .project-card"
    ).forEach(
        element => {

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

        }
    );

}


/* =========================================================
   HERO TERMINAL PARALLAX
========================================================= */

const terminal =
    $(".terminal-window");


if (
    terminal &&
    finePointer
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
                (
                    event.clientX -
                    centerX
                ) /
                rect.width *
                5;


            const rotateX =
                -(
                    event.clientY -
                    centerY
                ) /
                rect.height *
                5;


            terminal.style.transform =
                `perspective(1200px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        },
        {
            passive: true
        }
    );


    terminal.addEventListener(
        "mouseleave",
        () => {

            terminal.style.transform =
                "";

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (finePointer) {

    $$(".btn-primary").forEach(
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
                        `translate(
                            ${x * 0.08}px,
                            ${y * 0.08}px
                        )`;

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


    if (toastTitle) {

        toastTitle.textContent =
            title;

    }


    if (toastMessage) {

        toastMessage.textContent =
            message;

    }


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

$$(
    'a[href^="#"]'
).forEach(
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


                let target = null;


                try {

                    target =
                        document.querySelector(
                            href
                        );

                } catch (error) {

                    return;

                }


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
   KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement &&
            (
                activeElement.tagName ===
                    "INPUT" ||
                activeElement.tagName ===
                    "TEXTAREA" ||
                activeElement.isContentEditable
            );


        /*
         * "/" opens command palette
         */

        if (
            event.key === "/" &&
            !isTyping
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

            event.target.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   VISIBILITY CHANGE
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


    /*
     * Reduced motion support
     */

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