"use strict";

/*
=========================================================
RESUME BUILDER
=========================================================

Features:

- 4 templates
- Template 1: photo supported
- Template 2: no photo
- Template 3: technical skills + soft skills + photo
- Template 4: technical skills + soft skills + no photo
- Live editing
- Image upload
- Image removal
- Print
- Browser PDF generation
- A4 layout
=========================================================
*/


(function () {

    let activeTemplate =
        "template1";

    let photoData =
        "";


    const modal =
        document.getElementById(
            "resumeModal"
        );

    const closeButton =
        document.getElementById(
            "resumeClose"
        );

    const paper =
        document.getElementById(
            "resumePaper"
        );

    const activeTemplateLabel =
        document.getElementById(
            "activeTemplateLabel"
        );


    if (!modal || !paper) {
        return;
    }


    /* =====================================================
       FIELD HELPERS
    ===================================================== */

    function value(id, fallback = "") {

        const element =
            document.getElementById(id);

        return element
            ? element.value.trim()
            : fallback;

    }


    function escapeHtml(text) {

        return String(text)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    function splitItems(text) {

        return text
            .split(/[,|\n]/)
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);

    }


    function skillsHtml(text) {

        return splitItems(text)
            .map(
                skill =>
                    `<span class="resume-skill">${escapeHtml(skill)}</span>`
            )
            .join("");

    }


    function multilineHtml(text) {

        return escapeHtml(text)
            .replace(
                /\n/g,
                "<br>"
            );

    }


    function bulletsHtml(text) {

        return text
            .split(/\n/)
            .map(
                line =>
                    line.trim()
            )
            .filter(Boolean)
            .map(
                line =>
                    `<li>${escapeHtml(line)}</li>`
            )
            .join("");

    }


    /* =====================================================
       PHOTO
    ===================================================== */

    const photoInput =
        document.getElementById(
            "resumePhoto"
        );


    if (photoInput) {

        photoInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files?.[0];


                if (!file) {
                    return;
                }


                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    window.showToast?.(
                        "Please select an image file."
                    );

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    event => {

                        photoData =
                            event.target.result;

                        renderResume();

                        window.showToast?.(
                            "Profile photo added."
                        );

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    const removePhoto =
        document.getElementById(
            "removePhoto"
        );


    if (removePhoto) {

        removePhoto.addEventListener(
            "click",
            () => {

                photoData = "";

                if (photoInput) {
                    photoInput.value = "";
                }

                renderResume();

                window.showToast?.(
                    "Profile photo removed."
                );

            }
        );

    }


    /* =====================================================
       TEMPLATE SELECTORS
    ===================================================== */

    document
        .querySelectorAll(
            ".template-select"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setTemplate(
                        button.dataset.template
                    );

                }
            );

        });


    function setTemplate(template) {

        activeTemplate =
            template ||
            "template1";


        document
            .querySelectorAll(
                ".template-select"
            )
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.template ===
                    activeTemplate
                );

            });


        const number =
            activeTemplate
                .replace(
                    "template",
                    ""
                );


        if (activeTemplateLabel) {

            activeTemplateLabel.textContent =
                `Template ${number.padStart(2, "0")}`;

        }


        renderResume();

    }


    /* =====================================================
       INPUT EVENTS
    ===================================================== */

    const inputIds = [

        "resumeName",
        "resumeTitle",
        "resumeEmail",
        "resumePhone",
        "resumeLocation",
        "resumeLinkedin",
        "resumeGithub",
        "resumeSummary",
        "resumeTechnicalSkills",
        "resumeSoftSkills",
        "resumeExperience",
        "resumeEducation"

    ];


    inputIds.forEach(
        id => {

            const element =
                document.getElementById(id);


            if (!element) return;


            element.addEventListener(
                "input",
                () => {

                    renderResume();

                }
            );

        }
    );


    /* =====================================================
       OPEN
    ===================================================== */

    window.openResumeBuilder =
        function (template = "template1") {

            setTemplate(
                template
            );


            modal.classList.add(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );


            renderResume();

        };


    /* =====================================================
       CLOSE
    ===================================================== */

    function closeModal() {

        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }


    closeButton?.addEventListener(
        "click",
        closeModal
    );


    document
        .querySelector(
            ".resume-modal-backdrop"
        )
        ?.addEventListener(
            "click",
            closeModal
        );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "open"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       BUILD COMMON DATA
    ===================================================== */

    function getData() {

        return {

            name:
                value(
                    "resumeName",
                    "Siddharth Mishra"
                ),

            title:
                value(
                    "resumeTitle",
                    "Developer & Data Analyst"
                ),

            email:
                value(
                    "resumeEmail",
                    "your-email@example.com"
                ),

            phone:
                value(
                    "resumePhone",
                    "+91 XXXXX XXXXX"
                ),

            location:
                value(
                    "resumeLocation",
                    "India"
                ),

            linkedin:
                value(
                    "resumeLinkedin",
                    "linkedin.com/in/your-profile"
                ),

            github:
                value(
                    "resumeGithub",
                    "github.com/your-profile"
                ),

            summary:
                value(
                    "resumeSummary"
                ),

            technicalSkills:
                value(
                    "resumeTechnicalSkills"
                ),

            softSkills:
                value(
                    "resumeSoftSkills"
                ),

            experience:
                value(
                    "resumeExperience"
                ),

            education:
                value(
                    "resumeEducation"
                ),

            photo:
                photoData

        };

    }


    /* =====================================================
       PHOTO HTML
    ===================================================== */

    function photoHtml(data) {

        if (!data.photo) {

            return `
                <div class="resume-photo">
                    <div
                        style="
                            width:100%;
                            height:100%;
                            display:grid;
                            place-items:center;
                            color:#94a3b8;
                            font-size:9px;
                            text-align:center;
                        "
                    >
                        PHOTO
                    </div>
                </div>
            `;

        }


        return `
            <div class="resume-photo">
                <img
                    src="${data.photo}"
                    alt="Profile Photo"
                >
            </div>
        `;

    }


    /* =====================================================
       TEMPLATE 1
    ===================================================== */

    function template1(data) {

        return `

        <article class="resume-document resume-template1">

            <header class="resume-header">

                <div>

                    <h1 class="resume-name">
                        ${escapeHtml(data.name)}
                    </h1>

                    <p class="resume-title">
                        ${escapeHtml(data.title)}
                    </p>

                    <div class="resume-contact-line">

                        <span>${escapeHtml(data.email)}</span>

                        <span>${escapeHtml(data.phone)}</span>

                        <span>${escapeHtml(data.location)}</span>

                        <span>${escapeHtml(data.linkedin)}</span>

                        <span>${escapeHtml(data.github)}</span>

                    </div>

                </div>


                <div class="resume-header-right">

                    ${photoHtml(data)}

                </div>

            </header>


            <section>

                <h2 class="resume-section-title">
                    Professional Summary
                </h2>

                <p class="resume-text">
                    ${multilineHtml(data.summary)}
                </p>

            </section>


            <div class="resume-columns">

                <div>

                    <section>

                        <h2 class="resume-section-title">
                            Experience
                        </h2>

                        <ul class="resume-list">
                            ${bulletsHtml(data.experience)}
                        </ul>

                    </section>


                    <section>

                        <h2 class="resume-section-title">
                            Education
                        </h2>

                        <p class="resume-text">
                            ${multilineHtml(data.education)}
                        </p>

                    </section>

                </div>


                <aside>

                    <section>

                        <h2 class="resume-section-title">
                            Technical Skills
                        </h2>

                        <div class="resume-skills">
                            ${skillsHtml(data.technicalSkills)}
                        </div>

                    </section>


                    <section>

                        <h2 class="resume-section-title">
                            Soft Skills
                        </h2>

                        <div class="resume-skills">
                            ${skillsHtml(data.softSkills)}
                        </div>

                    </section>

                </aside>

            </div>

        </article>

        `;

    }


    /* =====================================================
       TEMPLATE 2
       NO PHOTO
    ===================================================== */

    function template2(data) {

        return `

        <article class="resume-document resume-template2">

            <header class="resume-header">

                <h1 class="resume-name">
                    ${escapeHtml(data.name)}
                </h1>

                <p class="resume-title">
                    ${escapeHtml(data.title)}
                </p>

                <div class="resume-contact-line">

                    <span>${escapeHtml(data.email)}</span>
                    <span>${escapeHtml(data.phone)}</span>
                    <span>${escapeHtml(data.location)}</span>
                    <span>${escapeHtml(data.linkedin)}</span>
                    <span>${escapeHtml(data.github)}</span>

                </div>

            </header>


            <section>

                <h2 class="resume-section-title">
                    Professional Summary
                </h2>

                <p class="resume-text">
                    ${multilineHtml(data.summary)}
                </p>

            </section>


            <div class="resume-columns">

                <div>

                    <section>

                        <h2 class="resume-section-title">
                            Experience
                        </h2>

                        <ul class="resume-list">
                            ${bulletsHtml(data.experience)}
                        </ul>

                    </section>


                    <section>

                        <h2 class="resume-section-title">
                            Education
                        </h2>

                        <p class="resume-text">
                            ${multilineHtml(data.education)}
                        </p>

                    </section>

                </div>


                <div>

                    <section>

                        <h2 class="resume-section-title">
                            Technical Skills
                        </h2>

                        <div class="resume-skills">
                            ${skillsHtml(data.technicalSkills)}
                        </div>

                    </section>


                    <section>

                        <h2 class="resume-section-title">
                            Soft Skills
                        </h2>

                        <div class="resume-skills">
                            ${skillsHtml(data.softSkills)}
                        </div>

                    </section>

                </div>

            </div>

        </article>

        `;

    }


    /* =====================================================
       TEMPLATE 3
       TECHNICAL + SOFT + PHOTO
    ===================================================== */

    function template3(data) {

        return `

        <article class="resume-document resume-template3">

            <header class="resume-header">

                <div>

                    <h1 class="resume-name">
                        ${escapeHtml(data.name)}
                    </h1>

                    <p class="resume-title">
                        ${escapeHtml(data.title)}
                    </p>

                    <div class="resume-contact-line">

                        <span>${escapeHtml(data.email)}</span>
                        <span>${escapeHtml(data.phone)}</span>
                        <span>${escapeHtml(data.location)}</span>
                        <span>${escapeHtml(data.linkedin)}</span>
                        <span>${escapeHtml(data.github)}</span>

                    </div>

                </div>


                <div>

                    ${photoHtml(data)}

                </div>

            </header>


            <div class="resume-content">

                <section>

                    <h2 class="resume-section-title">
                        Professional Summary
                    </h2>

                    <p class="resume-text">
                        ${multilineHtml(data.summary)}
                    </p>

                </section>


                <div class="resume-columns">

                    <div>

                        <section>

                            <h2 class="resume-section-title">
                                Experience
                            </h2>

                            <ul class="resume-list">
                                ${bulletsHtml(data.experience)}
                            </ul>

                        </section>


                        <section>

                            <h2 class="resume-section-title">
                                Education
                            </h2>

                            <p class="resume-text">
                                ${multilineHtml(data.education)}
                            </p>

                        </section>

                    </div>


                    <aside>

                        <section>

                            <h2 class="resume-section-title">
                                Technical Skills
                            </h2>

                            <div class="resume-skills">
                                ${skillsHtml(data.technicalSkills)}
                            </div>

                        </section>


                        <section>

                            <h2 class="resume-section-title">
                                Soft Skills
                            </h2>

                            <div class="resume-skills">
                                ${skillsHtml(data.softSkills)}
                            </div>

                        </section>

                    </aside>

                </div>

            </div>

        </article>

        `;

    }


    /* =====================================================
       TEMPLATE 4
       TECHNICAL + SOFT + NO PHOTO
    ===================================================== */

    function template4(data) {

        return `

        <article class="resume-document resume-template4">

            <header class="resume-header">

                <h1 class="resume-name">
                    ${escapeHtml(data.name)}
                </h1>

                <p class="resume-title">
                    ${escapeHtml(data.title)}
                </p>

                <div class="resume-contact-line">

                    <span>${escapeHtml(data.email)}</span>
                    <span>${escapeHtml(data.phone)}</span>
                    <span>${escapeHtml(data.location)}</span>
                    <span>${escapeHtml(data.linkedin)}</span>
                    <span>${escapeHtml(data.github)}</span>

                </div>

            </header>


            <div class="resume-content">

                <section>

                    <h2 class="resume-section-title">
                        Professional Summary
                    </h2>

                    <p class="resume-text">
                        ${multilineHtml(data.summary)}
                    </p>

                </section>


                <div class="resume-columns">

                    <main>

                        <section>

                            <h2 class="resume-section-title">
                                Experience
                            </h2>

                            <ul class="resume-list">
                                ${bulletsHtml(data.experience)}
                            </ul>

                        </section>


                        <section>

                            <h2 class="resume-section-title">
                                Education
                            </h2>

                            <p class="resume-text">
                                ${multilineHtml(data.education)}
                            </p>

                        </section>

                    </main>


                    <aside>

                        <section>

                            <h2 class="resume-section-title">
                                Technical Skills
                            </h2>

                            <div class="resume-skills">
                                ${skillsHtml(data.technicalSkills)}
                            </div>

                        </section>


                        <section>

                            <h2 class="resume-section-title">
                                Soft Skills
                            </h2>

                            <div class="resume-skills">
                                ${skillsHtml(data.softSkills)}
                            </div>

                        </section>

                    </aside>

                </div>

            </div>

        </article>

        `;

    }


    /* =====================================================
       RENDER
    ===================================================== */

    function renderResume() {

        const data =
            getData();


        let html = "";


        switch (activeTemplate) {

            case "template2":

                html =
                    template2(data);

                break;


            case "template3":

                html =
                    template3(data);

                break;


            case "template4":

                html =
                    template4(data);

                break;


            case "template1":

            default:

                html =
                    template1(data);

                break;

        }


        paper.innerHTML =
            html;

    }


    /* =====================================================
       DOWNLOAD PDF
    =====================================================

    Browser security does not allow a normal HTML page to
    silently generate a PDF file everywhere.

    Therefore the professional browser-native approach is:

       Download PDF -> print dialog -> Save as PDF

    This produces the same A4 resume.
    ===================================================== */

    const downloadButton =
        document.getElementById(
            "downloadResume"
        );


    if (downloadButton) {

        downloadButton.addEventListener(
            "click",
            () => {

                renderResume();

                window.showToast?.(
                    "Print dialog opened — choose 'Save as PDF' to download your resume."
                );


                setTimeout(
                    () => {

                        printResume();

                    },
                    150
                );

            }
        );

    }


    /* =====================================================
       PRINT
    ===================================================== */

    const printButton =
        document.getElementById(
            "printResume"
        );


    if (printButton) {

        printButton.addEventListener(
            "click",
            () => {

                renderResume();

                printResume();

            }
        );

    }


    function printResume() {

        /*
         * Important:
         *
         * We open a dedicated print window containing
         * exactly the selected resume.
         *
         * This makes the print result independent from
         * the portfolio page.
         */

        const resumeHtml =
            paper.innerHTML;


        const printWindow =
            window.open(
                "",
                "_blank",
                "width=1000,height=1200"
            );


        if (!printWindow) {

            window.showToast?.(
                "Please allow pop-ups to print the resume."
            );

            return;

        }


        const styles =
            collectResumeStyles();


        printWindow.document.open();


        printWindow.document.write(`
<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>
        ${escapeHtml(
            value(
                "resumeName",
                "Siddharth Mishra"
            )
        )} — Resume
    </title>

    <style>

        ${styles}

        @page {
            size: A4 portrait;
            margin: 0;
        }

        html,
        body {
            margin: 0;
            padding: 0;
            background: white;
        }

        .resume-document {
            box-shadow: none !important;
        }

        @media print {

            html,
            body {
                width: 210mm;
                min-height: 297mm;
            }

        }

    </style>

</head>

<body>

    <div class="resume-paper">

        ${resumeHtml}

    </div>

</body>

</html>
        `);


        printWindow.document.close();


        printWindow.focus();


        setTimeout(
            () => {

                printWindow.print();

            },
            500
        );


        printWindow.onafterprint =
            () => {

                printWindow.close();

            };

    }


    /* =====================================================
       RESUME STYLE COLLECTION
    ===================================================== */

    function collectResumeStyles() {

        const sheets =
            Array.from(
                document.styleSheets
            );


        let css = "";


        sheets.forEach(
            sheet => {

                try {

                    const rules =
                        Array.from(
                            sheet.cssRules
                        );


                    rules.forEach(
                        rule => {

                            const text =
                                rule.cssText || "";


                            if (
                                text.includes(
                                    "resume-"
                                ) ||
                                text.includes(
                                    "resume"
                                ) ||
                                text.includes(
                                    "template"
                                )
                            ) {

                                css +=
                                    `${text}\n`;

                            }

                        }
                    );

                } catch (error) {

                    /*
                     * Cross-origin stylesheets may not
                     * be readable. The resume CSS is
                     * local, so this is normally fine.
                     */

                }

            }
        );


        return css;

    }


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    setTemplate(
        "template1"
    );


})();