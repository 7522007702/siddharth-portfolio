/* =========================================================
   SIDDHARTH.DEV
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


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = $("#pageLoader");

    setTimeout(() => {

        loader.classList.add("loaded");

    }, 900);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

$("#currentYear").textContent =
    new Date().getFullYear();


/* =========================================================
   HEADER SCROLL
========================================================= */

const header = $("#siteHeader");

const handleHeader = () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

};

window.addEventListener(
    "scroll",
    handleHeader,
    { passive: true }
);

handleHeader();


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress = $("#scrollProgress");

const updateProgress = () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width =
        `${percentage}%`;

};

window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
);

updateProgress();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileButton =
    $("#mobileMenuButton");

const mobileNav =
    $("#mobileNav");


mobileButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle("open");

    }
);


$$(".mobile-nav a").forEach(link => {

    link.addEventListener("click", () => {

        mobileNav.classList.remove("open");

    });

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("main section[id]");

const navLinks =
    $$(".nav-link");


const updateActiveNav = () => {

    const position =
        window.scrollY + 150;

    let current = "home";

    sections.forEach(section => {

        if (
            position >= section.offsetTop &&
            position <
                section.offsetTop +
                section.offsetHeight
        ) {

            current = section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );

    });

};

window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

updateActiveNav();


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


$$(".reveal").forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   TYPING EFFECT
========================================================= */

const typingElement =
    $("#typingText");

const typingWords = [
    "digital experiences.",
    "responsive websites.",
    "data dashboards.",
    "useful applications.",
    "creative solutions.",
    "better interfaces."
];


let typingWordIndex = 0;
let typingCharIndex = 0;
let deleting = false;


function typeLoop() {

    const word =
        typingWords[typingWordIndex];

    if (!deleting) {

        typingElement.textContent =
            word.substring(
                0,
                typingCharIndex + 1
            );

        typingCharIndex++;

        if (
            typingCharIndex === word.length
        ) {

            deleting = true;

            setTimeout(
                typeLoop,
                1600
            );

            return;
        }

    } else {

        typingElement.textContent =
            word.substring(
                0,
                typingCharIndex - 1
            );

        typingCharIndex--;

        if (typingCharIndex === 0) {

            deleting = false;

            typingWordIndex =
                (typingWordIndex + 1) %
                typingWords.length;

        }

    }

    setTimeout(
        typeLoop,
        deleting ? 45 : 80
    );
}


typeLoop();


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    $$(".counter");


const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(
                        counter.dataset.target
                    );

                let current = 0;

                const increment =
                    Math.max(
                        1,
                        Math.ceil(target / 40)
                    );


                const run = () => {

                    current += increment;

                    if (current >= target) {

                        counter.textContent =
                            target;

                        return;

                    }

                    counter.textContent =
                        current;

                    requestAnimationFrame(run);

                };


                run();

                counterObserver.unobserve(
                    counter
                );

            });

        },
        {
            threshold: .8
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================================================
   SKILL FILTER
========================================================= */

const skillButtons =
    $$(".skill-filter");

const skillCards =
    $$(".skill-card");


skillButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            skillButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            skillCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.category === filter
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
   PROJECT FILTER
========================================================= */

const projectButtons =
    $$(".project-filter-btn");

const projectCards =
    $$(".project-card");


projectButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            projectButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;


            projectCards.forEach(card => {

                if (
                    filter === "all" ||
                    card.dataset.category === filter
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
   THEME
========================================================= */

const themeButton =
    $("#themeButton");


const savedTheme =
    localStorage.getItem(
        "siddharth-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light-theme"
    );

    themeButton.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


function toggleTheme() {

    const light =
        document.body.classList.toggle(
            "light-theme"
        );


    localStorage.setItem(
        "siddharth-theme",
        light ? "light" : "dark"
    );


    themeButton.innerHTML =
        light
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

}


themeButton.addEventListener(
    "click",
    toggleTheme
);


/* =========================================================
   COMMAND PALETTE
========================================================= */

const commandOverlay =
    $("#commandOverlay");

const commandButton =
    $("#commandButton");

const closeCommand =
    $("#closeCommand");

const commandSearch =
    $("#commandSearch");

const commandItems =
    $$(".command-item");


function openCommand() {

    commandOverlay.classList.add("open");

    document.body.classList.add(
        "modal-open"
    );

    setTimeout(() => {

        commandSearch.focus();

    }, 100);

}


function closeCommandPalette() {

    commandOverlay.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


commandButton.addEventListener(
    "click",
    openCommand
);


closeCommand.addEventListener(
    "click",
    closeCommandPalette
);


commandOverlay.addEventListener(
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


/* command filtering */

commandSearch.addEventListener(
    "input",
    () => {

        const query =
            commandSearch.value
                .toLowerCase()
                .trim();


        commandItems.forEach(item => {

            const text =
                item.textContent
                    .toLowerCase();

            item.style.display =
                text.includes(query)
                    ? "flex"
                    : "none";

        });

    }
);


/* command execution */

commandItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const command =
                item.dataset.command;


            if (command === "theme") {

                toggleTheme();

            } else {

                const target =
                    document.getElementById(
                        command
                    );

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }


            closeCommandPalette();

        }
    );

});


/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openCommand();

        }


        if (
            event.key === "Escape"
        ) {

            closeCommandPalette();

            closeCertificateModal();

        }

    }
);


/* =========================================================
   COPY CODE
========================================================= */

const copyCodeButton =
    $("#copyCode");


copyCodeButton.addEventListener(
    "click",
    async () => {

        const code =
            $("#philosophyCode").innerText;


        try {

            await navigator.clipboard.writeText(
                code
            );

            showToast(
                "Code copied to clipboard."
            );

        } catch {

            showToast(
                "Copy is not available in this browser."
            );

        }

    }
);


/* =========================================================
   CERTIFICATE SYSTEM
========================================================= */

const certificateInput =
    $("#certificateInput");

const certificatesGrid =
    $("#certificatesGrid");

const clearCertificates =
    $("#clearCertificates");

const certificateModal =
    $("#certificateModal");

const certificateModalImage =
    $("#certificateModalImage");

const closeCertificateModalButton =
    $("#closeCertificateModal");


let certificates = [];


function loadCertificates() {

    try {

        certificates =
            JSON.parse(
                localStorage.getItem(
                    "siddharth-certificates"
                )
            ) || [];

    } catch {

        certificates = [];

    }


    renderCertificates();

}


function saveCertificates() {

    localStorage.setItem(
        "siddharth-certificates",
        JSON.stringify(certificates)
    );

}


function renderCertificates() {

    certificatesGrid.innerHTML = "";


    if (!certificates.length) {

        certificatesGrid.innerHTML = `

            <article class="certificate-card">

                <div class="certificate-image-placeholder">

                    <i class="fa-solid fa-certificate"></i>

                    <span>Your Certificate</span>

                </div>

                <div class="certificate-content">

                    <span class="certificate-type">
                        CERTIFICATE
                    </span>

                    <h3>Add Your Achievement</h3>

                    <p>
                        Upload certificate images using
                        the Add Certificate button.
                    </p>

                </div>

            </article>

        `;

        return;

    }


    certificates.forEach(
        (certificate, index) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "certificate-card revealed";


            card.innerHTML = `

                <img
                    src="${certificate.image}"
                    alt="${escapeHtml(certificate.name)}"
                    class="certificate-image"
                    data-certificate="${index}"
                >

                <div class="certificate-content">

                    <span class="certificate-type">
                        CERTIFICATE
                    </span>

                    <h3>
                        ${escapeHtml(certificate.name)}
                    </h3>

                    <p>
                        Added to portfolio.
                    </p>

                </div>

            `;


            certificatesGrid.appendChild(card);

        }
    );


    $$(".certificate-image").forEach(
        image => {

            image.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            image.dataset.certificate
                        );

                    openCertificateModal(
                        certificates[index].image
                    );

                }
            );

        }
    );

}


certificateInput.addEventListener(
    "change",
    event => {

        const files =
            [...event.target.files];


        files.forEach(file => {

            if (!file.type.startsWith("image/")) {
                return;
            }


            const reader =
                new FileReader();


            reader.onload = () => {

                certificates.push({

                    name:
                        file.name
                            .replace(
                                /\.[^/.]+$/,
                                ""
                            ),

                    image:
                        reader.result

                });


                try {

                    saveCertificates();

                    renderCertificates();

                    showToast(
                        "Certificate added."
                    );

                } catch {

                    showToast(
                        "Image is too large for browser storage."
                    );

                }

            };


            reader.readAsDataURL(file);

        });


        certificateInput.value = "";

    }
);


clearCertificates.addEventListener(
    "click",
    () => {

        if (!certificates.length) {

            showToast(
                "No added certificates."
            );

            return;

        }


        if (
            confirm(
                "Remove all added certificates?"
            )
        ) {

            certificates = [];

            saveCertificates();

            renderCertificates();

            showToast(
                "Certificates cleared."
            );

        }

    }
);


function openCertificateModal(src) {

    certificateModalImage.src = src;

    certificateModal.classList.add(
        "open"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeCertificateModal() {

    certificateModal.classList.remove(
        "open"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


closeCertificateModalButton.addEventListener(
    "click",
    closeCertificateModal
);


certificateModal.addEventListener(
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


loadCertificates();


/* =========================================================
   RESUME BUILDER
========================================================= */

const resumeForm =
    $("#resumeForm");

const updateResumeButton =
    $("#updateResume");

const downloadResumeButton =
    $("#downloadResume");

const resumePaper =
    $("#resumePaper");


const resumeFields = {

    name: $("#resumeName"),
    email: $("#resumeEmail"),
    phone: $("#resumePhone"),
    location: $("#resumeLocation"),
    role: $("#resumeRole"),
    summary: $("#resumeSummary"),
    skills: $("#resumeSkills"),
    education: $("#resumeEducation"),
    experience: $("#resumeExperience"),
    certificates: $("#resumeCertificates")

};


const previewFields = {

    name: $("#previewName"),
    email: $("#previewEmail"),
    phone: $("#previewPhone"),
    location: $("#previewLocation"),
    role: $("#previewRole"),
    summary: $("#previewSummary"),
    education: $("#previewEducation"),
    experience: $("#previewExperience"),
    certificates: $("#previewCertificates"),
    skills: $("#previewSkills")

};


function updateResumePreview() {

    previewFields.name.textContent =
        resumeFields.name.value ||
        "Your Name";


    previewFields.email.textContent =
        resumeFields.email.value ||
        "your@email.com";


    previewFields.phone.textContent =
        resumeFields.phone.value ||
        "+91 XXXXX XXXXX";


    previewFields.location.textContent =
        resumeFields.location.value ||
        "India";


    previewFields.role.textContent =
        resumeFields.role.value ||
        "Developer";


    previewFields.summary.textContent =
        resumeFields.summary.value ||
        "Professional summary";


    previewFields.education.textContent =
        resumeFields.education.value ||
        "Add your education details.";


    previewFields.experience.textContent =
        resumeFields.experience.value ||
        "Add your experience and projects.";


    previewFields.certificates.textContent =
        resumeFields.certificates.value ||
        "Add certificates.";


    previewFields.skills.innerHTML = "";


    const skills =
        resumeFields.skills.value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);


    skills.forEach(skill => {

        const span =
            document.createElement("span");

        span.textContent = skill;

        previewFields.skills.appendChild(
            span
        );

    });


    saveResumeData();

    showToast(
        "Resume preview updated."
    );

}


updateResumeButton.addEventListener(
    "click",
    updateResumePreview
);


/* auto-update */

Object.values(resumeFields).forEach(
    field => {

        field.addEventListener(
            "input",
            () => {

                updateResumePreviewSilently();

            }
        );

    }
);


function updateResumePreviewSilently() {

    previewFields.name.textContent =
        resumeFields.name.value ||
        "Your Name";

    previewFields.email.textContent =
        resumeFields.email.value ||
        "your@email.com";

    previewFields.phone.textContent =
        resumeFields.phone.value ||
        "+91 XXXXX XXXXX";

    previewFields.location.textContent =
        resumeFields.location.value ||
        "India";

    previewFields.role.textContent =
        resumeFields.role.value ||
        "Developer";

    previewFields.summary.textContent =
        resumeFields.summary.value ||
        "Professional summary";

    previewFields.education.textContent =
        resumeFields.education.value ||
        "Add your education details.";

    previewFields.experience.textContent =
        resumeFields.experience.value ||
        "Add your experience and projects.";

    previewFields.certificates.textContent =
        resumeFields.certificates.value ||
        "Add certificates.";


    previewFields.skills.innerHTML = "";


    resumeFields.skills.value
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean)
        .forEach(skill => {

            const span =
                document.createElement("span");

            span.textContent = skill;

            previewFields.skills.appendChild(
                span
            );

        });

}


/* =========================================================
   RESUME LOCAL STORAGE
========================================================= */

function saveResumeData() {

    const data = {};

    Object.entries(resumeFields)
        .forEach(([key, element]) => {

            data[key] = element.value;

        });


    localStorage.setItem(
        "siddharth-resume-data",
        JSON.stringify(data)
    );

}


function loadResumeData() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "siddharth-resume-data"
                )
            );


        if (!data) {

            updateResumePreviewSilently();

            return;

        }


        Object.entries(data)
            .forEach(([key, value]) => {

                if (resumeFields[key]) {

                    resumeFields[key].value =
                        value;

                }

            });


    } catch {

        /* Ignore invalid local data */

    }


    updateResumePreviewSilently();

}


loadResumeData();


/* =========================================================
   RESUME TEMPLATES
========================================================= */

const templateButtons =
    $$(".template-btn");


templateButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            templateButtons.forEach(
                btn =>
                    btn.classList.remove(
                        "active"
                    )
            );

            button.classList.add(
                "active"
            );


            resumePaper.className =
                "resume-paper";


            const template =
                button.dataset.template;


            resumePaper.classList.add(
                `template-${template}`
            );

            saveResumeTemplate(
                template
            );

        }
    );

});


function saveResumeTemplate(template) {

    localStorage.setItem(
        "siddharth-resume-template",
        template
    );

}


function loadResumeTemplate() {

    const template =
        localStorage.getItem(
            "siddharth-resume-template"
        );


    if (!template) {
        return;
    }


    resumePaper.className =
        "resume-paper";

    resumePaper.classList.add(
        `template-${template}`
    );


    templateButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.template ===
                template
        );

    });

}


loadResumeTemplate();


/* =========================================================
   PRINT / SAVE PDF
========================================================= */

downloadResumeButton.addEventListener(
    "click",
    () => {

        updateResumePreviewSilently();

        setTimeout(() => {

            window.print();

        }, 100);

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    $("#contactForm");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            $("#contactName").value.trim();

        const email =
            $("#contactEmail").value.trim();

        const subject =
            $("#contactSubject").value.trim() ||
            "Portfolio Contact";

        const message =
            $("#contactMessage").value.trim();


        if (!name || !email || !message) {

            showToast(
                "Please complete the required fields."
            );

            return;

        }


        const body =
            `Hello Siddharth,

Name: ${name}
Email: ${email}

Message:
${message}`;


        const mailto =
            `mailto:your.email@example.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(body)}`;


        window.location.href =
            mailto;


        showToast(
            "Opening your email client..."
        );

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

const backToTop =
    $("#backToTop");


window.addEventListener(
    "scroll",
    () => {

        backToTop.classList.toggle(
            "visible",
            window.scrollY > 600
        );

    },
    { passive: true }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    const toast =
        $("#toast");

    const toastMessage =
        $("#toastMessage");


    toastMessage.textContent =
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

        }, 2800);

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value;

    return div.innerHTML;

}


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

$$(".btn, .header-cta").forEach(
    button => {

        button.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
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
                    `translate(${x * .08}px, ${y * .08}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    }
);


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursorDot =
    $(".cursor-dot");

const cursorRing =
    $(".cursor-ring");


if (
    cursorDot &&
    cursorRing &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorDot.style.left =
                `${event.clientX}px`;

            cursorDot.style.top =
                `${event.clientY}px`;

            cursorRing.style.left =
                `${event.clientX}px`;

            cursorRing.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   CURSOR CSS INJECTION
========================================================= */

const cursorStyle =
    document.createElement("style");


cursorStyle.textContent = `

@media (pointer:fine) {

    body {
        cursor: default;
    }

    .cursor-dot {
        position: fixed;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--accent);
        pointer-events: none;
        z-index: 10001;
        transform: translate(-50%,-50%);
    }

    .cursor-ring {
        position: fixed;
        width: 28px;
        height: 28px;
        border: 1px solid rgba(100,255,218,.35);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%,-50%);
        transition:
            width .2s ease,
            height .2s ease;
    }

    a:hover ~ .cursor-ring,
    button:hover ~ .cursor-ring {
        width: 40px;
        height: 40px;
    }

}

`;


document.head.appendChild(
    cursorStyle
);


/* =========================================================
   IMAGE TILT EFFECT
========================================================= */

$$(".project-card, .service-card, .skill-card").forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - .5) * -3;


                const rotateY =
                    ((x / rect.width) - .5) * 3;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

updateResumePreviewSilently();

console.log(
    "%cSIDDHARTH.DEV",
    "color:#64ffda;font-size:24px;font-weight:bold"
);

console.log(
    "%cBuilt with HTML • CSS • JavaScript",
    "color:#8fa0b7;font-size:12px"
);