/* =========================================================
   SIDDHARTH.DEV
   PROFESSIONAL RESUME ENGINE
========================================================= */

"use strict";


(() => {

    const $ =
        selector =>
            document.querySelector(selector);

    const $$ =
        selector =>
            [...document.querySelectorAll(selector)];


    const modal =
        $("#resume-modal");

    const preview =
        $("#resume-preview");

    if (!modal || !preview) {
        return;
    }


    /* =====================================================
       STATE
    ===================================================== */

    const STORAGE_KEY =
        "siddharth_resume_system_v1";


    const defaultState = {

        template: "1",

        name: "Siddharth Mishra",

        role:
            "Developer • Builder • Learner",

        email:
            "siddharth@example.com",

        phone:
            "+91 XXXXX XXXXX",

        location:
            "Lucknow, Uttar Pradesh, India",

        summary:
            "BBA student and technology enthusiast with practical experience in sales and operations, and a strong interest in programming, data analysis, automation and digital problem solving.",

        education:
            "BBA — Ambalika Management and Technology Institute\n12th — UP Board, PCB\nO Level",

        experience:
            "4+ Years — Retail Sales & Operations\nCustomer handling, sales operations, communication, problem solving and business support.",

        skills:
            "HTML5\nCSS3\nJavaScript\nPython\nSQL\nPower BI\nGit\nGitHub\nProblem Solving",

        technicalSkills:
            "HTML5 • CSS3 • JavaScript • Python • SQL • Power BI • Git • GitHub • Flutter • Dart • Firebase",

        softSkills:
            "Problem Solving • Communication • Teamwork • Adaptability • Learning Mindset • Customer Handling",

        photo:
            "assets/profile.jpg"

    };


    let state =
        loadState();


    /* =====================================================
       STORAGE
    ===================================================== */

    function loadState() {

        try {

            const saved =
                localStorage.getItem(
                    STORAGE_KEY
                );

            if (!saved) {
                return {
                    ...defaultState
                };
            }

            return {
                ...defaultState,
                ...JSON.parse(saved)
            };

        } catch (error) {

            console.warn(
                "Resume state could not be loaded.",
                error
            );

            return {
                ...defaultState
            };

        }

    }


    function saveState() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(state)
            );

        } catch (error) {

            console.warn(
                "Resume state could not be saved.",
                error
            );

        }

    }


    /* =====================================================
       OPEN / CLOSE
    ===================================================== */

    function openEditor() {

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

        populateControls();

        render();

    }


    function closeEditor() {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    const openButton =
        $("#open-resume-editor");

    const closeButton =
        $("#close-resume-editor");


    if (openButton) {
        openButton.addEventListener(
            "click",
            openEditor
        );
    }


    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeEditor
        );
    }


    const backdrop =
        $(".resume-modal-backdrop");

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeEditor
        );

    }


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


    /* =====================================================
       INPUT MAP
    ===================================================== */

    const fields = {

        name: $("#resume-name"),

        role: $("#resume-role"),

        email: $("#resume-email"),

        phone: $("#resume-phone"),

        location: $("#resume-location"),

        summary: $("#resume-summary"),

        education: $("#resume-education"),

        experience: $("#resume-experience"),

        skills: $("#resume-skills"),

        technicalSkills:
            $("#resume-technical-skills"),

        softSkills:
            $("#resume-soft-skills")

    };


    function populateControls() {

        Object.entries(fields)
            .forEach(
                ([key, element]) => {

                    if (!element) {
                        return;
                    }

                    element.value =
                        state[key] ?? "";

                }
            );

    }


    /* =====================================================
       INPUT EVENTS
    ===================================================== */

    Object.entries(fields)
        .forEach(
            ([key, element]) => {

                if (!element) {
                    return;
                }

                element.addEventListener(
                    "input",
                    () => {

                        state[key] =
                            element.value;

                        saveState();

                        render();

                    }
                );

            }
        );


    /* =====================================================
       TEMPLATE
    ===================================================== */

    const templateButtons =
        $$(".template-button");


    templateButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const template =
                        button.dataset.template;

                    if (!template) {
                        return;
                    }

                    state.template =
                        template;

                    saveState();

                    updateTemplateButtons();

                    render();

                }
            );

        }
    );


    function updateTemplateButtons() {

        templateButtons.forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.template ===
                    state.template
                );

            }
        );

    }


    /* =====================================================
       TEXT HELPERS
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    function multilineHTML(value) {

        return escapeHTML(value)
            .replace(/\n/g, "<br>");

    }


    function renderSkills(value) {

        return String(value)
            .split(/\n|,/)
            .map(
                skill =>
                    skill.trim()
            )
            .filter(Boolean)
            .map(
                skill =>
                    `<span>${escapeHTML(skill)}</span>`
            )
            .join("");

    }


    /* =====================================================
       RENDER
    ===================================================== */

    function render() {

        preview.className =
            `resume-paper template-${state.template}`;


        const name =
            preview.querySelector(
                '[data-resume-field="name"]'
            );

        const role =
            preview.querySelector(
                '[data-resume-field="role"]'
            );

        const email =
            preview.querySelector(
                '[data-resume-field="email"]'
            );

        const phone =
            preview.querySelector(
                '[data-resume-field="phone"]'
            );

        const location =
            preview.querySelector(
                '[data-resume-field="location"]'
            );

        const summary =
            preview.querySelector(
                '[data-resume-field="summary"]'
            );

        const education =
            preview.querySelector(
                '[data-resume-field="education"]'
            );

        const experience =
            preview.querySelector(
                '[data-resume-field="experience"]'
            );


        if (name) {
            name.textContent =
                state.name;
        }

        if (role) {
            role.textContent =
                state.role;
        }

        if (email) {
            email.textContent =
                state.email;
        }

        if (phone) {
            phone.textContent =
                state.phone;
        }

        if (location) {
            location.textContent =
                state.location;
        }

        if (summary) {
            summary.textContent =
                state.summary;
        }

        if (education) {
            education.innerHTML =
                multilineHTML(
                    state.education
                );
        }

        if (experience) {
            experience.innerHTML =
                multilineHTML(
                    state.experience
                );
        }


        const skillsOutput =
            $("#resume-skills-output");

        if (skillsOutput) {

            skillsOutput.innerHTML =
                renderSkills(
                    state.skills
                );

        }


        const technicalOutput =
            $("#resume-technical-output");

        if (technicalOutput) {

            technicalOutput.textContent =
                state.technicalSkills;

        }


        const softOutput =
            $("#resume-soft-output");

        if (softOutput) {

            softOutput.textContent =
                state.softSkills;

        }


        updatePhoto();

        updateTemplateStatus();

        updatePhotoControl();

    }


    /* =====================================================
       TEMPLATE STATUS
    ===================================================== */

    function updateTemplateStatus() {

        const status =
            $("#resume-template-status");

        if (!status) {
            return;
        }

        status.textContent =
            `TEMPLATE ${String(
                state.template
            ).padStart(2, "0")}`;

    }


    /* =====================================================
       PHOTO
    ===================================================== */

    const photoInput =
        $("#resume-photo-input");

    const removePhoto =
        $("#remove-resume-photo");

    const photo =
        $("#resume-photo");


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

                    alert(
                        "Please select a valid image."
                    );

                    photoInput.value = "";

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        state.photo =
                            reader.result;

                        saveState();

                        updatePhoto();

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    if (removePhoto) {

        removePhoto.addEventListener(
            "click",
            () => {

                state.photo =
                    "";

                saveState();

                updatePhoto();

                if (photoInput) {
                    photoInput.value = "";
                }

            }
        );

    }


    function updatePhoto() {

        if (!photo) {
            return;
        }

        photo.src =
            state.photo ||
            "assets/profile.jpg";

    }


    function updatePhotoControl() {

        const control =
            $("#photo-control");

        if (!control) {
            return;
        }

        const photoAllowed =
            state.template === "1" ||
            state.template === "3";

        control.style.display =
            photoAllowed
                ? ""
                : "none";

    }


    /* =====================================================
       RESET
    ===================================================== */

    const resetButton =
        $("#resume-reset");


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                const confirmed =
                    window.confirm(
                        "Reset the resume to its default content?"
                    );

                if (!confirmed) {
                    return;
                }

                state = {
                    ...defaultState
                };

                saveState();

                populateControls();

                updateTemplateButtons();

                render();

            }
        );

    }


    /* =====================================================
       PRINT
    ===================================================== */

    const printButton =
        $("#resume-print");


    if (printButton) {

        printButton.addEventListener(
            "click",
            printResume
        );

    }


    function printResume() {

        /*
         * We create a completely separate print document.
         * This makes the printed resume independent from
         * the editor UI and guarantees A4 output.
         */

        const printWindow =
            window.open(
                "",
                "_blank",
                "width=1000,height=1200"
            );


        if (!printWindow) {

            alert(
                "Please allow pop-ups to print the resume."
            );

            return;

        }


        const paperHTML =
            preview.outerHTML;


        const styles =
            getResumeStyles();


        printWindow.document.open();

        printWindow.document.write(`
            <!DOCTYPE html>

            <html lang="en">

            <head>

                <meta charset="UTF-8">

                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                >

                <title>
                    ${escapeHTML(
                        state.name
                    )} — Resume
                </title>

                <style>
                    ${styles}

                    html,
                    body {
                        margin: 0;
                        padding: 0;
                        background: #fff;
                    }

                    body {
                        width: 210mm;
                    }

                    .resume-paper {
                        margin: 0 !important;
                        box-shadow: none !important;
                    }

                    @page {
                        size: A4 portrait;
                        margin: 0;
                    }
                </style>

            </head>

            <body>

                <div id="resume-print-window">
                    ${paperHTML}
                </div>

                <script>
                    window.addEventListener(
                        "load",
                        function () {

                            setTimeout(
                                function () {
                                    window.print();
                                },
                                400
                            );

                        }
                    );
                <\/script>

            </body>

            </html>
        `);

        printWindow.document.close();

    }


    /* =====================================================
       GET RESUME CSS
    ===================================================== */

    function getResumeStyles() {

        const styleSheets =
            [...document.styleSheets];

        let css = "";

        styleSheets.forEach(
            sheet => {

                try {

                    [...sheet.cssRules]
                        .forEach(
                            rule => {

                                css +=
                                    rule.cssText +
                                    "\n";

                            }
                        );

                } catch (error) {

                    /*
                     * Cross-origin stylesheets cannot
                     * always be read. Google Fonts
                     * are intentionally ignored.
                     */

                }

            }
        );


        return css;

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateTemplateButtons();

    render();


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.SiddharthResume = {

        open:
            openEditor,

        close:
            closeEditor,

        print:
            printResume,

        reset:
            () => {

                state = {
                    ...defaultState
                };

                saveState();

                populateControls();

                updateTemplateButtons();

                render();

            }

    };

})();