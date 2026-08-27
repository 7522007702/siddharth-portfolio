/* =========================================================
   SIDDHARTH.DEV
   VVIP PORTFOLIO SYSTEM
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max);


const escapeHTML = (value) => {

    const div = document.createElement("div");

    div.textContent = value ?? "";

    return div.innerHTML;
};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initYear();
    initHeader();
    initMobileNavigation();
    initTyping();
    initCursor();
    initParallax();
    initRevealAnimations();
    initCounters();
    initSkills();
    initCertificates();
    initContactForm();
    initResumeSystem();

});


/* =========================================================
   YEAR
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


    const sections = $$("main section[id]");

    const links = $$(".nav-link");

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                links.forEach(link => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${id}`
                    );

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


    sections.forEach(section =>
        observer.observe(section)
    );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initMobileNavigation() {

    const toggle = $("#menuToggle");
    const nav = $("#mainNav");

    if (!toggle || !nav) return;

    toggle.addEventListener(
        "click",
        () => {

            const open =
                nav.classList.toggle("open");

            toggle.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );


    $$(".nav-link", nav).forEach(link => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


    document.addEventListener(
        "click",
        event => {

            if (
                !nav.contains(event.target) &&
                !toggle.contains(event.target)
            ) {
                nav.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }
    );

}


/* =========================================================
   TYPING ENGINE
========================================================= */

function initTyping() {

    const element = $("#typingText");

    if (!element) return;

    const words = [
        "Developer",
        "Builder",
        "Problem Solver",
        "Digital Creator",
        "Continuous Learner"
    ];

    let wordIndex = 0;
    let charIndex = 0;

    let deleting = false;

    const type = () => {

        const current =
            words[wordIndex];

        if (!deleting) {

            charIndex++;

            element.textContent =
                current.slice(0, charIndex);

            if (charIndex >= current.length) {

                deleting = true;

                setTimeout(
                    type,
                    1450
                );

                return;
            }

        } else {

            charIndex--;

            element.textContent =
                current.slice(0, charIndex);

            if (charIndex <= 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }

        setTimeout(
            type,
            deleting ? 48 : 90
        );

    };

    type();

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

    const dot = $(".cursor-dot");
    const ring = $(".cursor-ring");

    if (!dot || !ring) return;


    const isTouch =
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;

    if (isTouch) {

        dot.style.display = "none";
        ring.style.display = "none";

        return;
    }


    document.addEventListener(
        "mousemove",
        event => {

            dot.style.left =
                `${event.clientX}px`;

            dot.style.top =
                `${event.clientY}px`;

            ring.animate(
                {
                    left: `${event.clientX}px`,
                    top: `${event.clientY}px`
                },
                {
                    duration: 500,
                    fill: "forwards"
                }
            );

        }
    );


    $$("a, button, input, textarea, .template-card")
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    ring.classList.add("cursor-hover");
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    ring.classList.remove("cursor-hover");
                }
            );

        });

}


/* =========================================================
   PARALLAX
========================================================= */

function initParallax() {

    const body = document.body;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            const x =
                event.clientX /
                window.innerWidth;

            const y =
                event.clientY /
                window.innerHeight;

            targetX =
                (x - 0.5) * 2;

            targetY =
                (y - 0.5) * 2;

        },
        { passive: true }
    );


    const animate = () => {

        currentX +=
            (targetX - currentX) * 0.035;

        currentY +=
            (targetY - currentY) * 0.035;


        body.style.setProperty(
            "--mouse-x",
            `${currentX * 100}`
        );

        body.style.setProperty(
            "--mouse-y",
            `${currentY * 100}`
        );


        requestAnimationFrame(animate);

    };


    animate();

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const items =
        $$(".reveal");

    if (!items.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target
                            .classList
                            .add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    items.forEach(
        item =>
            observer.observe(item)
    );

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        $$("[data-counter]");

    if (!counters.length) return;


    const animateCounter =
        element => {

            const target =
                Number(
                    element.dataset.counter
                );

            let value = 0;

            const duration = 1100;

            const start =
                performance.now();


            const frame =
                now => {

                    const progress =
                        clamp(
                            (now - start) /
                            duration,
                            0,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    value =
                        Math.round(
                            target * eased
                        );

                    element.textContent =
                        value;

                    if (progress < 1) {
                        requestAnimationFrame(
                            frame
                        );
                    }

                };


            requestAnimationFrame(frame);

        };


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;

                    animateCounter(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.7
            }
        );


    counters.forEach(counter =>
        observer.observe(counter)
    );

}


/* =========================================================
   SKILLS
========================================================= */

function initSkills() {

    const bars =
        $$(".skill-bar i");

    if (!bars.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;

                    const bar =
                        entry.target;

                    const width =
                        getComputedStyle(
                            bar
                        ).getPropertyValue(
                            "--skill"
                        );

                    bar.style.width =
                        "0%";

                    requestAnimationFrame(
                        () => {

                            setTimeout(
                                () => {
                                    bar.style.width =
                                        width;
                                },
                                100
                            );

                        }
                    );

                    observer.unobserve(
                        bar
                    );

                });

            },
            {
                threshold: 0.25
            }
        );


    bars.forEach(
        bar =>
            observer.observe(bar)
    );

}


/* =========================================================
   CERTIFICATE UPLOAD
========================================================= */

function initCertificates() {

    const input =
        $("#certificateUpload");

    const grid =
        $("#certificateGrid");

    if (!input || !grid) return;


    input.addEventListener(
        "change",
        event => {

            const files =
                [...event.target.files];

            files.forEach(file => {

                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) return;


                const reader =
                    new FileReader();


                reader.onload =
                    loadEvent => {

                        const item =
                            document.createElement(
                                "div"
                            );

                        item.className =
                            "certificate-item";


                        const img =
                            document.createElement(
                                "img"
                            );

                        img.src =
                            loadEvent.target.result;

                        img.alt =
                            file.name;


                        item.appendChild(img);

                        grid.appendChild(item);

                    };


                reader.readAsDataURL(file);

            });


            if (files.length) {

                showToast(
                    `${files.length} certificate image${files.length > 1 ? "s" : ""} added`
                );

            }

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

            /*
             * The form uses mailto as a fallback.
             * We allow the browser to open the user's
             * configured email client.
             */

            const button =
                $("button[type='submit']", form);

            if (button) {

                button.disabled = true;

                setTimeout(
                    () => {
                        button.disabled = false;
                    },
                    1500
                );

            }

        }
    );

}


/* =========================================================
   RESUME SYSTEM
========================================================= */

function initResumeSystem() {

    const modal =
        $("#resumeModal");

    const openButton =
        $("#openResumeEditor");

    const closeButton =
        $("#closeResumeEditor");

    const printButton =
        $("#printResume");

    const resetButton =
        $("#resetResume");

    const paper =
        $("#resumePaper");

    const templateCards =
        $$(".template-card");

    const templateLabel =
        $("#activeTemplateLabel");

    const photoInput =
        $("#resumePhotoInput");

    const removePhoto =
        $("#removeResumePhoto");

    const photoBox =
        $("#resumePhotoBox");

    const photo =
        $("#resumePhoto");


    if (
        !modal ||
        !openButton ||
        !paper
    ) {
        return;
    }


    /* -------------------------------------------------------
       DEFAULT DATA
    ------------------------------------------------------- */

    const defaultData = {

        name:
            "Siddharth Mishra",

        title:
            "Developer • Builder • Learner",

        email:
            "siddharthmishra8@gmail.com",

        phone:
            "+91 XXXXX XXXXX",

        location:
            "Lucknow, Uttar Pradesh, India",

        linkedin:
            "linkedin.com/in/siddharthmishra8",

        github:
            "github.com/7522007702",

        summary:
            "BBA student and technology enthusiast with practical experience in retail sales and operations. Interested in programming, web development, data analytics and digital products. Strong problem-solving mindset with a continuous-learning approach.",

        technicalSkills:
            "HTML5, CSS3, JavaScript, Python, SQL, Power BI, Git, GitHub, Flutter, Firebase, Data Analysis",

        softSkills:
            "Problem Solving, Communication, Teamwork, Adaptability, Customer Handling, Continuous Learning",

        education:
            "Bachelor of Business Administration\nAmbalika Management and Technology Institute\n\n12th — UP Board PCB\nO Level",

        experience:
            "Retail Sales & Operations Executive\n4 Years Experience\n\nSales, customer handling, operations, reporting and practical problem solving.",

        projects:
            "Univichar AI — AI education application\nPower BI Dashboard — Business analytics\nSQL Analysis — Data querying and analysis\nDigital Web Experiments — Front-end development"

    };


    let resumeData =
        { ...defaultData };


    let currentTemplate = 1;


    /* -------------------------------------------------------
       OPEN
    ------------------------------------------------------- */

    openButton.addEventListener(
        "click",
        () => {

            modal.classList.add("open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "modal-open"
            );

            syncPreview();

        }
    );


    /* -------------------------------------------------------
       CLOSE
    ------------------------------------------------------- */

    const closeEditor = () => {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    };


    closeButton?.addEventListener(
        "click",
        closeEditor
    );


    $(".resume-modal-backdrop")
        ?.addEventListener(
            "click",
            closeEditor
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {
                closeEditor();
            }

        }
    );


    /* -------------------------------------------------------
       FORM FIELDS
    ------------------------------------------------------- */

    const fields =
        $$("[data-resume-field]");


    fields.forEach(field => {

        const key =
            field.dataset.resumeField;


        field.addEventListener(
            "input",
            () => {

                resumeData[key] =
                    field.value;

                updatePreviewField(
                    key,
                    field.value
                );

            }
        );

    });


    /* -------------------------------------------------------
       UPDATE PREVIEW
    ------------------------------------------------------- */

    function updatePreviewField(
        key,
        value
    ) {

        $$(
            `[data-preview="${key}"]`,
            paper
        ).forEach(
            element => {

                element.textContent =
                    value;

            }
        );

    }


    function syncPreview() {

        Object.entries(
            resumeData
        ).forEach(
            ([key, value]) => {

                updatePreviewField(
                    key,
                    value
                );

            }
        );


        applyTemplate(
            currentTemplate,
            false
        );

    }


    /* -------------------------------------------------------
       TEMPLATES
    ------------------------------------------------------- */

    templateCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const template =
                    Number(
                        card.dataset.template
                    );

                currentTemplate =
                    template;

                templateCards.forEach(
                    item => {

                        item.classList.toggle(
                            "selected",
                            item === card
                        );

                    }
                );


                applyTemplate(
                    template,
                    true
                );

            }
        );

    });


    function applyTemplate(
        template,
        showMessage = true
    ) {

        paper.classList.remove(
            "template-1",
            "template-2",
            "template-3",
            "template-4"
        );

        paper.classList.add(
            `template-${template}`
        );


        if (templateLabel) {

            templateLabel.textContent =
                `TEMPLATE ${String(template).padStart(2, "0")}`;

        }


        /*
         * Template 1 + 3 support photo.
         * Template 2 + 4 intentionally hide it
         * through CSS.
         */

        if (
            template === 1 ||
            template === 3
        ) {

            photoBox.style.display =
                "block";

        } else {

            photoBox.style.display =
                "none";

        }


        if (showMessage) {

            const labels = {
                1: "Original Professional template selected",
                2: "Professional No Photo template selected",
                3: "Technical Profile template selected",
                4: "Technical No Photo template selected"
            };

            showToast(
                labels[template]
            );

        }

    }


    /* -------------------------------------------------------
       PHOTO UPLOAD
    ------------------------------------------------------- */

    photoInput?.addEventListener(
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
                    "Please choose an image file"
                );

                return;
            }


            const reader =
                new FileReader();


            reader.onload =
                loadEvent => {

                    photo.src =
                        loadEvent.target.result;

                    photoBox.dataset.customPhoto =
                        "true";


                    showToast(
                        "Resume photo updated"
                    );

                };


            reader.readAsDataURL(file);

        }
    );


    /* -------------------------------------------------------
       REMOVE PHOTO
    ------------------------------------------------------- */

    removePhoto?.addEventListener(
        "click",
        () => {

            photo.src =
                "assets/profile.jpg";

            photoBox.dataset.customPhoto =
                "false";

            photoInput.value =
                "";

            showToast(
                "Resume photo restored"
            );

        }
    );


    /* -------------------------------------------------------
       PRINT
    ------------------------------------------------------- */

    printButton?.addEventListener(
        "click",
        () => {

            syncPreview();

            setTimeout(
                () => {

                    window.print();

                },
                120
            );

        }
    );


    /* -------------------------------------------------------
       RESET
    ------------------------------------------------------- */

    resetButton?.addEventListener(
        "click",
        () => {

            resumeData =
                { ...defaultData };


            fields.forEach(field => {

                const key =
                    field.dataset.resumeField;

                field.value =
                    resumeData[key];

            });


            currentTemplate = 1;


            templateCards.forEach(
                (card, index) => {

                    card.classList.toggle(
                        "selected",
                        index === 0
                    );

                }
            );


            photo.src =
                "assets/profile.jpg";

            photoInput.value =
                "";

            syncPreview();


            showToast(
                "Resume restored to default"
            );

        }
    );


    /* -------------------------------------------------------
       DOWNLOAD ORIGINAL PDF
    ------------------------------------------------------- */

    const downloadButton =
        $(".resume-download");

    downloadButton?.addEventListener(
        "click",
        () => {

            showToast(
                "Downloading resume.pdf"
            );

        }
    );

}


/* =========================================================
   TOAST SYSTEM
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
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* =========================================================
   SMOOTH ANCHOR HANDLING
========================================================= */

$$("a[href^='#']").forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                $(targetId);

            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   WINDOW LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   PRINT CLEANUP
========================================================= */

window.addEventListener(
    "afterprint",
    () => {

        const modal =
            $("#resumeModal");

        if (
            modal &&
            modal.classList.contains("open")
        ) {

            showToast(
                "A4 print dialog completed"
            );

        }

    }
);