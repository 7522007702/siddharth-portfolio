/* =========================================================
   SIDDHARTH.DEV
   VVIP PORTFOLIO SYSTEM
   COMPLETE MAIN JAVASCRIPT
   ---------------------------------------------------------
   Includes:
   • Cyberpunk animated city background
   • Rain
   • Fog
   • Neon lights
   • Moving traffic
   • Passing train
   • Parallax camera
   • Theme system
   • Navigation
   • Command palette
   • Skills/projects filters
   • Certificate upload
   • Resume studio
   • Contact form
   • Toast system
   • Accessibility
========================================================= */

"use strict";


/* =========================================================
   GLOBAL HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const clamp = (value, min, max) =>
    Math.max(min, Math.min(max, value));

const random = (min, max) =>
    Math.random() * (max - min) + min;

const randomInt = (min, max) =>
    Math.floor(random(min, max + 1));


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initPageLoader();
    initYear();
    initHeader();
    initScrollProgress();
    initMobileNavigation();
    initTheme();
    initTyping();
    initRevealAnimations();
    initActiveNavigation();
    initSkillFilters();
    initProjectFilters();
    initCommandPalette();
    initCertificates();
    initResumeStudio();
    initContactForm();
    initCopyCode();
    initBackToTop();
    initSmoothLinks();
    initKeyboardShortcuts();
    initResizeSafety();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initPageLoader() {

    const loader = $("#pageLoader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

            setTimeout(() => {
                loader.remove();
            }, 1000);

        }, 500);

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initYear() {

    const year = $("#currentYear");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header = $("#siteHeader");

    if (!header) return;

    const update = () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );

    };

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

    update();

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress = $("#scrollProgress");

    if (!progress) return;

    const update = () => {

        const scrollTop =
            window.scrollY;

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            total > 0
                ? (scrollTop / total) * 100
                : 0;

        progress.style.width =
            `${percentage}%`;

    };

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

    update();

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

    const button = $("#mobileMenuBtn");
    const nav = $("#mobileNav");

    if (!button || !nav) return;

    const close = () => {

        nav.classList.remove("open");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    };

    button.addEventListener("click", () => {

        const open =
            nav.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            String(open)
        );

    });

    $$(".mobile-nav a").forEach(link => {

        link.addEventListener(
            "click",
            close
        );

    });

    document.addEventListener("click", event => {

        if (
            !nav.contains(event.target) &&
            !button.contains(event.target)
        ) {

            close();

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1100) {

            close();

        }

    });

}


/* =========================================================
   THEME SYSTEM
========================================================= */

function initTheme() {

    const toggle = $("#themeToggle");

    const saved =
        localStorage.getItem(
            "siddharth-theme"
        );

    if (saved === "light") {

        document.body.classList.add(
            "light-theme"
        );

    }

    const updateIcon = () => {

        if (!toggle) return;

        const icon =
            $("i", toggle);

        if (!icon) return;

        const light =
            document.body.classList.contains(
                "light-theme"
            );

        icon.className =
            light
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

    };

    toggle?.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-theme"
        );

        const light =
            document.body.classList.contains(
                "light-theme"
            );

        localStorage.setItem(
            "siddharth-theme",
            light ? "light" : "dark"
        );

        updateIcon();

        showToast(
            light
                ? "Light theme activated"
                : "Dark theme activated"
        );

    });

    updateIcon();

}


/* =========================================================
   TYPING EFFECT
========================================================= */

function initTyping() {

    const element = $("#typingText");

    if (!element) return;

    const words = [

        "Developer",
        "Data Analyst",
        "Problem Solver",
        "Digital Builder",
        "Continuous Learner",
        "Technology Enthusiast"

    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const type = () => {

        const word =
            words[wordIndex];

        if (!deleting) {

            characterIndex++;

            element.textContent =
                word.slice(
                    0,
                    characterIndex
                );

            if (
                characterIndex >=
                word.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    1400
                );

                return;

            }

        } else {

            characterIndex--;

            element.textContent =
                word.slice(
                    0,
                    characterIndex
                );

            if (characterIndex <= 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }

        setTimeout(
            type,
            deleting ? 45 : 90
        );

    };

    type();

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        $$(".reveal");

    if (!elements.length) return;

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });

        return;

    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        $$("main section[id]");

    const links =
        $$(".desktop-nav .nav-link");

    if (!sections.length) return;

    const update = () => {

        const position =
            window.scrollY + 220;

        let current = "home";

        sections.forEach(section => {

            if (
                position >=
                section.offsetTop
            ) {

                current =
                    section.id;

            }

        });

        links.forEach(link => {

            const target =
                link
                    .getAttribute("href")
                    ?.replace("#", "");

            link.classList.toggle(
                "active",
                target === current
            );

        });

    };

    window.addEventListener(
        "scroll",
        update,
        { passive: true }
    );

    update();

}


/* =========================================================
   SKILL FILTER
========================================================= */

function initSkillFilters() {

    const filters =
        $$(".skill-filter");

    const cards =
        $$(".skill-card");

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });

                filter.classList.add(
                    "active"
                );

                const selected =
                    filter.dataset.filter;

                cards.forEach(card => {

                    const category =
                        card.dataset.category;

                    const visible =
                        selected === "all" ||
                        category === selected;

                    card.classList.toggle(
                        "hidden",
                        !visible
                    );

                });

            }
        );

    });

}


/* =========================================================
   PROJECT FILTER
========================================================= */

function initProjectFilters() {

    const filters =
        $$(".project-filter-btn");

    const cards =
        $$(".project-card");

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(button => {

                    button.classList.remove(
                        "active"
                    );

                });

                filter.classList.add(
                    "active"
                );

                const selected =
                    filter.dataset.projectFilter;

                cards.forEach(card => {

                    const category =
                        card.dataset.projectCategory;

                    const visible =
                        selected === "all" ||
                        category === selected;

                    card.classList.toggle(
                        "hidden",
                        !visible
                    );

                });

            }
        );

    });

}


/* =========================================================
   COMMAND PALETTE
========================================================= */

function initCommandPalette() {

    const button =
        $("#commandButton");

    const overlay =
        $("#commandOverlay");

    const close =
        $("#closeCommand");

    const search =
        $("#commandSearch");

    const items =
        $$(".command-item");

    const open = () => {

        if (!overlay) return;

        overlay.classList.add("open");

        document.body.classList.add(
            "modal-open"
        );

        setTimeout(() => {

            search?.focus();

        }, 100);

    };

    const closePalette = () => {

        overlay?.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "modal-open"
        );

    };

    button?.addEventListener(
        "click",
        open
    );

    close?.addEventListener(
        "click",
        closePalette
    );

    overlay?.addEventListener(
        "click",
        event => {

            if (
                event.target === overlay
            ) {

                closePalette();

            }

        }
    );

    search?.addEventListener(
        "input",
        () => {

            const query =
                search.value
                    .trim()
                    .toLowerCase();

            items.forEach(item => {

                const text =
                    item.textContent
                        .toLowerCase();

                item.style.display =
                    text.includes(query)
                        ? ""
                        : "none";

            });

        }
    );

    items.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const command =
                    item.dataset.command;

                closePalette();

                if (
                    command === "theme"
                ) {

                    $("#themeToggle")?.click();

                    return;

                }

                const target =
                    document.getElementById(
                        command
                    );

                target?.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });

    window.openCommandPalette =
        open;

    window.closeCommandPalette =
        closePalette;

}


/* =========================================================
   CERTIFICATES
========================================================= */

function initCertificates() {

    const upload =
        $("#certificateUpload");

    const grid =
        $("#certificatesGrid");

    if (!upload || !grid) return;

    upload.addEventListener(
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
                    "Please upload an image certificate."
                );

                upload.value = "";

                return;

            }

            const reader =
                new FileReader();

            reader.onload = result => {

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "certificate-card uploaded";

                const imageURL =
                    result.target.result;

                card.innerHTML = `

                    <button
                        type="button"
                        class="certificate-delete"
                        aria-label="Remove certificate"
                        title="Remove certificate"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <img
                        src="${imageURL}"
                        alt="Uploaded certificate"
                        class="certificate-image"
                    >

                    <div class="certificate-content">

                        <div class="certificate-type">
                            UPLOADED
                        </div>

                        <h3>
                            ${escapeHTML(file.name)}
                        </h3>

                        <p>
                            Added locally to this portfolio.
                        </p>

                    </div>
                `;

                grid.prepend(card);

                const image =
                    $(".certificate-image", card);

                image?.addEventListener(
                    "click",
                    () => {

                        openCertificateModal(
                            image.src
                        );

                    }
                );

                $(".certificate-delete", card)
                    ?.addEventListener(
                        "click",
                        () => {

                            card.remove();

                            showToast(
                                "Certificate removed"
                            );

                        }
                    );

                showToast(
                    "Certificate added successfully"
                );

            };

            reader.readAsDataURL(file);

            upload.value = "";

        }
    );

    $$(".certificate-image")
        .forEach(image => {

            image.addEventListener(
                "click",
                () => {

                    openCertificateModal(
                        image.src
                    );

                }
            );

        });

}


/* =========================================================
   CERTIFICATE MODAL
========================================================= */

const certificateModal =
    $("#certificateModal");

const certificateModalImage =
    $("#certificateModalImage");

const certificateModalClose =
    $("#certificateModalClose");


function openCertificateModal(src) {

    if (
        !certificateModal ||
        !certificateModalImage
    ) return;

    certificateModalImage.src =
        src;

    certificateModal.classList.add(
        "open"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeCertificateModal() {

    certificateModal?.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


certificateModalClose?.addEventListener(
    "click",
    closeCertificateModal
);


certificateModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            certificateModal
        ) {

            closeCertificateModal();

        }

    }
);


/* =========================================================
   RESUME STUDIO
========================================================= */

function initResumeStudio() {

    const fields = {

        name: $("#resumeName"),
        title: $("#resumeTitle"),
        email: $("#resumeEmail"),
        location: $("#resumeLocation"),
        phone: $("#resumePhone"),
        summary: $("#resumeSummary"),
        skills: $("#resumeSkills"),
        experience: $("#resumeExperience"),
        education: $("#resumeEducation")

    };

    const preview = {

        name: $("#previewName"),
        title: $("#previewTitle"),
        email: $("#previewEmail"),
        location: $("#previewLocation"),
        phone: $("#previewPhone"),
        summary: $("#previewSummary"),
        skills: $("#previewSkills"),
        experience: $("#previewExperience"),
        education: $("#previewEducation")

    };

    const update = () => {

        if (preview.name) {

            preview.name.textContent =
                fields.name?.value ||
                "Your Name";

        }

        if (preview.title) {

            preview.title.textContent =
                fields.title?.value ||
                "Professional Title";

        }

        if (preview.email) {

            preview.email.textContent =
                fields.email?.value ||
                "email@example.com";

        }

        if (preview.location) {

            preview.location.textContent =
                fields.location?.value ||
                "Location";

        }

        if (preview.phone) {

            preview.phone.textContent =
                fields.phone?.value ||
                "Phone";

        }

        if (preview.summary) {

            preview.summary.textContent =
                fields.summary?.value ||
                "Professional summary";

        }

        if (preview.experience) {

            preview.experience.textContent =
                fields.experience?.value ||
                "Professional experience";

        }

        if (preview.education) {

            preview.education.textContent =
                fields.education?.value ||
                "Education";

        }

        if (preview.skills) {

            preview.skills.innerHTML = "";

            const value =
                fields.skills?.value || "";

            const skills =
                value
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(Boolean);

            skills.forEach(skill => {

                const span =
                    document.createElement(
                        "span"
                    );

                span.textContent =
                    skill;

                preview.skills.appendChild(
                    span
                );

            });

        }

    };

    Object.values(fields)
        .forEach(field => {

            field?.addEventListener(
                "input",
                update
            );

        });

    $("#updateResume")
        ?.addEventListener(
            "click",
            () => {

                update();

                showToast(
                    "Resume updated successfully"
                );

            }
        );

    update();


    /* -----------------------------------------------------
       RESUME TEMPLATES
    ----------------------------------------------------- */

    const buttons =
        $$(".template-btn");

    const paper =
        $("#resumePaper");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });

                button.classList.add(
                    "active"
                );

                const template =
                    button.dataset.template;

                if (!paper) return;

                paper.classList.remove(
                    "template-modern",
                    "template-minimal",
                    "template-terminal"
                );

                if (
                    template === "modern"
                ) {

                    paper.classList.add(
                        "template-modern"
                    );

                }

                if (
                    template === "minimal"
                ) {

                    paper.classList.add(
                        "template-minimal"
                    );

                }

                if (
                    template === "terminal"
                ) {

                    paper.classList.add(
                        "template-terminal"
                    );

                }

                showToast(
                    `${template || "Resume"} template selected`
                );

            }
        );

    });


    /* -----------------------------------------------------
       PRINT
    ----------------------------------------------------- */

    $("#printResume")
        ?.addEventListener(
            "click",
            () => {

                update();

                setTimeout(() => {

                    window.print();

                }, 100);

            }
        );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        $("#contactForm");

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const data =
                new FormData(form);

            const name =
                data.get("name");

            showToast(
                `Thanks ${name || "there"}! Message captured.`
            );

            form.reset();

        }
    );

}


/* =========================================================
   COPY CODE
========================================================= */

function initCopyCode() {

    const button =
        $("#copyCode");

    const code =
        $("#showcaseCode");

    if (!button || !code) return;

    button.addEventListener(
        "click",
        async () => {

            const text =
                code.innerText;

            try {

                await navigator.clipboard
                    .writeText(text);

                showToast(
                    "Code copied to clipboard"
                );

            } catch {

                showToast(
                    "Copy failed — select the code manually"
                );

            }

        }
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        $("#backToTop");

    if (!button) return;

    const update = () => {

        button.classList.toggle(
            "visible",
            window.scrollY > 500
        );

    };

    window.addEventListener(
        "scroll",
        update,
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

    update();

}


/* =========================================================
   TOAST
========================================================= */

let toastTimer = null;


function showToast(message) {

    const toast =
        $("#toast");

    const text =
        $("#toastMessage");

    if (!toast || !text) return;

    text.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(
        toastTimer
    );

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =========================================================
   SMOOTH LINKS
========================================================= */

function initSmoothLinks() {

    $$('a[href^="#"]')
        .forEach(link => {

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

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });

}


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

function initKeyboardShortcuts() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.target.matches(
                    "input, textarea, select"
                )
            ) {

                if (
                    event.key !== "Escape"
                ) {

                    return;

                }

            }

            if (
                event.ctrlKey ||
                event.metaKey
            ) {

                if (
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    window.openCommandPalette?.();

                }

            }

            if (
                event.key === "Escape"
            ) {

                window.closeCommandPalette?.();

                closeCertificateModal();

            }

            if (
                event.ctrlKey ||
                event.metaKey
            ) return;

            switch (
                event.key.toLowerCase()
            ) {

                case "h":

                    $("#home")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;

                case "p":

                    $("#projects")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;

                case "s":

                    $("#skills")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;

                case "r":

                    $("#resume")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;

                case "c":

                    $("#contact")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;

            }

        }
    );

}


/* =========================================================
   RESIZE SAFETY
========================================================= */

function initResizeSafety() {

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            document.body.classList.add(
                "is-resizing"
            );

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(() => {

                    document.body.classList.remove(
                        "is-resizing"
                    );

                    window.dispatchEvent(
                        new CustomEvent(
                            "portfolio:resize-complete"
                        )
                    );

                }, 180);

        }
    );

}


/* =========================================================
   =========================================================
   CYBERPUNK CITY BACKGROUND ENGINE
   =========================================================
========================================================= */

class CyberpunkCity {

    constructor() {

        this.canvas = null;
        this.ctx = null;

        this.width = 0;
        this.height = 0;
        this.dpr = 1;

        this.time = 0;
        this.lastTime = 0;

        this.mouseX = 0.5;
        this.mouseY = 0.5;

        this.targetMouseX = 0.5;
        this.targetMouseY = 0.5;

        this.buildings = [];
        this.windows = [];
        this.rain = [];
        this.cars = [];
        this.particles = [];
        this.fog = [];
        this.neonSigns = [];

        this.train = {
            active: false,
            x: -1000,
            speed: 900,
            width: 900,
            height: 125,
            y: 0,
            nextPass: random(5, 12),
            timer: 0
        };

        this.raf = null;

        this.reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        this.visible = true;

        this.init();

    }


    /* =====================================================
       INIT
    ===================================================== */

    init() {

        this.createCanvas();

        if (!this.canvas) return;

        this.resize();

        this.createWorld();

        this.bindEvents();

        this.start();

    }


    /* =====================================================
       CANVAS
    ===================================================== */

    createCanvas() {

        let canvas =
            document.getElementById(
                "cyberCityCanvas"
            );

        if (!canvas) {

            canvas =
                document.createElement(
                    "canvas"
                );

            canvas.id =
                "cyberCityCanvas";

            canvas.setAttribute(
                "aria-hidden",
                "true"
            );

            canvas.className =
                "cyber-city-canvas";

            const background =
                document.querySelector(
                    ".site-background"
                );

            if (background) {

                background.prepend(
                    canvas
                );

            } else {

                document.body.prepend(
                    canvas
                );

            }

        }

        this.canvas = canvas;

        this.ctx =
            canvas.getContext(
                "2d",
                {
                    alpha: true
                }
            );

    }


    /* =====================================================
       RESIZE
    ===================================================== */

    resize() {

        if (!this.canvas) return;

        this.width =
            window.innerWidth;

        this.height =
            window.innerHeight;

        this.dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        this.canvas.width =
            this.width * this.dpr;

        this.canvas.height =
            this.height * this.dpr;

        this.canvas.style.width =
            `${this.width}px`;

        this.canvas.style.height =
            `${this.height}px`;

        this.ctx.setTransform(
            this.dpr,
            0,
            0,
            this.dpr,
            0,
            0
        );

        this.createWorld();

    }


    /* =====================================================
       WORLD GENERATION
    ===================================================== */

    createWorld() {

        this.buildings = [];
        this.windows = [];
        this.rain = [];
        this.cars = [];
        this.particles = [];
        this.fog = [];
        this.neonSigns = [];

        const buildingCount =
            Math.max(
                20,
                Math.floor(
                    this.width / 45
                )
            );

        for (
            let i = 0;
            i < buildingCount;
            i++
        ) {

            const width =
                random(
                    45,
                    120
                );

            const height =
                random(
                    this.height * 0.15,
                    this.height * 0.55
                );

            const x =
                i *
                (
                    this.width /
                    buildingCount
                ) +
                random(-20, 20);

            this.buildings.push({

                x,
                width,
                height,

                depth:
                    random(
                        0.25,
                        1
                    ),

                roof:
                    randomInt(
                        0,
                        3
                    ),

                antenna:
                    Math.random() > 0.65,

                neon:
                    Math.random() > 0.58

            });

        }


        /* Windows */

        const windowCount =
            Math.floor(
                this.width *
                0.55
            );

        for (
            let i = 0;
            i < windowCount;
            i++
        ) {

            this.windows.push({

                x:
                    random(
                        0,
                        this.width
                    ),

                y:
                    random(
                        this.height * 0.3,
                        this.height * 0.77
                    ),

                width:
                    random(
                        2,
                        5
                    ),

                height:
                    random(
                        4,
                        12
                    ),

                phase:
                    random(
                        0,
                        Math.PI * 2
                    ),

                speed:
                    random(
                        0.3,
                        1.4
                    ),

                brightness:
                    random(
                        0.2,
                        1
                    )

            });

        }


        /* Rain */

        const rainCount =
            this.reducedMotion
                ? 50
                : Math.min(
                    380,
                    Math.floor(
                        this.width *
                        0.28
                    )
                );

        for (
            let i = 0;
            i < rainCount;
            i++
        ) {

            this.rain.push({

                x:
                    random(
                        0,
                        this.width
                    ),

                y:
                    random(
                        0,
                        this.height
                    ),

                length:
                    random(
                        8,
                        28
                    ),

                speed:
                    random(
                        500,
                        1100
                    ),

                drift:
                    random(
                        15,
                        55
                    ),

                alpha:
                    random(
                        0.1,
                        0.55
                    )

            });

        }


        /* Cars */

        for (
            let i = 0;
            i < 16;
            i++
        ) {

            this.cars.push({

                x:
                    random(
                        -this.width,
                        this.width
                    ),

                lane:
                    randomInt(
                        0,
                        2
                    ),

                speed:
                    random(
                        90,
                        230
                    ),

                scale:
                    random(
                        0.45,
                        1.15
                    ),

                direction:
                    Math.random() >
                    0.5
                        ? 1
                        : -1,

                phase:
                    random(
                        0,
                        Math.PI * 2
                    )

            });

        }


        /* Atmospheric particles */

        for (
            let i = 0;
            i < 80;
            i++
        ) {

            this.particles.push({

                x:
                    random(
                        0,
                        this.width
                    ),

                y:
                    random(
                        0,
                        this.height
                    ),

                radius:
                    random(
                        0.5,
                        2
                    ),

                speed:
                    random(
                        5,
                        25
                    ),

                phase:
                    random(
                        0,
                        Math.PI * 2
                    )

            });

        }


        /* Fog layers */

        for (
            let i = 0;
            i < 8;
            i++
        ) {

            this.fog.push({

                x:
                    random(
                        -this.width,
                        this.width
                    ),

                y:
                    random(
                        this.height *
                        0.45,
                        this.height
                    ),

                width:
                    random(
                        280,
                        700
                    ),

                height:
                    random(
                        70,
                        180
                    ),

                speed:
                    random(
                        4,
                        15
                    ),

                alpha:
                    random(
                        0.015,
                        0.055
                    )

            });

        }


        /* Neon signs */

        const labels = [

            "DEV",
            "DATA",
            "CODE",
            "SQL",
            "AI",
            "BUILD",
            "LAB",
            "SYSTEM",
            "WEB",
            "JS"

        ];

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            this.neonSigns.push({

                x:
                    random(
                        0,
                        this.width
                    ),

                y:
                    random(
                        this.height *
                        0.35,
                        this.height *
                        0.7
                    ),

                text:
                    labels[
                        randomInt(
                            0,
                            labels.length - 1
                        )
                    ],

                size:
                    random(
                        9,
                        16
                    ),

                phase:
                    random(
                        0,
                        Math.PI * 2
                    ),

                flicker:
                    random(
                        0.5,
                        2
                    )

            });

        }

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    bindEvents() {

        window.addEventListener(
            "resize",
            () => {

                this.resize();

            }
        );


        window.addEventListener(
            "mousemove",
            event => {

                this.targetMouseX =
                    event.clientX /
                    this.width;

                this.targetMouseY =
                    event.clientY /
                    this.height;

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "visibilitychange",
            () => {

                this.visible =
                    document.visibilityState ===
                    "visible";

            }
        );


        window.addEventListener(
            "portfolio:resize-complete",
            () => {

                this.resize();

            }
        );

    }


    /* =====================================================
       START
    ===================================================== */

    start() {

        this.lastTime =
            performance.now();

        const loop =
            timestamp => {

                if (!this.visible) {

                    this.lastTime =
                        timestamp;

                    this.raf =
                        requestAnimationFrame(
                            loop
                        );

                    return;

                }

                let delta =
                    (
                        timestamp -
                        this.lastTime
                    ) / 1000;

                delta =
                    Math.min(
                        delta,
                        0.05
                    );

                this.lastTime =
                    timestamp;

                this.time +=
                    delta;

                this.update(
                    delta
                );

                this.draw();

                this.raf =
                    requestAnimationFrame(
                        loop
                    );

            };

        this.raf =
            requestAnimationFrame(
                loop
            );

    }


    /* =====================================================
       UPDATE
    ===================================================== */

    update(delta) {

        /* Smooth mouse */

        this.mouseX +=
            (
                this.targetMouseX -
                this.mouseX
            ) *
            Math.min(
                1,
                delta * 6
            );

        this.mouseY +=
            (
                this.targetMouseY -
                this.mouseY
            ) *
            Math.min(
                1,
                delta * 6
            );


        /* Rain */

        this.rain.forEach(drop => {

            drop.y +=
                drop.speed *
                delta;

            drop.x +=
                drop.drift *
                delta;

            if (
                drop.y >
                this.height + 30
            ) {

                drop.y =
                    random(
                        -100,
                        -20
                    );

                drop.x =
                    random(
                        0,
                        this.width
                    );

            }

        });


        /* Cars */

        this.cars.forEach(car => {

            car.x +=
                car.speed *
                car.direction *
                delta;

            if (
                car.direction > 0 &&
                car.x >
                this.width + 200
            ) {

                car.x =
                    -250;

            }

            if (
                car.direction < 0 &&
                car.x <
                -250
            ) {

                car.x =
                    this.width + 250;

            }

        });


        /* Particles */

        this.particles.forEach(particle => {

            particle.y +=
                particle.speed *
                delta;

            particle.x +=
                Math.sin(
                    this.time +
                    particle.phase
                ) *
                delta *
                3;

            if (
                particle.y >
                this.height
            ) {

                particle.y =
                    -10;

            }

        });


        /* Fog */

        this.fog.forEach(layer => {

            layer.x +=
                layer.speed *
                delta;

            if (
                layer.x >
                this.width +
                layer.width
            ) {

                layer.x =
                    -layer.width -
                    100;

            }

        });


        /* Train */

        this.train.timer +=
            delta;

        if (
            !this.train.active &&
            this.train.timer >
            this.train.nextPass
        ) {

            this.train.active =
                true;

            this.train.timer =
                0;

            this.train.x =
                -this.train.width -
                100;

            this.train.y =
                this.height *
                0.20;

            this.train.speed =
                random(
                    650,
                    1050
                );

        }

        if (this.train.active) {

            this.train.x +=
                this.train.speed *
                delta;

            if (
                this.train.x >
                this.width + 300
            ) {

                this.train.active =
                    false;

                this.train.timer =
                    0;

                this.train.nextPass =
                    random(
                        7,
                        16
                    );

            }

        }

    }


    /* =====================================================
       DRAW
    ===================================================== */

    draw() {

        const ctx =
            this.ctx;

        if (!ctx) return;

        ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );

        this.drawSky(
            ctx
        );

        this.drawGlow(
            ctx
        );

        this.drawBuildings(
            ctx
        );

        this.drawWindows(
            ctx
        );

        this.drawRoad(
            ctx
        );

        this.drawTraffic(
            ctx
        );

        this.drawNeonSigns(
            ctx
        );

        this.drawTrain(
            ctx
        );

        this.drawFog(
            ctx
        );

        this.drawParticles(
            ctx
        );

        this.drawRain(
            ctx
        );

        this.drawVignette(
            ctx
        );

    }


    /* =====================================================
       SKY
    ===================================================== */

    drawSky(ctx) {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                this.height
            );

        gradient.addColorStop(
            0,
            "#02050c"
        );

        gradient.addColorStop(
            0.45,
            "#07101c"
        );

        gradient.addColorStop(
            0.78,
            "#090d17"
        );

        gradient.addColorStop(
            1,
            "#020306"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );


        /* distant horizon */

        const horizon =
            this.height *
            0.55;

        const glow =
            ctx.createRadialGradient(
                this.width * 0.5,
                horizon,
                0,
                this.width * 0.5,
                horizon,
                this.width * 0.65
            );

        glow.addColorStop(
            0,
            "rgba(0,210,255,.10)"
        );

        glow.addColorStop(
            0.45,
            "rgba(0,120,220,.035)"
        );

        glow.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle =
            glow;

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

    }


    /* =====================================================
       GLOW
    ===================================================== */

    drawGlow(ctx) {

        const x =
            this.width *
            (
                0.5 +
                (
                    this.mouseX -
                    0.5
                ) *
                0.04
            );

        const y =
            this.height *
            0.48;

        const gradient =
            ctx.createRadialGradient(
                x,
                y,
                0,
                x,
                y,
                this.width * 0.4
            );

        gradient.addColorStop(
            0,
            "rgba(0,255,220,.055)"
        );

        gradient.addColorStop(
            0.35,
            "rgba(0,150,255,.025)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

    }


    /* =====================================================
       BUILDINGS
    ===================================================== */

    drawBuildings(ctx) {

        const horizon =
            this.height *
            0.80;

        this.buildings.forEach(
            (building, index) => {

                const parallax =
                    (
                        this.mouseX -
                        0.5
                    ) *
                    building.depth *
                    25;

                const x =
                    building.x +
                    parallax;

                const y =
                    horizon -
                    building.height;

                const gradient =
                    ctx.createLinearGradient(
                        0,
                        y,
                        0,
                        horizon
                    );

                gradient.addColorStop(
                    0,
                    "#07121e"
                );

                gradient.addColorStop(
                    1,
                    "#02050a"
                );

                ctx.fillStyle =
                    gradient;

                ctx.fillRect(
                    x,
                    y,
                    building.width,
                    building.height
                );


                /* building edge */

                ctx.strokeStyle =
                    "rgba(0,220,255,.035)";

                ctx.lineWidth =
                    1;

                ctx.strokeRect(
                    x,
                    y,
                    building.width,
                    building.height
                );


                /* roof */

                if (
                    building.roof ===
                    1
                ) {

                    ctx.fillStyle =
                        "rgba(0,230,255,.08)";

                    ctx.fillRect(
                        x +
                        building.width *
                        0.25,
                        y - 3,
                        building.width *
                        0.5,
                        3
                    );

                }


                /* antenna */

                if (
                    building.antenna
                ) {

                    ctx.strokeStyle =
                        "rgba(100,210,255,.14)";

                    ctx.beginPath();

                    ctx.moveTo(
                        x +
                        building.width / 2,
                        y
                    );

                    ctx.lineTo(
                        x +
                        building.width / 2,
                        y - random(12, 40)
                    );

                    ctx.stroke();

                }


                /* side glow */

                if (
                    building.neon
                ) {

                    ctx.fillStyle =
                        "rgba(0,255,220,.025)";

                    ctx.fillRect(
                        x,
                        y,
                        2,
                        building.height
                    );

                }

            }
        );

    }


    /* =====================================================
       WINDOWS
    ===================================================== */

    drawWindows(ctx) {

        this.windows.forEach(
            windowLight => {

                const flicker =
                    (
                        Math.sin(
                            this.time *
                            windowLight.speed +
                            windowLight.phase
                        ) +
                        1
                    ) /
                    2;

                const alpha =
                    windowLight.brightness *
                    (
                        0.25 +
                        flicker *
                        0.5
                    );

                ctx.fillStyle =
                    `rgba(95,210,255,${alpha})`;

                ctx.fillRect(
                    windowLight.x +
                    (
                        this.mouseX -
                        0.5
                    ) *
                    8,

                    windowLight.y,

                    windowLight.width,

                    windowLight.height
                );

            }
        );

    }


    /* =====================================================
       ROAD
    ===================================================== */

    drawRoad(ctx) {

        const roadTop =
            this.height *
            0.78;

        const gradient =
            ctx.createLinearGradient(
                0,
                roadTop,
                0,
                this.height
            );

        gradient.addColorStop(
            0,
            "#080c13"
        );

        gradient.addColorStop(
            1,
            "#020305"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            roadTop,
            this.width,
            this.height -
            roadTop
        );


        /* horizon line */

        ctx.fillStyle =
            "rgba(0,255,230,.16)";

        ctx.fillRect(
            0,
            roadTop,
            this.width,
            1
        );


        /* lane lines */

        ctx.strokeStyle =
            "rgba(80,170,220,.08)";

        ctx.lineWidth =
            1;

        const laneY =
            this.height *
            0.91;

        for (
            let x = -this.width;
            x < this.width * 2;
            x += 90
        ) {

            ctx.beginPath();

            ctx.moveTo(
                x,
                laneY
            );

            ctx.lineTo(
                x + 55,
                laneY
            );

            ctx.stroke();

        }

    }


    /* =====================================================
       TRAFFIC
    ===================================================== */

    drawTraffic(ctx) {

        const roadY =
            this.height *
            0.82;

        this.cars.forEach(car => {

            const y =
                roadY +
                car.lane *
                38;

            const width =
                55 *
                car.scale;

            const height =
                12 *
                car.scale;

            const x =
                car.x;

            /* glow */

            ctx.shadowBlur =
                14 *
                car.scale;

            ctx.shadowColor =
                car.direction > 0
                    ? "#00eaff"
                    : "#ff315c";

            ctx.fillStyle =
                car.direction > 0
                    ? "rgba(0,220,255,.75)"
                    : "rgba(255,35,80,.75)";

            ctx.fillRect(
                x,
                y,
                width,
                height
            );

            ctx.shadowBlur =
                0;

            /* body */

            ctx.fillStyle =
                "rgba(8,14,23,.9)";

            ctx.fillRect(
                x + 8,
                y - 7,
                width - 16,
                7
            );

            /* lights */

            ctx.fillStyle =
                car.direction > 0
                    ? "#6ffff5"
                    : "#ff496c";

            const lightX =
                car.direction > 0
                    ? x + width - 5
                    : x + 2;

            ctx.fillRect(
                lightX,
                y + 2,
                3,
                4
            );

        });

    }


    /* =====================================================
       NEON SIGNS
    ===================================================== */

    drawNeonSigns(ctx) {

        this.neonSigns.forEach(sign => {

            const flicker =
                0.65 +
                Math.sin(
                    this.time *
                    sign.flicker +
                    sign.phase
                ) *
                0.2;

            const x =
                sign.x +
                (
                    this.mouseX -
                    0.5
                ) *
                20;

            ctx.save();

            ctx.font =
                `700 ${sign.size}px monospace`;

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";

            ctx.shadowBlur =
                14;

            ctx.shadowColor =
                "#00ffe0";

            ctx.fillStyle =
                `rgba(70,255,230,${flicker})`;

            ctx.fillText(
                sign.text,
                x,
                sign.y
            );

            ctx.restore();

        });

    }


    /* =====================================================
       TRAIN
    ===================================================== */

    drawTrain(ctx) {

        if (
            !this.train.active
        ) return;

        const x =
            this.train.x;

        const y =
            this.train.y;

        const width =
            this.train.width;

        const height =
            this.train.height;

        ctx.save();

        /* train glow */

        ctx.shadowBlur =
            25;

        ctx.shadowColor =
            "rgba(0,240,255,.45)";

        const bodyGradient =
            ctx.createLinearGradient(
                x,
                y,
                x,
                y + height
            );

        bodyGradient.addColorStop(
            0,
            "#162c3b"
        );

        bodyGradient.addColorStop(
            0.5,
            "#07131e"
        );

        bodyGradient.addColorStop(
            1,
            "#03070c"
        );

        ctx.fillStyle =
            bodyGradient;

        ctx.fillRect(
            x,
            y,
            width,
            height
        );

        ctx.shadowBlur =
            0;


        /* top neon stripe */

        ctx.fillStyle =
            "#00eaff";

        ctx.fillRect(
            x,
            y + 7,
            width,
            2
        );


        /* lower stripe */

        ctx.fillStyle =
            "rgba(255,40,120,.7)";

        ctx.fillRect(
            x,
            y + height - 8,
            width,
            2
        );


        /* windows */

        const coaches =
            Math.ceil(
                width / 150
            );

        for (
            let i = 0;
            i < coaches;
            i++
        ) {

            const wx =
                x +
                i * 150 +
                28;

            const wy =
                y + 32;

            const ww =
                92;

            const wh =
                48;

            ctx.fillStyle =
                "rgba(7,22,32,.95)";

            ctx.fillRect(
                wx,
                wy,
                ww,
                wh
            );

            ctx.strokeStyle =
                "rgba(0,230,255,.28)";

            ctx.strokeRect(
                wx,
                wy,
                ww,
                wh
            );

            for (
                let j = 0;
                j < 3;
                j++
            ) {

                ctx.fillStyle =
                    `rgba(120,230,255,${
                        0.08 +
                        (
                            Math.sin(
                                this.time *
                                1.2 +
                                i +
                                j
                            ) +
                            1
                        ) *
                        0.06
                    })`;

                ctx.fillRect(
                    wx + 8 +
                    j * 27,
                    wy + 8,
                    18,
                    31
                );

            }

        }


        /* train headlights */

        ctx.shadowBlur =
            22;

        ctx.shadowColor =
            "#ffffff";

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            x + width - 18,
            y + height / 2,
            4,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }


    /* =====================================================
       FOG
    ===================================================== */

    drawFog(ctx) {

        this.fog.forEach(layer => {

            const gradient =
                ctx.createRadialGradient(
                    layer.x,
                    layer.y,
                    0,
                    layer.x,
                    layer.y,
                    layer.width
                );

            gradient.addColorStop(
                0,
                `rgba(90,180,220,${layer.alpha})`
            );

            gradient.addColorStop(
                1,
                "rgba(0,0,0,0)"
            );

            ctx.fillStyle =
                gradient;

            ctx.beginPath();

            ctx.ellipse(
                layer.x,
                layer.y,
                layer.width,
                layer.height,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

    }


    /* =====================================================
       PARTICLES
    ===================================================== */

    drawParticles(ctx) {

        this.particles.forEach(
            particle => {

                const alpha =
                    0.12 +
                    (
                        Math.sin(
                            this.time *
                            1.5 +
                            particle.phase
                        ) +
                        1
                    ) *
                    0.08;

                ctx.fillStyle =
                    `rgba(100,220,255,${alpha})`;

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );

    }


    /* =====================================================
       RAIN
    ===================================================== */

    drawRain(ctx) {

        ctx.lineWidth =
            0.7;

        this.rain.forEach(drop => {

            const gradient =
                ctx.createLinearGradient(
                    drop.x,
                    drop.y,
                    drop.x +
                    drop.drift *
                    0.04,
                    drop.y +
                    drop.length
                );

            gradient.addColorStop(
                0,
                `rgba(100,210,255,0)`
            );

            gradient.addColorStop(
                0.5,
                `rgba(100,210,255,${drop.alpha})`
            );

            gradient.addColorStop(
                1,
                `rgba(100,210,255,0)`
            );

            ctx.strokeStyle =
                gradient;

            ctx.beginPath();

            ctx.moveTo(
                drop.x,
                drop.y
            );

            ctx.lineTo(
                drop.x +
                drop.drift *
                0.04,

                drop.y +
                drop.length
            );

            ctx.stroke();

        });

    }


    /* =====================================================
       VIGNETTE
    ===================================================== */

    drawVignette(ctx) {

        const gradient =
            ctx.createRadialGradient(
                this.width / 2,
                this.height / 2,
                this.height * 0.2,
                this.width / 2,
                this.height / 2,
                Math.max(
                    this.width,
                    this.height
                ) *
                0.75
            );

        gradient.addColorStop(
            0,
            "rgba(0,0,0,0)"
        );

        gradient.addColorStop(
            0.72,
            "rgba(0,0,0,.16)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,.72)"
        );

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

    }

}


/* =========================================================
   START CYBERPUNK BACKGROUND
========================================================= */

let cyberCity = null;


function initCyberpunkBackground() {

    try {

        cyberCity =
            new CyberpunkCity();

        window.siddharthCyberCity =
            cyberCity;

    } catch (error) {

        console.error(
            "Cyberpunk background initialization failed:",
            error
        );

    }

}


/* =========================================================
   BACKGROUND BOOT
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initCyberpunkBackground,
        {
            once: true
        }
    );

} else {

    initCyberpunkBackground();

}


/* =========================================================
   BACKGROUND CSS FALLBACK
========================================================= */

const backgroundStyle =
    document.createElement(
        "style"
    );

backgroundStyle.textContent = `

    .cyber-city-canvas {

        position: fixed !important;

        inset: 0 !important;

        width: 100vw !important;

        height: 100vh !important;

        display: block !important;

        pointer-events: none !important;

        z-index: -20 !important;

        opacity: 1 !important;

    }

    .site-background {

        position: fixed !important;

        inset: 0 !important;

        overflow: hidden !important;

        pointer-events: none !important;

        z-index: -30 !important;

    }

    body {

        position: relative;

        background:
            #02050a !important;

    }

    body > *:not(.site-background) {

        position: relative;

        z-index: 1;

    }

    body.modal-open {

        overflow: hidden;

    }

    @media (prefers-reduced-motion: reduce) {

        .cyber-city-canvas {

            opacity: .72 !important;

        }

    }

`;

document.head.appendChild(
    backgroundStyle
);


/* =========================================================
   OPTIONAL DOM BACKGROUND FALLBACK
========================================================= */

function ensureBackgroundContainer() {

    let background =
        document.querySelector(
            ".site-background"
        );

    if (!background) {

        background =
            document.createElement(
                "div"
            );

        background.className =
            "site-background";

        background.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.prepend(
            background
        );

        if (
            cyberCity &&
            cyberCity.canvas
        ) {

            background.prepend(
                cyberCity.canvas
            );

        }

    }

}


ensureBackgroundContainer();


/* =========================================================
   VISUAL PERFORMANCE
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   FINAL CONSOLE BRANDING
========================================================= */

console.log(
`
%c SIDDHARTH.DEV
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c VVIP PORTFOLIO SYSTEM
%c Cyberpunk City Engine: ONLINE
%c Rain Engine: ONLINE
%c Neon System: ONLINE
%c Traffic System: ONLINE
%c Train System: ONLINE
%c Parallax System: ONLINE
%c Portfolio UI: ONLINE
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c Build. Learn. Improve.
`,
"color:#64ffda;font-size:24px;font-weight:900;",
"color:#314154;font-size:12px;",
"color:#ffffff;font-size:14px;font-weight:bold;",
"color:#00eaff;font-size:12px;",
"color:#64ffda;font-size:12px;",
"color:#ff4f9a;font-size:12px;",
"color:#ffd166;font-size:12px;",
"color:#00eaff;font-size:12px;",
"color:#8be9fd;font-size:12px;",
"color:#64ffda;font-size:12px;",
"color:#314154;font-size:12px;",
"color:#aab5c7;font-size:13px;"
);


/* =========================================================
   GLOBAL EXPORTS
========================================================= */

window.showToast =
    showToast;

window.openCertificateModal =
    openCertificateModal;

window.closeCertificateModal =
    closeCertificateModal;

window.escapeHTML =
    escapeHTML;


/* =========================================================
   END
========================================================= */