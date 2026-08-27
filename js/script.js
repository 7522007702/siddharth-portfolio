/* =========================================================
   SIDDHARTH.DEV
   VVIP PORTFOLIO SYSTEM
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = (selector, scope = document) =>
    scope.querySelector(selector);

const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];


const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);


const random = (min, max) =>
    Math.random() * (max - min) + min;


const randomInt = (min, max) =>
    Math.floor(random(min, max + 1));


/* =========================================================
   DOM
========================================================= */

const body = document.body;

const siteLoader = $("#siteLoader");
const loaderStatus = $("#loaderStatus");

const mainHeader = $("#mainHeader");
const mainNav = $("#mainNav");
const menuToggle = $("#menuToggle");

const cursorDot = $("#cursorDot");
const cursorRing = $("#cursorRing");

const scrollProgress = $("#scrollProgress");

const typingText = $("#typingText");
const terminalTime = $("#terminalTime");

const cityBackground = $("#cityBackground");

const resumeStudio = $("#resumeStudio");
const openResumeStudio = $("#openResumeStudio");
const closeResumeStudio = $("#closeResumeStudio");

const downloadResume = $("#downloadResume");
const studioDownloadPdf = $("#studioDownloadPdf");
const studioPrint = $("#studioPrint");

const resumePaper = $("#resumePaper");

const toast = $("#toast");
const toastMessage = $("#toastMessage");


/* =========================================================
   LOADER
========================================================= */

const loaderMessages = [
    "BOOTING SYSTEM...",
    "LOADING CITY ENGINE...",
    "INITIALIZING UI...",
    "MOUNTING PORTFOLIO...",
    "SYSTEM READY."
];


let loaderIndex = 0;

const loaderInterval = setInterval(() => {

    loaderIndex++;

    if (loaderIndex < loaderMessages.length) {
        loaderStatus.textContent =
            loaderMessages[loaderIndex];
    }

}, 420);


window.addEventListener("load", () => {

    setTimeout(() => {

        clearInterval(loaderInterval);

        if (loaderStatus) {
            loaderStatus.textContent =
                "SYSTEM READY.";
        }

        siteLoader.classList.add("loaded");

    }, 1300);

});


/* =========================================================
   CYBERPUNK CITY ENGINE
========================================================= */

function createStars() {

    const container = $("#skyStars");

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < 120; i++) {

        const star =
            document.createElement("span");

        star.className =
            "sky-star";

        star.style.left =
            `${random(0, 100)}%`;

        star.style.top =
            `${random(0, 62)}%`;

        star.style.setProperty(
            "--duration",
            `${random(0, 3)}s`
        );

        star.style.animationDelay =
            `${random(-3, 0)}s`;

        fragment.appendChild(star);

    }

    container.appendChild(fragment);

}


function createRain(containerId, count) {

    const container =
        document.getElementById(containerId);

    if (!container) return;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < count; i++) {

        const drop =
            document.createElement("span");

        drop.className =
            "rain-drop";

        drop.style.setProperty(
            "--left",
            `${random(-10, 110)}%`
        );

        drop.style.setProperty(
            "--top",
            `${random(-20, 100)}%`
        );

        drop.style.setProperty(
            "--length",
            `${random(12, 55)}px`
        );

        drop.style.setProperty(
            "--opacity",
            random(.05, .42).toFixed(2)
        );

        drop.style.setProperty(
            "--speed",
            `${random(.45, 1.8)}s`
        );

        drop.style.setProperty(
            "--delay",
            `${random(-2, 0)}s`
        );

        fragment.appendChild(drop);

    }

    container.appendChild(fragment);

}


const signTexts = [
    "DEV",
    "AI",
    "DATA",
    "CODE",
    "SQL",
    "WEB",
    "LAB",
    "TECH",
    "BI",
    "SYS"
];


const signColors = [
    "#00f5ff",
    "#a78bfa",
    "#ff4db8",
    "#6eff9c"
];


function createBuilding(layer, options = {}) {

    const building =
        document.createElement("div");

    building.className =
        "building";

    const width =
        random(
            options.minWidth || 45,
            options.maxWidth || 130
        );

    const height =
        random(
            options.minHeight || 120,
            options.maxHeight || 300
        );

    const columns =
        randomInt(
            2,
            5
        );

    building.style.setProperty(
        "--width",
        `${width}px`
    );

    building.style.setProperty(
        "--height",
        `${height}px`
    );

    building.style.setProperty(
        "--cols",
        columns
    );

    const top =
        document.createElement("span");

    top.className =
        "building-top";

    building.appendChild(top);


    if (Math.random() > .5) {

        const antenna =
            document.createElement("span");

        antenna.className =
            "rooftop-antenna";

        antenna.style.setProperty(
            "--antenna-height",
            `${random(12, 55)}px`
        );

        building.appendChild(antenna);


        const light =
            document.createElement("span");

        light.className =
            "rooftop-light";

        building.appendChild(light);

    }


    const windows =
        document.createElement("div");

    windows.className =
        "building-windows";


    const windowCount =
        Math.ceil(
            height / 18
        ) * columns;


    for (let i = 0; i < windowCount; i++) {

        const win =
            document.createElement("span");

        win.className =
            "window";

        if (Math.random() < .34) {

            win.classList.add("lit");

            const color =
                signColors[
                    randomInt(
                        0,
                        signColors.length - 1
                    )
                ];

            win.style.setProperty(
                "--window-color",
                color
            );

            win.style.setProperty(
                "--flicker",
                `${random(3, 8)}s`
            );

            win.style.setProperty(
                "--window-delay",
                `${random(-5, 0)}s`
            );

        }

        windows.appendChild(win);

    }

    building.appendChild(windows);


    if (Math.random() < .18) {

        const sign =
            document.createElement("span");

        sign.className =
            "neon-sign";

        sign.textContent =
            signTexts[
                randomInt(
                    0,
                    signTexts.length - 1
                )
            ];

        sign.style.setProperty(
            "--sign-color",
            signColors[
                randomInt(
                    0,
                    signColors.length - 1
                )
            ]
        );

        sign.style.setProperty(
            "--sign-top",
            `${random(20, 70)}%`
        );

        building.appendChild(sign);

    }

    layer.appendChild(building);

}


function createCity() {

    const far =
        $("#cityFar");

    const mid =
        $("#cityMid");

    const near =
        $("#cityNear");

    if (!far || !mid || !near) return;


    const fillLayer = (
        layer,
        count,
        options
    ) => {

        for (let i = 0; i < count; i++) {

            createBuilding(
                layer,
                options
            );

        }

    };


    fillLayer(
        far,
        35,
        {
            minWidth: 35,
            maxWidth: 90,
            minHeight: 90,
            maxHeight: 210
        }
    );


    fillLayer(
        mid,
        27,
        {
            minWidth: 55,
            maxWidth: 120,
            minHeight: 140,
            maxHeight: 280
        }
    );


    fillLayer(
        near,
        20,
        {
            minWidth: 70,
            maxWidth: 150,
            minHeight: 180,
            maxHeight: 360
        }
    );

}


function createRoadLines() {

    const container =
        $("#roadLines");

    if (!container) return;

    for (let i = 0; i < 14; i++) {

        const line =
            document.createElement("span");

        line.className =
            "road-line";

        line.style.setProperty(
            "--x",
            `${random(5, 95)}%`
        );

        line.style.setProperty(
            "--speed",
            `${random(1.6, 3.5)}s`
        );

        line.style.setProperty(
            "--delay",
            `${random(-3, 0)}s`
        );

        container.appendChild(line);

    }

}


function createMovingLights() {

    const container =
        $("#movingLights");

    if (!container) return;

    for (let i = 0; i < 18; i++) {

        const light =
            document.createElement("span");

        light.className =
            "moving-light";

        light.style.setProperty(
            "--light-width",
            `${random(2, 5)}px`
        );

        light.style.setProperty(
            "--light-height",
            `${random(2, 5)}px`
        );

        light.style.setProperty(
            "--start",
            `${random(-10, 100)}%`
        );

        light.style.setProperty(
            "--bottom",
            `${random(12, 65)}%`
        );

        light.style.setProperty(
            "--duration",
            `${random(4, 10)}s`
        );

        light.style.setProperty(
            "--delay",
            `${random(-10, 0)}s`
        );

        light.style.setProperty(
            "--light-color",
            Math.random() > .45
                ? "#00f5ff"
                : "#ff4d78"
        );

        container.appendChild(light);

    }

}


function initCity() {

    createStars();

    createRain(
        "rainBack",
        90
    );

    createRain(
        "rainFront",
        150
    );

    createCity();

    createRoadLines();

    createMovingLights();

}


initCity();


/* =========================================================
   PARALLAX / CAMERA
========================================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener(
    "mousemove",
    event => {

        targetX =
            (event.clientX /
                window.innerWidth -
                .5) * 2;

        targetY =
            (event.clientY /
                window.innerHeight -
                .5) * 2;

        if (
            window.innerWidth > 850 &&
            cityBackground
        ) {

            cityBackground.style.transform =
                `translate3d(
                    ${targetX * -5}px,
                    ${targetY * -3}px,
                    0
                )`;

        }

    },
    { passive: true }
);


function animateParallax() {

    currentX +=
        (targetX - currentX) * .035;

    currentY +=
        (targetY - currentY) * .035;

    const near =
        $("#cityNear");

    const mid =
        $("#cityMid");

    const far =
        $("#cityFar");

    if (near) {

        near.style.transform =
            `translate3d(
                ${currentX * -9}px,
                ${currentY * -4}px,
                0
            )`;

    }

    if (mid) {

        mid.style.transform =
            `translate3d(
                ${currentX * -5}px,
                ${currentY * -2}px,
                0
            )`;

    }

    if (far) {

        far.style.transform =
            `translate3d(
                ${currentX * -2}px,
                ${currentY}px,
                0
            )`;

    }

    requestAnimationFrame(
        animateParallax
    );

}


animateParallax();


/* =========================================================
   CURSOR
========================================================= */

let mouseX = -100;
let mouseY = -100;

let ringX = -100;
let ringY = -100;


if (
    cursorDot &&
    cursorRing &&
    window.innerWidth > 850
) {

    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            cursorDot.style.left =
                `${mouseX}px`;

            cursorDot.style.top =
                `${mouseY}px`;

        },
        { passive: true }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .15;

        ringY +=
            (mouseY - ringY) * .15;

        cursorRing.style.left =
            `${ringX}px`;

        cursorRing.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    document.addEventListener(
        "mouseover",
        event => {

            if (
                event.target.closest(
                    "a, button, input, textarea, .project-card"
                )
            ) {

                cursorRing.classList.add(
                    "hover"
                );

            }

        }
    );


    document.addEventListener(
        "mouseout",
        event => {

            if (
                event.target.closest(
                    "a, button, input, textarea, .project-card"
                )
            ) {

                cursorRing.classList.remove(
                    "hover"
                );

            }

        }
    );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        () => {

            const open =
                mainNav.classList.toggle(
                    "open"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );

}


$$(".nav-link").forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                mainNav.classList.remove(
                    "open"
                );

                menuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);


/* =========================================================
   HEADER + SCROLL
========================================================= */

const sections =
    $$("section[id]");

const navLinks =
    $$(".nav-link");


function updateScrollUI() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? scrollTop / documentHeight * 100
            : 0;

    if (scrollProgress) {

        scrollProgress.style.width =
            `${progress}%`;

    }


    if (mainHeader) {

        mainHeader.classList.toggle(
            "scrolled",
            scrollTop > 40
        );

    }


    let current =
        "home";


    sections.forEach(
        section => {

            const top =
                section.offsetTop -
                150;

            if (
                scrollTop >= top
            ) {

                current =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            link.classList.toggle(
                "active",
                link.getAttribute("href") ===
                `#${current}`
            );

        }
    );

}


window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
);

updateScrollUI();


/* =========================================================
   TYPING ENGINE
========================================================= */

const typingPhrases = [
    "turning ideas into digital products.",
    "building practical solutions.",
    "learning something new every day.",
    "solving problems with technology.",
    "designing systems that make sense."
];


let phraseIndex = 0;
let charIndex = 0;
let deleting = false;


function typeLoop() {

    if (!typingText) return;

    const phrase =
        typingPhrases[
            phraseIndex
        ];


    if (!deleting) {

        typingText.textContent =
            phrase.slice(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex >=
            phrase.length
        ) {

            deleting = true;

            setTimeout(
                typeLoop,
                1800
            );

            return;

        }

    } else {

        typingText.textContent =
            phrase.slice(
                0,
                charIndex - 1
            );

        charIndex--;


        if (
            charIndex <= 0
        ) {

            deleting = false;

            phraseIndex =
                (phraseIndex + 1) %
                typingPhrases.length;

        }

    }


    setTimeout(
        typeLoop,
        deleting ? 35 : 70
    );

}


typeLoop();


/* =========================================================
   TERMINAL CLOCK
========================================================= */

function updateTerminalTime() {

    if (!terminalTime) return;

    const now =
        new Date();

    terminalTime.textContent =
        now.toLocaleTimeString(
            "en-GB",
            {
                hour12: false
            }
        );

}


setInterval(
    updateTerminalTime,
    1000
);

updateTerminalTime();


/* =========================================================
   REVEAL OBSERVER
========================================================= */

const revealElements =
    $$(
        ".section-heading, " +
        ".about-profile, " +
        ".about-content, " +
        ".identity-card, " +
        ".stat-card, " +
        ".skill-row, " +
        ".journey-item, " +
        ".project-card, " +
        ".certificate-empty, " +
        ".resume-info, " +
        ".resume-code, " +
        ".contact-copy, " +
        ".contact-form"
    );


revealElements.forEach(
    element => {

        element.classList.add(
            "reveal"
        );

    }
);


const revealObserver =
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

                        if (
                            entry.target.classList.contains(
                                "skill-row"
                            )
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }

                }
            );

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(
    element =>
        revealObserver.observe(
            element
        )
);


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    $$(".stat-number");


function animateCounter(
    element
) {

    const target =
        Number(
            element.dataset.count
        );

    const duration =
        1300;

    const start =
        performance.now();


    function update(now) {

        const elapsed =
            now - start;

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

        element.textContent =
            Math.floor(
                target * eased
            );

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


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting &&
                        !entry.target.dataset.counted
                    ) {

                        entry.target.dataset.counted =
                            "true";

                        animateCounter(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: .5
        }
    );


counters.forEach(
    counter =>
        counterObserver.observe(
            counter
        )
);


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (window.innerWidth > 850) {

    $$(".magnetic").forEach(
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
                            ${x * .08}px,
                            ${y * .08}px
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
   PROJECT FILTERS
========================================================= */

const projectFilters =
    $$(".project-filter");

const projectCards =
    $$(".project-card");


projectFilters.forEach(
    filter => {

        filter.addEventListener(
            "click",
            () => {

                const value =
                    filter.dataset.filter;


                projectFilters.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );

                filter.classList.add(
                    "active"
                );


                projectCards.forEach(
                    card => {

                        const category =
                            card.dataset.category;

                        const show =
                            value === "all" ||
                            category === value;

                        card.style.display =
                            show
                                ? ""
                                : "none";

                    }
                );

            }
        );

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    if (!toast || !toastMessage) return;

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
            2800
        );

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    $("#contactForm");

const contactStatus =
    $("#contactStatus");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                $("#contactName")?.value.trim();

            const email =
                $("#contactEmail")?.value.trim();

            const subject =
                $("#contactSubject")?.value.trim();

            const message =
                $("#contactMessage")?.value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showToast(
                    "Please complete all fields."
                );

                return;

            }


            const mailto =
                `mailto:?subject=${
                    encodeURIComponent(
                        subject
                    )
                }&body=${
                    encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\n\n${message}`
                    )
                }`;


            if (contactStatus) {

                contactStatus.textContent =
                    "TRANSMISSION READY — OPENING MAIL CLIENT...";

            }


            showToast(
                "Opening your mail client..."
            );


            setTimeout(
                () => {

                    window.location.href =
                        mailto;

                },
                400
            );

        }
    );

}


/* =========================================================
   RESUME DATA
========================================================= */

const RESUME_STORAGE_KEY =
    "siddharth_resume_data_v1";


const defaultResumeData = {

    name:
        "Siddharth Mishra",

    title:
        "Developer • Builder • Learner",

    email:
        "",

    phone:
        "",

    location:
        "Lucknow, Uttar Pradesh, India",

    linkedin:
        "linkedin.com/in/siddharthmishra8",

    github:
        "github.com/7522007702",

    summary:
        "BBA student and technology-focused developer interested in programming, digital products, data and practical problem solving. I enjoy learning new technologies and turning ideas into useful digital experiences."

};


let resumeData =
    loadResumeData();


function loadResumeData() {

    try {

        const saved =
            localStorage.getItem(
                RESUME_STORAGE_KEY
            );

        if (!saved) {

            return {
                ...defaultResumeData
            };

        }


        return {
            ...defaultResumeData,
            ...JSON.parse(saved)
        };

    } catch (error) {

        return {
            ...defaultResumeData
        };

    }

}


function saveResumeData() {

    try {

        localStorage.setItem(
            RESUME_STORAGE_KEY,
            JSON.stringify(
                resumeData
            )
        );

    } catch (error) {

        console.warn(
            "Could not save resume data.",
            error
        );

    }

}


/* =========================================================
   RESUME FIELD BINDING
========================================================= */

const resumeInputs =
    $$(
        "[data-resume-field]"
    );


function loadResumeInputs() {

    resumeInputs.forEach(
        input => {

            const field =
                input.dataset.resumeField;

            input.value =
                resumeData[field] || "";

        }
    );

}


function updateResumePreview(
    field,
    value
) {

    $$(
        `[data-preview="${field}"]`
    ).forEach(
        element => {

            element.textContent =
                value ||
                defaultResumeData[field] ||
                "";

        }
    );

}


function refreshResumePreview() {

    Object.keys(
        resumeData
    ).forEach(
        field => {

            updateResumePreview(
                field,
                resumeData[field]
            );

        }
    );

}


resumeInputs.forEach(
    input => {

        input.addEventListener(
            "input",
            () => {

                const field =
                    input.dataset.resumeField;

                resumeData[field] =
                    input.value;

                updateResumePreview(
                    field,
                    input.value
                );

                saveResumeData();

            }
        );

    }
);


loadResumeInputs();

refreshResumePreview();


/* =========================================================
   RESUME PHOTO
========================================================= */

const resumePhotoInput =
    $("#resumePhotoInput");

const resumePhotoOne =
    $("#resumePhotoOne");

const resumePhotoThree =
    $("#resumePhotoThree");


const RESUME_PHOTO_KEY =
    "siddharth_resume_photo_v1";


function loadSavedPhoto() {

    try {

        const photo =
            localStorage.getItem(
                RESUME_PHOTO_KEY
            );

        if (
            photo &&
            resumePhotoOne &&
            resumePhotoThree
        ) {

            resumePhotoOne.src =
                photo;

            resumePhotoThree.src =
                photo;

        }

    } catch (error) {

        console.warn(
            "Photo could not be loaded."
        );

    }

}


loadSavedPhoto();


if (resumePhotoInput) {

    resumePhotoInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files?.[0];

            if (!file) return;


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                showToast(
                    "Please select an image."
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                () => {

                    const result =
                        reader.result;

                    if (
                        resumePhotoOne
                    ) {

                        resumePhotoOne.src =
                            result;

                    }

                    if (
                        resumePhotoThree
                    ) {

                        resumePhotoThree.src =
                            result;

                    }


                    try {

                        localStorage.setItem(
                            RESUME_PHOTO_KEY,
                            result
                        );

                    } catch (error) {

                        showToast(
                            "Photo applied for this session."
                        );

                    }

                    showToast(
                        "Resume photo updated."
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   RESUME TEMPLATE SYSTEM
========================================================= */

const templateOptions =
    $$(".template-option");


const templateNames = {

    template1:
        "TEMPLATE 01 — ORIGINAL / PHOTO",

    template2:
        "TEMPLATE 02 — ORIGINAL / NO PHOTO",

    template3:
        "TEMPLATE 03 — DEVELOPER / PHOTO",

    template4:
        "TEMPLATE 04 — DEVELOPER / NO PHOTO"

};


function setResumeTemplate(
    template
) {

    if (!resumePaper) return;


    resumePaper.classList.remove(
        "resume-template-1",
        "resume-template-2",
        "resume-template-3",
        "resume-template-4"
    );


    const number =
        template.replace(
            "template",
            ""
        );


    resumePaper.classList.add(
        `resume-template-${number}`
    );


    templateOptions.forEach(
        option => {

            option.classList.toggle(
                "active",
                option.dataset.template ===
                template
            );

        }
    );


    const activeName =
        $("#activeTemplateName");


    if (activeName) {

        activeName.textContent =
            templateNames[template] ||
            "RESUME TEMPLATE";

    }


    try {

        localStorage.setItem(
            "siddharth_resume_template_v1",
            template
        );

    } catch (error) {}

}


templateOptions.forEach(
    option => {

        option.addEventListener(
            "click",
            () => {

                setResumeTemplate(
                    option.dataset.template
                );

            }
        );

    }
);


function loadSavedTemplate() {

    try {

        const saved =
            localStorage.getItem(
                "siddharth_resume_template_v1"
            );

        setResumeTemplate(
            saved || "template1"
        );

    } catch (error) {

        setResumeTemplate(
            "template1"
        );

    }

}


loadSavedTemplate();


/* =========================================================
   RESUME STUDIO OPEN/CLOSE
========================================================= */

function openStudio() {

    if (!resumeStudio) return;

    resumeStudio.classList.add(
        "open"
    );

    resumeStudio.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "studio-open"
    );

    loadResumeInputs();

    refreshResumePreview();

    loadSavedTemplate();

}


function closeStudio() {

    if (!resumeStudio) return;

    resumeStudio.classList.remove(
        "open"
    );

    resumeStudio.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "studio-open"
    );

}


openResumeStudio?.addEventListener(
    "click",
    openStudio
);


closeResumeStudio?.addEventListener(
    "click",
    closeStudio
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            resumeStudio?.classList.contains(
                "open"
            )
        ) {

            closeStudio();

        }

    }
);


/* =========================================================
   ORIGINAL PDF DOWNLOAD
========================================================= */

function downloadOriginalResume() {

    const link =
        document.createElement("a");

    link.href =
        "assets/resume.pdf";

    link.download =
        "Siddharth-Mishra-Resume.pdf";

    link.rel =
        "noopener";

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

    showToast(
        "Original resume PDF download started."
    );

}


downloadResume?.addEventListener(
    "click",
    downloadOriginalResume
);


studioDownloadPdf?.addEventListener(
    "click",
    downloadOriginalResume
);


/* =========================================================
   PRINT A4
========================================================= */

function printResume() {

    /*
       The Resume Studio paper is a real HTML document.
       This means the selected template + edited fields
       can be printed directly as A4.
    */

    refreshResumePreview();

    window.print();

}


studioPrint?.addEventListener(
    "click",
    printResume
);


/* =========================================================
   RESET RESUME
========================================================= */

const resetResumeData =
    $("#resetResumeData");


resetResumeData?.addEventListener(
    "click",
    () => {

        const confirmed =
            window.confirm(
                "Reset all edited resume information?"
            );

        if (!confirmed) return;


        resumeData = {
            ...defaultResumeData
        };


        saveResumeData();

        loadResumeInputs();

        refreshResumePreview();

        showToast(
            "Resume editor reset."
        );

    }
);


/* =========================================================
   CERTIFICATE UPLOAD SYSTEM
========================================================= */

const certificateInput =
    $("#certificateInput");

const certificateUploadButton =
    $("#certificateUploadButton");

const certificateGallery =
    $("#certificateGallery");

const certificateModal =
    $("#certificateModal");

const certificateModalContent =
    $("#certificateModalContent");

const closeCertificateModal =
    $("#closeCertificateModal");


let certificates = [];


function renderCertificates() {

    if (!certificateGallery) return;

    certificateGallery.innerHTML = "";

    certificates.forEach(
        (certificate, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "certificate-card";


            if (
                certificate.type.startsWith(
                    "image/"
                )
            ) {

                const image =
                    document.createElement(
                        "img"
                    );

                image.src =
                    certificate.url;

                image.alt =
                    `Certificate ${index + 1}`;

                card.appendChild(
                    image
                );

            } else {

                const pdfPlaceholder =
                    document.createElement(
                        "div"
                    );

                pdfPlaceholder.style.cssText = `
                    min-height:220px;
                    display:grid;
                    place-items:center;
                    color:#00f5ff;
                    font-family:var(--mono);
                    font-size:12px;
                `;

                pdfPlaceholder.textContent =
                    "PDF CERTIFICATE";

                card.appendChild(
                    pdfPlaceholder
                );

            }


            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "certificate-card-info";

            const span =
                document.createElement(
                    "span"
                );

            span.textContent =
                "CERTIFICATE / CLICK TO VIEW";

            info.appendChild(
                span
            );

            card.appendChild(
                info
            );


            card.addEventListener(
                "click",
                () => {

                    openCertificate(
                        certificate
                    );

                }
            );


            certificateGallery.appendChild(
                card
            );

        }
    );

}


function openCertificate(
    certificate
) {

    if (
        !certificateModal ||
        !certificateModalContent
    ) return;


    certificateModalContent.innerHTML =
        "";


    if (
        certificate.type.startsWith(
            "image/"
        )
    ) {

        const image =
            document.createElement(
                "img"
            );

        image.src =
            certificate.url;

        image.alt =
            "Certificate";

        certificateModalContent.appendChild(
            image
        );

    } else {

        const iframe =
            document.createElement(
                "iframe"
            );

        iframe.src =
            certificate.url;

        iframe.style.cssText = `
            width:90vw;
            height:85vh;
            border:0;
            background:#fff;
        `;

        certificateModalContent.appendChild(
            iframe
        );

    }


    certificateModal.classList.add(
        "open"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add(
        "modal-open"
    );

}


function closeCertificate() {

    certificateModal?.classList.remove(
        "open"
    );

    certificateModal?.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove(
        "modal-open"
    );

}


certificateUploadButton?.addEventListener(
    "click",
    () => {

        certificateInput?.click();

    }
);


certificateInput?.addEventListener(
    "change",
    event => {

        const files =
            [...(
                event.target.files || []
            )];


        files.forEach(
            file => {

                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        certificates.push(
                            {
                                name:
                                    file.name,

                                type:
                                    file.type,

                                url:
                                    reader.result
                            }
                        );

                        renderCertificates();

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );


        event.target.value =
            "";

    }
);


closeCertificateModal?.addEventListener(
    "click",
    closeCertificate
);


certificateModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            certificateModal
        ) {

            closeCertificate();

        }

    }
);


/* =========================================================
   SYSTEM STATUS
========================================================= */

const systemStatus =
    $("#systemStatus");


systemStatus?.addEventListener(
    "click",
    () => {

        showToast(
            "All portfolio systems operational."
        );

    }
);


/* =========================================================
   RANDOM MICRO ANIMATION
========================================================= */

const heroTerminal =
    $(".hero-terminal");


if (heroTerminal && window.innerWidth > 850) {

    heroTerminal.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroTerminal.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const rotateY =
                (x / rect.width - .5) * 5;

            const rotateX =
                (y / rect.height - .5) * -4;

            heroTerminal.style.transform =
                `perspective(1000px)
                 rotateY(${rotateY}deg)
                 rotateX(${rotateX}deg)`;

        }
    );


    heroTerminal.addEventListener(
        "mouseleave",
        () => {

            heroTerminal.style.transform =
                "perspective(1000px) rotateY(-4deg) rotateX(2deg)";

        }
    );

}


/* =========================================================
   FOOTER YEAR
========================================================= */

const currentYear =
    $("#currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   PRINT STYLE HELP
========================================================= */

window.addEventListener(
    "beforeprint",
    () => {

        if (
            resumeStudio &&
            !resumeStudio.classList.contains(
                "open"
            )
        ) {

            /*
               If somebody invokes browser print while
               studio is closed, temporarily expose the
               resume paper.
            */

            resumeStudio.classList.add(
                "open"
            );

        }

    }
);


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.documentElement
                .style
                .setProperty(
                    "--city-animation-speed",
                    "0"
                );

        }

    }
);


/* =========================================================
   INITIAL SYSTEM MESSAGE
========================================================= */

setTimeout(
    () => {

        showToast(
            "SIDDHARTH.DEV online."
        );

    },
    1800
);


/* =========================================================
   FINAL INITIALIZATION
========================================================= */

document.documentElement
    .classList.add(
        "portfolio-ready"
    );