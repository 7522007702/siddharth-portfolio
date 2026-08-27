/* =========================================================
   SIDDHARTH.DEV
   VVIP PORTFOLIO SYSTEM
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const random = (min, max) =>
    Math.random() * (max - min) + min;

const randomInt = (min, max) =>
    Math.floor(random(min, max + 1));


/* =========================================================
   YEAR
========================================================= */

const currentYear = $("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton = $("#mobileMenuButton");
const mainNavigation = $("#mainNavigation");

if (mobileMenuButton && mainNavigation) {

    mobileMenuButton.addEventListener("click", () => {

        const opened =
            mainNavigation.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(opened)
        );

    });

}


$$(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        mainNavigation?.classList.remove("open");

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

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

                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const active =
                    $(`.nav-link[href="#${entry.target.id}"]`);

                active?.classList.add("active");

            });

        },
        {
            threshold: 0.3
        }
    );

sections.forEach(section =>
    sectionObserver.observe(section)
);


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText = $("#typingText");

const typingWords = [
    "creating useful digital experiences",
    "solving practical problems",
    "learning new technologies",
    "building with code",
    "turning ideas into projects",
    "exploring data and technology"
];

let typingWordIndex = 0;
let typingCharIndex = 0;
let deleting = false;

function typeWriter() {

    if (!typingText) {
        return;
    }

    const word =
        typingWords[typingWordIndex];

    if (!deleting) {

        typingText.textContent =
            word.substring(
                0,
                typingCharIndex + 1
            );

        typingCharIndex++;

        if (typingCharIndex === word.length) {

            deleting = true;

            setTimeout(
                typeWriter,
                1500
            );

            return;
        }

    } else {

        typingText.textContent =
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
        typeWriter,
        deleting ? 38 : 65
    );
}

typeWriter();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

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

            });

        },
        {
            threshold: 0.12
        }
    );

$$(".reveal").forEach(element =>
    revealObserver.observe(element)
);


/* =========================================================
   CYBERPUNK CITY GENERATOR
========================================================= */

const farBuildings = $("#farBuildings");
const midBuildings = $("#midBuildings");
const nearBuildings = $("#nearBuildings");

function createBuilding(layer, minHeight, maxHeight) {

    if (!layer) {
        return;
    }

    const building =
        document.createElement("div");

    building.className =
        "city-building";

    building.style.height =
        `${randomInt(minHeight, maxHeight)}%`;

    const antenna =
        document.createElement("span");

    antenna.className =
        "building-antenna";

    if (Math.random() > 0.6) {
        building.appendChild(antenna);
    }

    layer.appendChild(building);
}


function generateBuildings() {

    const width =
        window.innerWidth;

    const count =
        Math.ceil(width / 60);

    farBuildings.innerHTML = "";
    midBuildings.innerHTML = "";
    nearBuildings.innerHTML = "";

    for (let i = 0; i < count; i++) {

        createBuilding(
            farBuildings,
            20,
            65
        );

        createBuilding(
            midBuildings,
            25,
            78
        );

        createBuilding(
            nearBuildings,
            30,
            88
        );

    }

}

generateBuildings();


let buildingResizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(buildingResizeTimer);

        buildingResizeTimer =
            setTimeout(
                generateBuildings,
                250
            );

    }
);


/* =========================================================
   NEON SIGNS
========================================================= */

const neonSigns = $("#neonSigns");

const signWords = [
    "CODE",
    "DATA",
    "AI",
    "DEV",
    "BUILD",
    "SQL",
    "WEB",
    "NEXUS",
    "DIGITAL",
    "SYSTEM",
    "TECH",
    "01",
    "1010",
    "∞"
];

function generateNeonSigns() {

    if (!neonSigns) {
        return;
    }

    neonSigns.innerHTML = "";

    const total =
        Math.max(
            7,
            Math.floor(window.innerWidth / 170)
        );

    for (let i = 0; i < total; i++) {

        const sign =
            document.createElement("div");

        sign.className =
            "neon-sign";

        const type =
            randomInt(0, 2);

        if (type === 1) {
            sign.classList.add("pink");
        }

        if (type === 2) {
            sign.classList.add("purple");
        }

        sign.textContent =
            signWords[
                randomInt(
                    0,
                    signWords.length - 1
                )
            ];

        sign.style.left =
            `${random(4, 96)}%`;

        sign.style.top =
            `${random(28, 67)}%`;

        sign.style.animationDelay =
            `${random(0, 4)}s`;

        neonSigns.appendChild(sign);

    }

}

generateNeonSigns();


/* =========================================================
   MOVING VEHICLES
========================================================= */

const movingVehicles =
    $("#movingVehicles");

function generateVehicles() {

    if (!movingVehicles) {
        return;
    }

    movingVehicles.innerHTML = "";

    for (let i = 0; i < 7; i++) {

        const vehicle =
            document.createElement("div");

        vehicle.className =
            "vehicle";

        if (i % 2 === 1) {
            vehicle.classList.add("reverse");
        }

        vehicle.style.left =
            `${random(-20, 90)}%`;

        vehicle.style.top =
            `${random(72, 91)}%`;

        vehicle.style.animationDuration =
            `${random(6, 13)}s`;

        vehicle.style.animationDelay =
            `${random(-12, 0)}s`;

        movingVehicles.appendChild(vehicle);

    }

}

generateVehicles();


/* =========================================================
   RAIN GENERATOR
========================================================= */

const rainLayer = $("#rainLayer");

function generateRain() {

    if (!rainLayer) {
        return;
    }

    rainLayer.innerHTML = "";

    const mobile =
        window.innerWidth < 700;

    const amount =
        mobile ? 95 : 180;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {

        const drop =
            document.createElement("span");

        drop.className =
            "rain-drop";

        drop.style.left =
            `${random(0, 100)}%`;

        drop.style.top =
            `${random(-20, 100)}%`;

        drop.style.height =
            `${random(35, 90)}px`;

        drop.style.opacity =
            random(0.12, 0.6);

        drop.style.animationDuration =
            `${random(0.45, 1.25)}s`;

        drop.style.animationDelay =
            `${random(-2, 0)}s`;

        fragment.appendChild(drop);

    }

    rainLayer.appendChild(fragment);

}

generateRain();


/* =========================================================
   CITY PARTICLES
========================================================= */

const particlesLayer =
    $("#particlesLayer");

function generateParticles() {

    if (!particlesLayer) {
        return;
    }

    particlesLayer.innerHTML = "";

    const amount =
        window.innerWidth < 700
            ? 25
            : 55;

    const fragment =
        document.createDocumentFragment();

    for (let i = 0; i < amount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "city-particle";

        particle.style.left =
            `${random(0, 100)}%`;

        particle.style.top =
            `${random(40, 100)}%`;

        particle.style.animationDuration =
            `${random(7, 18)}s`;

        particle.style.animationDelay =
            `${random(-15, 0)}s`;

        particle.style.opacity =
            random(0.1, 0.6);

        fragment.appendChild(particle);

    }

    particlesLayer.appendChild(fragment);

}

generateParticles();


/* =========================================================
   PARALLAX CITY
========================================================= */

const cityBackground =
    $("#city-background");

let parallaxX = 0;
let parallaxY = 0;

window.addEventListener(
    "pointermove",
    event => {

        const x =
            event.clientX /
            window.innerWidth;

        const y =
            event.clientY /
            window.innerHeight;

        parallaxX =
            (x - 0.5) * 2;

        parallaxY =
            (y - 0.5) * 2;

        if (cityBackground) {

            cityBackground.style.transform =
                `translate3d(
                    ${parallaxX * -5}px,
                    ${parallaxY * -3}px,
                    0
                )`;

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   RESUME DATA
========================================================= */

const resumeData = {

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

    about:
        "BBA student, problem solver and digital builder interested in programming, analytics, business and practical technology.",

    technicalSkills:
        "HTML5, CSS3, JavaScript, Python, SQL, Power BI, Git, GitHub",

    softSkills:
        "Problem Solving, Communication, Teamwork, Continuous Learning, Adaptability",

    experience:
        "4 Years — Retail Sales & Operations Executive",

    education:
        "BBA — Ambalika Management and Technology Institute",

    photo:
        "assets/profile.jpg"

};


/* =========================================================
   RESUME DOM
========================================================= */

const resumePreview =
    $("#resumePreview");

const resumeName =
    $("#resumeName");

const resumeTitle =
    $("#resumeTitle");

const resumeEmail =
    $("#resumeEmail");

const resumePhone =
    $("#resumePhone");

const resumeLocation =
    $("#resumeLocation");

const resumeAbout =
    $("#resumeAbout");

const resumeTechnicalSkills =
    $("#resumeTechnicalSkills");

const resumeSoftSkills =
    $("#resumeSoftSkills");

const resumeExperience =
    $("#resumeExperience");

const resumeEducation =
    $("#resumeEducation");

const resumePhoto =
    $("#resumePhoto");

const resumePreviewPhoto =
    $("#resumePreviewPhoto");


/* =========================================================
   UPDATE RESUME PREVIEW
========================================================= */

function updateResumePreview() {

    if (!resumePreview) {
        return;
    }

    const setText =
        (selector, value) => {

            const element =
                $(selector);

            if (element) {
                element.textContent =
                    value || "";
            }

        };

    setText(
        "[data-resume-name]",
        resumeName?.value
    );

    setText(
        "[data-resume-title]",
        resumeTitle?.value
    );

    setText(
        "[data-resume-email]",
        resumeEmail?.value || "Email"
    );

    setText(
        "[data-resume-phone]",
        resumePhone?.value || "Phone"
    );

    setText(
        "[data-resume-location]",
        resumeLocation?.value
    );

    setText(
        "[data-resume-about]",
        resumeAbout?.value
    );

    setText(
        "[data-resume-technical-skills]",
        resumeTechnicalSkills?.value
    );

    setText(
        "[data-resume-soft-skills]",
        resumeSoftSkills?.value
    );

    setText(
        "[data-resume-experience]",
        resumeExperience?.value
    );

    setText(
        "[data-resume-education]",
        resumeEducation?.value
    );

}


[
    resumeName,
    resumeTitle,
    resumeEmail,
    resumePhone,
    resumeLocation,
    resumeAbout,
    resumeTechnicalSkills,
    resumeSoftSkills,
    resumeExperience,
    resumeEducation
].forEach(input => {

    input?.addEventListener(
        "input",
        updateResumePreview
    );

});


updateResumePreview();


/* =========================================================
   RESUME PHOTO
========================================================= */

resumePhoto?.addEventListener(
    "change",
    event => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            showToast(
                "Please select an image file."
            );

            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            () => {

                resumePreviewPhoto.src =
                    reader.result;

                resumeData.photo =
                    reader.result;

            };

        reader.readAsDataURL(file);

    }
);


/* =========================================================
   RESUME TEMPLATES
========================================================= */

const templateOptions =
    $$(".template-option");

templateOptions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const template =
                button.dataset.template;

            templateOptions.forEach(
                item =>
                    item.classList.remove("active")
            );

            button.classList.add("active");

            resumePreview.className =
                `resume-paper template-${template}`;

            showToast(
                `Resume template ${template} selected.`
            );

        }
    );

});


/* =========================================================
   RESUME TOAST
========================================================= */

const resumeToast =
    $("#resumeToast");

let toastTimer;

function showToast(message) {

    if (!resumeToast) {
        return;
    }

    resumeToast.textContent =
        message;

    resumeToast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(
            () => {
                resumeToast.classList.remove("show");
            },
            2600
        );

}


/* =========================================================
   DOWNLOAD ORIGINAL PDF
========================================================= */

const downloadOriginalResume =
    $("#downloadOriginalResume");

downloadOriginalResume?.addEventListener(
    "click",
    () => {

        const link =
            document.createElement("a");

        link.href =
            "assets/resume.pdf";

        link.download =
            "Siddharth-Mishra-Resume.pdf";

        document.body.appendChild(link);

        link.click();

        link.remove();

        /*
         * Also open the original PDF after the download starts.
         * This gives the user the exact PDF available in assets.
         */

        setTimeout(
            () => {
                window.open(
                    "assets/resume.pdf",
                    "_blank",
                    "noopener,noreferrer"
                );
            },
            350
        );

        showToast(
            "Original resume PDF download started."
        );

    }
);


/* =========================================================
   OPEN ORIGINAL RESUME
========================================================= */

const printResumeButton =
    $("#printResumeButton");

printResumeButton?.addEventListener(
    "click",
    () => {

        const popup =
            window.open(
                "assets/resume.pdf",
                "_blank",
                "noopener,noreferrer"
            );

        if (!popup) {

            showToast(
                "Please allow pop-ups to open the resume."
            );

            return;
        }

        showToast(
            "Original resume opened. Edit/print it from the PDF viewer."
        );

    }
);


/* =========================================================
   BUILD EDITABLE RESUME HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function getCurrentTemplate() {

    const active =
        $(".template-option.active");

    return active?.dataset.template || "1";

}


function getResumeHTML() {

    const template =
        getCurrentTemplate();

    const name =
        escapeHTML(resumeName?.value);

    const title =
        escapeHTML(resumeTitle?.value);

    const email =
        escapeHTML(resumeEmail?.value || "Email");

    const phone =
        escapeHTML(resumePhone?.value || "Phone");

    const location =
        escapeHTML(resumeLocation?.value);

    const about =
        escapeHTML(resumeAbout?.value);

    const technical =
        escapeHTML(
            resumeTechnicalSkills?.value
        );

    const soft =
        escapeHTML(
            resumeSoftSkills?.value
        );

    const experience =
        escapeHTML(
            resumeExperience?.value
        );

    const education =
        escapeHTML(
            resumeEducation?.value
        );

    const photo =
        resumePreviewPhoto?.src ||
        "assets/profile.jpg";

    const photoAllowed =
        template !== "2" &&
        template !== "4";

    const photoHTML =
        photoAllowed
            ? `<img class="resume-photo" src="${photo}" alt="Resume Photo">`
            : "";

    const skillHeading =
        template === "1" || template === "2"
            ? "HARD SKILLS"
            : "TECHNICAL SKILLS";

    return `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>${name} — Resume</title>

<style>

@page {
    size: A4;
    margin: 0;
}

* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    background: #e9edf2;
}

body {
    font-family: Arial, Helvetica, sans-serif;
}

.resume {
    width: 210mm;
    min-height: 297mm;

    margin: 0 auto;

    padding: 17mm;

    background: #fff;

    color: #172033;

    position: relative;

    overflow: hidden;

    box-shadow:
        0 20px 60px rgba(0,0,0,.18);
}

.resume.template-1 {
    border-top: 6px solid #111827;
}

.resume.template-2 {
    border-top: 8px solid #172033;
}

.resume.template-3 {
    border-left: 8px solid #00a9b5;
}

.resume.template-4 {
    border-left: 8px solid #172033;
}

.header {
    display: flex;

    justify-content: space-between;

    align-items: flex-start;

    padding-bottom: 7mm;

    border-bottom: 2px solid #172033;
}

.header h1 {
    margin: 0 0 5px;

    font-size: 29px;
}

.header h2 {
    margin: 0;

    font-size: 12px;

    font-weight: 500;

    color: #536078;
}

.resume-photo {
    width: 32mm;
    height: 38mm;

    object-fit: cover;

    border: 1px solid #ccd2dc;
}

.contact {
    display: flex;

    flex-wrap: wrap;

    gap: 15px;

    padding: 4mm 0;

    border-bottom: 1px solid #dce1e8;

    color: #526078;

    font-size: 9px;
}

.section {
    margin-top: 6mm;
}

.section h3 {
    margin: 0 0 2.5mm;

    font-size: 10px;

    letter-spacing: 1px;

    color: #111a2c;
}

.section p {
    margin: 0;

    font-size: 10px;

    line-height: 1.7;

    color: #4b5568;
}

.footer {
    position: absolute;

    left: 17mm;
    right: 17mm;
    bottom: 8mm;

    padding-top: 3mm;

    border-top: 1px solid #dce1e8;

    text-align: center;

    font-family: monospace;

    font-size: 7px;

    color: #9ba5b6;
}

.toolbar {
    position: fixed;

    top: 15px;
    left: 15px;
    right: 15px;

    display: flex;

    gap: 10px;

    justify-content: center;

    z-index: 20;
}

.toolbar button {
    border: 0;

    padding: 10px 16px;

    cursor: pointer;

    background: #111827;

    color: white;

    border-radius: 6px;
}

@media print {

    html,
    body {
        background: #fff;
    }

    .toolbar {
        display: none;
    }

    .resume {
        margin: 0;

        box-shadow: none;

        width: 210mm;
        min-height: 297mm;
    }

}

</style>

</head>

<body>

<div class="toolbar">

    <button onclick="window.print()">
        Print A4
    </button>

    <button onclick="window.close()">
        Close
    </button>

</div>

<div class="resume template-${template}">

    <div class="header">

        <div>

            <h1>${name}</h1>

            <h2>${title}</h2>

        </div>

        ${photoHTML}

    </div>

    <div class="contact">

        <span>${email}</span>
        <span>${phone}</span>
        <span>${location}</span>

    </div>

    <div class="section">

        <h3>PROFILE</h3>

        <p>${about}</p>

    </div>

    <div class="section">

        <h3>EXPERIENCE</h3>

        <p>${experience}</p>

    </div>

    <div class="section">

        <h3>EDUCATION</h3>

        <p>${education}</p>

    </div>

    <div class="section">

        <h3>${skillHeading}</h3>

        <p>${technical}</p>

    </div>

    <div class="section">

        <h3>SOFT SKILLS</h3>

        <p>${soft}</p>

    </div>

    <div class="footer">
        &lt;/siddharth.resume&gt;
    </div>

</div>

</body>
</html>
`;

}


/* =========================================================
   OPEN EDITABLE RESUME
========================================================= */

function openEditableResume(
    autoPrint = false
) {

    updateResumePreview();

    const resumeWindow =
        window.open(
            "",
            "_blank",
            "width=1100,height=900"
        );

    if (!resumeWindow) {

        showToast(
            "Please allow pop-ups to open the editable resume."
        );

        return;

    }

    resumeWindow.document.open();

    resumeWindow.document.write(
        getResumeHTML()
    );

    resumeWindow.document.close();

    showToast(
        autoPrint
            ? "Editable A4 resume opened."
            : "Editable resume opened."
    );

    if (autoPrint) {

        setTimeout(
            () => {

                try {
                    resumeWindow.focus();
                    resumeWindow.print();
                } catch (error) {
                    console.warn(
                        "Print could not start automatically.",
                        error
                    );
                }

            },
            900
        );

    }

}


/* =========================================================
   EDITED RESUME BUTTONS
========================================================= */

const downloadEditedResume =
    $("#downloadEditedResume");

downloadEditedResume?.addEventListener(
    "click",
    () => {

        openEditableResume(false);

    }
);


const printEditedResume =
    $("#printEditedResume");

printEditedResume?.addEventListener(
    "click",
    () => {

        openEditableResume(true);

    }
);


/* =========================================================
   CERTIFICATE UPLOAD
========================================================= */

const certificateUpload =
    $("#certificateUpload");

const certificateGallery =
    $("#certificateGallery");

certificateUpload?.addEventListener(
    "change",
    event => {

        const files =
            [...event.target.files];

        if (!files.length) {
            return;
        }

        files.forEach(file => {

            if (!file.type.startsWith("image/")) {
                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                () => {

                    const image =
                        document.createElement("img");

                    image.src =
                        reader.result;

                    image.alt =
                        "Certificate";

                    certificateGallery.appendChild(
                        image
                    );

                };

            reader.readAsDataURL(file);

        });

        showToast(
            `${files.length} certificate image(s) added.`
        );

    }
);


/* =========================================================
   CONTACT EMAIL
========================================================= */

function updateContactEmail() {

    const email =
        resumeEmail?.value?.trim();

    const emailContact =
        $("#emailContact");

    const emailText =
        $("#contactEmailText");

    if (!email) {

        emailContact?.setAttribute(
            "href",
            "mailto:"
        );

        if (emailText) {
            emailText.textContent =
                "Send an email";
        }

        return;
    }

    emailContact?.setAttribute(
        "href",
        `mailto:${email}`
    );

    if (emailText) {
        emailText.textContent =
            email;
    }

}

resumeEmail?.addEventListener(
    "input",
    updateContactEmail
);

updateContactEmail();


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    $("#contactForm");

const contactFormStatus =
    $("#contactFormStatus");

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const formData =
            new FormData(contactForm);

        const name =
            formData.get("name");

        const email =
            formData.get("email");

        const message =
            formData.get("message");

        const subject =
            encodeURIComponent(
                `Portfolio Contact — ${name}`
            );

        const body =
            encodeURIComponent(
                `Name: ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`
            );

        /*
         * Static GitHub Pages sites do not have a server-side
         * mail endpoint. Therefore the form safely prepares
         * a mailto message using the user's email client.
         */

        const destination =
            resumeEmail?.value?.trim();

        if (!destination) {

            if (contactFormStatus) {

                contactFormStatus.textContent =
                    "Add your email in Resume Studio first, or configure a mail address in the HTML.";

            }

            return;

        }

        window.location.href =
            `mailto:${destination}?subject=${subject}&body=${body}`;

        if (contactFormStatus) {

            contactFormStatus.textContent =
                "Opening your email application...";

        }

    }
);


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

$$('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const targetID =
                anchor.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target =
                $(targetID);

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

});


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateResumePreview();

        updateContactEmail();

        console.log(
            "%cSIDDHARTH.DEV",
            "color:#00f5ff;font-size:20px;font-weight:bold;"
        );

        console.log(
            "%cSystem initialized successfully.",
            "color:#70e6a4;font-size:12px;"
        );

    }
);