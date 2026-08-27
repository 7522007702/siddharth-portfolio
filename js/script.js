/* =========================================================
   SIDDHARTH MISHRA PORTFOLIO
   MASTER JAVASCRIPT SYSTEM
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

    typingWords: [
        "Developer",
        "Digital Builder",
        "Problem Solver",
        "Continuous Learner",
        "Technology Explorer"
    ],

    typingIndex: 0,
    typingCharacter: 0,
    typingDeleting: false,

    selectedResumeTemplate: 1,

    uploadedCertificates: [],

    resumePhoto:
        localStorage.getItem("siddharthResumePhoto") ||
        "assets/profile.jpg"

};


/* =========================================================
   PAGE LOADER
========================================================= */

(function initLoader() {

    const loader = $("#pageLoader");
    const progress = $("#loaderProgress");
    const text = $("#loaderText");

    if (!loader) return;

    const messages = [
        "initializing portfolio...",
        "loading developer profile...",
        "mounting interface...",
        "starting city engine...",
        "loading interactive systems...",
        "portfolio ready."
    ];

    let value = 0;
    let messageIndex = 0;

    const timer = setInterval(() => {

        value += Math.floor(Math.random() * 14) + 7;

        if (value > 100) {
            value = 100;
        }

        if (progress) {
            progress.style.width = `${value}%`;
        }

        if (
            messageIndex < messages.length &&
            value >=
                (messageIndex + 1) *
                (100 / messages.length)
        ) {
            if (text) {
                text.textContent = messages[messageIndex];
            }

            messageIndex++;
        }

        if (value >= 100) {

            clearInterval(timer);

            setTimeout(() => {
                loader.classList.add("hidden");
            }, 450);
        }

    }, 160);

})();


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear = $("#currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton = $("#mobileMenuButton");
const mainNav = $("#mainNav");

if (mobileMenuButton && mainNav) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            const open =
                mainNav.classList.toggle("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                String(open)
            );

        }
    );

    $$(".nav-link").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}


/* =========================================================
   HEADER + SCROLL PROGRESS
========================================================= */

const header = $("#siteHeader");
const scrollProgress = $("#scrollProgress");
const backTop = $("#backTop");

function handleScroll() {

    const scrollTop =
        window.scrollY;

    if (header) {
        header.classList.toggle(
            "scrolled",
            scrollTop > 20
        );
    }

    if (backTop) {
        backTop.classList.toggle(
            "show",
            scrollTop > 500
        );
    }

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    if (scrollProgress) {
        scrollProgress.style.width =
            `${percentage}%`;
    }

}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();

if (backTop) {

    backTop.addEventListener(
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
   CUSTOM CURSOR
========================================================= */

const cursorDot = $("#cursorDot");
const cursorRing = $("#cursorRing");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

const cursorEnabled =
    window.matchMedia("(pointer:fine)").matches;

if (cursorEnabled) {

    document.addEventListener(
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

        }
    );

    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.13;

        ringY +=
            (mouseY - ringY) * 0.13;

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

    const interactiveSelectors =
        "a, button, input, textarea, .skill-card, .project-card, .contact-link";

    document.addEventListener(
        "mouseover",
        event => {

            if (
                event.target.closest(
                    interactiveSelectors
                )
            ) {
                document.body.classList.add(
                    "cursor-hover"
                );
            }

        }
    );

    document.addEventListener(
        "mouseout",
        event => {

            if (
                event.target.closest(
                    interactiveSelectors
                )
            ) {
                document.body.classList.remove(
                    "cursor-hover"
                );
            }

        }
    );

} else {

    if (cursorDot) {
        cursorDot.style.display = "none";
    }

    if (cursorRing) {
        cursorRing.style.display = "none";
    }

}


/* =========================================================
   TYPING ENGINE
========================================================= */

const typingText = $("#typingText");

function typingLoop() {

    if (!typingText) return;

    const words =
        state.typingWords;

    const current =
        words[state.typingIndex];

    if (!state.typingDeleting) {

        state.typingCharacter++;

        typingText.textContent =
            current.substring(
                0,
                state.typingCharacter
            );

        if (
            state.typingCharacter >=
            current.length
        ) {

            state.typingDeleting = true;

            setTimeout(
                typingLoop,
                1200
            );

            return;
        }

    } else {

        state.typingCharacter--;

        typingText.textContent =
            current.substring(
                0,
                state.typingCharacter
            );

        if (
            state.typingCharacter <= 0
        ) {

            state.typingDeleting = false;

            state.typingIndex =
                (state.typingIndex + 1) %
                words.length;

        }

    }

    setTimeout(
        typingLoop,
        state.typingDeleting
            ? 45
            : 85
    );

}

typingLoop();


/* =========================================================
   RAIN GENERATOR
========================================================= */

(function createRain() {

    const rain = $("#rain");

    if (!rain) return;

    const amount =
        window.innerWidth < 600
            ? 55
            : 120;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {

        const drop =
            document.createElement("span");

        drop.className =
            "raindrop";

        drop.style.left =
            `${Math.random() * 100}%`;

        drop.style.height =
            `${35 + Math.random() * 80}px`;

        drop.style.opacity =
            `${0.15 + Math.random() * 0.55}`;

        drop.style.animationDuration =
            `${0.65 + Math.random() * 1.15}s`;

        drop.style.animationDelay =
            `${Math.random() * -3}s`;

        fragment.appendChild(drop);

    }

    rain.appendChild(fragment);

})();


/* =========================================================
   CITY PARALLAX
========================================================= */

(function cityParallax() {

    const city =
        $("#cityBackground");

    if (!city) return;

    const finePointer =
        window.matchMedia(
            "(pointer:fine)"
        ).matches;

    if (!finePointer) return;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener(
        "mousemove",
        event => {

            targetX =
                (event.clientX /
                    window.innerWidth -
                    .5) * 10;

            targetY =
                (event.clientY /
                    window.innerHeight -
                    .5) * 7;

        }
    );

    function animate() {

        currentX +=
            (targetX - currentX) * .025;

        currentY +=
            (targetY - currentY) * .025;

        city.style.transform =
            `scale(1.025)
             translate3d(${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(
            animate
        );

    }

    animate();

})();


/* =========================================================
   REVEAL ON SCROLL
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

    revealObserver.observe(
        element
    );

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("main section[id]");

const navLinks =
    $$(".nav-link");

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    navLinks.forEach(
                        link =>
                            link.classList.remove(
                                "active"
                            )
                    );

                    const active =
                        $(
                            `.nav-link[href="#${entry.target.id}"]`
                        );

                    if (active) {
                        active.classList.add(
                            "active"
                        );
                    }

                }

            });

        },
        {
            rootMargin:
                "-30% 0px -55% 0px"
        }
    );

sections.forEach(section => {

    sectionObserver.observe(
        section
    );

});


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(element) {

    const target =
        Number(
            element.dataset.target
        );

    const duration =
        1200;

    const start =
        performance.now();

    function update(time) {

        const progress =
            Math.min(
                (time - start) /
                duration,
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

        if (progress < 1) {
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

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    animateCounter(
                        entry.target
                    );

                    counterObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .6
        }
    );

$$(".counter").forEach(
    counter =>
        counterObserver.observe(
            counter
        )
);


/* =========================================================
   SKILL BARS
========================================================= */

const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    $$(".skill-bar span", entry.target)
                        .forEach(bar => {

                            setTimeout(
                                () => {

                                    bar.style.width =
                                        bar.dataset.width;

                                },
                                150
                            );

                        });

                    skillObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .25
        }
    );

$$(".skill-card").forEach(
    card =>
        skillObserver.observe(
            card
        )
);


/* =========================================================
   PROJECT FILTERS
========================================================= */

const projectFilters =
    $$(".project-filter");

const projectCards =
    $$(".project-card");

projectFilters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            projectFilters.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            filter.classList.add(
                "active"
            );

            const selected =
                filter.dataset.filter;

            projectCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    selected === "all" ||
                    category === selected
                ) {
                    card.classList.remove(
                        "hidden"
                    );
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
   PROJECT MODAL
========================================================= */

const projectModal =
    $("#projectModal");

const modalTitle =
    $("#modalTitle");

const modalLabel =
    $("#modalLabel");

const modalDescription =
    $("#modalDescription");

const modalStack =
    $("#modalStack");

const modalCode =
    $("#modalCode");

const projectData = {

    univichar: {

        label:
            "01 / DEVELOPMENT",

        title:
            "Univichar AI",

        description:
            "An education-focused AI teacher concept built around conversational learning, AI-assisted explanations, notes, quizzes, courses, voice interaction and a structured learning experience.",

        stack: [
            "Flutter",
            "Dart",
            "Gemini",
            "Firebase",
            "Firestore",
            "TTS",
            "Speech Recognition"
        ],

        code:
`class UnivicharAI {
  final String purpose = "education";

  void learn() {
    chat();
    explain();
    quiz();
    createNotes();
    speak();
  }
}`
    },

    powerbi: {

        label:
            "02 / ANALYTICS",

        title:
            "Power BI Dashboard",

        description:
            "A business-oriented dashboard concept designed to convert operational data into visual insights, helping users understand trends, performance and decision-making metrics.",

        stack: [
            "Power BI",
            "Data Analysis",
            "Excel",
            "Business Intelligence"
        ],

        code:
`const dashboard = {
  source: "business_data",
  process: [
    "clean",
    "model",
    "visualize",
    "analyze"
  ],
  output: "actionable_insights"
};`
    },

    sql: {

        label:
            "03 / DATA",

        title:
            "SQL Analysis",

        description:
            "A practical SQL analysis project focused on extracting useful information from structured data using filtering, joins, grouping, aggregation and business-oriented queries.",

        stack: [
            "SQL",
            "Queries",
            "Joins",
            "Aggregation",
            "Data Analysis"
        ],

        code:
`SELECT
    category,
    COUNT(*) AS records,
    SUM(value) AS total_value
FROM dataset
GROUP BY category
ORDER BY total_value DESC;`
    },

    portfolio: {

        label:
            "04 / DEVELOPMENT",

        title:
            "Digital Portfolio System",

        description:
            "A complete responsive developer portfolio with a generated cyberpunk city environment, interactive UI, project system, certificate upload, animated skills and an editable A4 resume studio.",

        stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Design",
            "A4 Resume Engine"
        ],

        code:
`const portfolio = {
  background: "generated_city",
  interface: "interactive",
  resume: "editable_a4",
  responsive: true,
  systems: [
    "projects",
    "skills",
    "certificates",
    "contact"
  ]
};`
    }

};


function openProjectModal(key) {

    const project =
        projectData[key];

    if (!project || !projectModal) {
        return;
    }

    modalLabel.textContent =
        project.label;

    modalTitle.textContent =
        project.title;

    modalDescription.textContent =
        project.description;

    modalStack.innerHTML = "";

    project.stack.forEach(
        item => {

            const tag =
                document.createElement(
                    "span"
                );

            tag.textContent =
                item;

            modalStack.appendChild(
                tag
            );

        }
    );

    modalCode.textContent =
        project.code;

    projectModal.classList.add(
        "open"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}

function closeProjectModal() {

    if (!projectModal) return;

    projectModal.classList.remove(
        "open"
    );

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}

$$(".project-open").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                openProjectModal(
                    button.dataset.project
                );

            }
        );

    }
);

$$("[data-close-modal]").forEach(
    element => {

        element.addEventListener(
            "click",
            closeProjectModal
        );

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeProjectModal();

            if (
                $("#resumeEditor")
                    ?.classList.contains(
                        "open"
                    )
            ) {
                closeResumeEditor();
            }

        }

    }
);


/* =========================================================
   CERTIFICATE SYSTEM
========================================================= */

const certificateInput =
    $("#certificateInput");

const certificateGrid =
    $("#certificateGrid");

const certificateEmpty =
    $("#certificateEmpty");

function renderCertificates() {

    if (!certificateGrid) {
        return;
    }

    $$(".certificate-item")
        .forEach(item => item.remove());

    if (
        state.uploadedCertificates.length === 0
    ) {

        if (certificateEmpty) {
            certificateEmpty.style.display =
                "grid";
        }

        return;
    }

    if (certificateEmpty) {
        certificateEmpty.style.display =
            "none";
    }

    state.uploadedCertificates.forEach(
        (certificate, index) => {

            const item =
                document.createElement(
                    "article"
                );

            item.className =
                "certificate-item";

            item.innerHTML = `
                <img
                    src="${certificate}"
                    alt="Uploaded certificate ${index + 1}"
                >

                <button
                    class="certificate-remove"
                    type="button"
                    data-index="${index}"
                    aria-label="Remove certificate"
                >
                    ×
                </button>
            `;

            certificateGrid.appendChild(
                item
            );

        }
    );

}

if (certificateInput) {

    certificateInput.addEventListener(
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

                reader.onload =
                    loadEvent => {

                        state.uploadedCertificates.push(
                            loadEvent.target.result
                        );

                        renderCertificates();

                    };

                reader.readAsDataURL(
                    file
                );

            });

            certificateInput.value = "";

        }
    );

}

if (certificateGrid) {

    certificateGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".certificate-remove"
                );

            if (!button) return;

            const index =
                Number(
                    button.dataset.index
                );

            state.uploadedCertificates.splice(
                index,
                1
            );

            renderCertificates();

        }
    );

}

renderCertificates();


/* =========================================================
   RESUME TEMPLATE SYSTEM
========================================================= */

const resumePaper =
    $("#resumePaper");

const templateButtons =
    $$(".template-select");

const editorTemplateButtons =
    $$(".editor-template");

function applyResumeTemplate(
    templateNumber
) {

    if (!resumePaper) return;

    state.selectedResumeTemplate =
        Number(templateNumber);

    resumePaper.classList.remove(
        "template-1",
        "template-2",
        "template-3",
        "template-4"
    );

    resumePaper.classList.add(
        `template-${templateNumber}`
    );

    templateButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.template ===
                String(templateNumber)
            );

        }
    );

    editorTemplateButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.editorTemplate ===
                String(templateNumber)
            );

        }
    );

}

templateButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                applyResumeTemplate(
                    button.dataset.template
                );

            }
        );

    }
);

editorTemplateButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                applyResumeTemplate(
                    button.dataset.editorTemplate
                );

            }
        );

    }
);

applyResumeTemplate(1);


/* =========================================================
   RESUME EDITOR
========================================================= */

const resumeEditor =
    $("#resumeEditor");

const printResumeButton =
    $("#printResume");

const closeResumeEditorButton =
    $("#closeResumeEditor");

const editorPrint =
    $("#editorPrint");

const editorDownloadPdf =
    $("#editorDownloadPdf");

function openResumeEditor() {

    if (!resumeEditor) return;

    resumeEditor.classList.add(
        "open"
    );

    resumeEditor.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

    document.body.dataset.resumeEditorOpen =
        "true";

}

function closeResumeEditor() {

    if (!resumeEditor) return;

    resumeEditor.classList.remove(
        "open"
    );

    resumeEditor.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

    document.body.dataset.resumeEditorOpen =
        "false";

}

if (printResumeButton) {

    printResumeButton.addEventListener(
        "click",
        () => {

            openResumeEditor();

        }
    );

}

if (closeResumeEditorButton) {

    closeResumeEditorButton.addEventListener(
        "click",
        closeResumeEditor
    );

}


/* =========================================================
   RESUME PHOTO UPLOAD
========================================================= */

const resumePhotoInput =
    $("#resumePhotoInput");

const resumePhoto =
    $("#resumePhoto");

if (resumePhoto) {
    resumePhoto.src =
        state.resumePhoto;
}

if (resumePhotoInput) {

    resumePhotoInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) return;

            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {
                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                loadEvent => {

                    const source =
                        loadEvent.target.result;

                    state.resumePhoto =
                        source;

                    localStorage.setItem(
                        "siddharthResumePhoto",
                        source
                    );

                    if (resumePhoto) {
                        resumePhoto.src =
                            source;
                    }

                    const miniPhoto =
                        $(".mini-photo img");

                    if (miniPhoto) {
                        miniPhoto.src =
                            source;
                    }

                };

            reader.readAsDataURL(
                file
            );

        }
    );

}


/* =========================================================
   RESUME EDITABLE STATE
========================================================= */

const editableResumeFields =
    $$(
        '#resumePaper [contenteditable="true"]'
    );

editableResumeFields.forEach(
    field => {

        field.addEventListener(
            "focus",
            () => {

                field.dataset.original =
                    field.innerHTML;

            }
        );

        field.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    if (
                        field.tagName !== "LI"
                    ) {

                        document.execCommand(
                            "insertLineBreak"
                        );

                    }

                }

            }
        );

    }
);


/* =========================================================
   DOWNLOAD ORIGINAL RESUME PDF
========================================================= */

const downloadResume =
    $("#downloadResume");

function downloadOriginalResume() {

    const anchor =
        document.createElement("a");

    anchor.href =
        "assets/resume.pdf";

    anchor.download =
        "Siddharth-Mishra-Resume.pdf";

    document.body.appendChild(
        anchor
    );

    anchor.click();

    anchor.remove();

}


/*
   Requirement:
   Download should download assets/resume.pdf
   and then open the same editable resume studio.
*/

if (downloadResume) {

    downloadResume.addEventListener(
        "click",
        () => {

            downloadOriginalResume();

            setTimeout(
                () => {

                    openResumeEditor();

                },
                450
            );

        }
    );

}


/* =========================================================
   PRINT A4
========================================================= */

function printA4Resume() {

    openResumeEditor();

    setTimeout(
        () => {

            window.print();

        },
        250
    );

}

if (editorPrint) {

    editorPrint.addEventListener(
        "click",
        printA4Resume
    );

}


/* =========================================================
   EDITOR DOWNLOAD
========================================================= */

/*
   Browsers do not provide a universal,
   pure-JavaScript direct PDF renderer
   without a PDF library.

   Therefore the reliable professional browser
   behavior is:

   EDIT -> PRINT -> Save as PDF.

   The button opens the browser's print dialog,
   where A4 + Save as PDF is available.
*/

if (editorDownloadPdf) {

    editorDownloadPdf.addEventListener(
        "click",
        () => {

            openResumeEditor();

            setTimeout(
                () => {

                    window.print();

                },
                250
            );

        }
    );

}


/* =========================================================
   CONTACT FORM-LIKE INTERACTION
========================================================= */

$$(".contact-link").forEach(
    link => {

        link.addEventListener(
            "mouseenter",
            () => {

                link.style.setProperty(
                    "--contact-glow",
                    "1"
                );

            }
        );

        link.addEventListener(
            "mouseleave",
            () => {

                link.style.setProperty(
                    "--contact-glow",
                    "0"
                );

            }
        );

    }
);


/* =========================================================
   HASH NAVIGATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        if (
            window.location.hash
        ) {

            setTimeout(
                () => {

                    const target =
                        document.querySelector(
                            window.location.hash
                        );

                    if (target) {

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                },
                100
            );

        }

    }
);


/* =========================================================
   RESUME EDITOR CLOSE WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            resumeEditor &&
            resumeEditor.classList.contains(
                "open"
            )
        ) {

            closeResumeEditor();

        }

    }
);


/* =========================================================
   MOBILE CITY OPTIMIZATION
========================================================= */

function optimizeCityForDevice() {

    const isSmall =
        window.innerWidth < 600;

    const rain =
        $("#rain");

    if (isSmall && rain) {

        const drops =
            $$(".raindrop", rain);

        drops.forEach(
            (drop, index) => {

                if (
                    index > 58
                ) {
                    drop.remove();
                }

            }
        );

    }

}

window.addEventListener(
    "resize",
    optimizeCityForDevice
);

optimizeCityForDevice();


/* =========================================================
   PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        const city =
            $("#cityBackground");

        if (!city) return;

        if (
            document.hidden
        ) {

            city.style.animationPlayState =
                "paused";

        } else {

            city.style.animationPlayState =
                "running";

        }

    }
);


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
`%c SIDDHARTH MISHRA
%c Developer • Builder • Learner
%c Portfolio system initialized.
`,
"color:#00eaff;font-size:20px;font-weight:bold;",
"color:#9b5cff;font-size:12px;",
"color:#47f6a0;font-size:11px;"
);


/* =========================================================
   FINAL SYSTEM STATUS
========================================================= */

window.SiddharthPortfolio = {

    version: "FINAL",

    technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Python",
        "SQL",
        "Power BI",
        "Git",
        "GitHub"
    ],

    resume: {

        templates: 4,

        currentTemplate:
            () =>
                state.selectedResumeTemplate,

        open:
            openResumeEditor,

        close:
            closeResumeEditor,

        print:
            printA4Resume

    },

    projects:
        Object.keys(projectData),

    status:
        "ONLINE"

};