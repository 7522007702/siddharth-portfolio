/* =========================================================
   SIDDHARTH.DEV
   MAIN APPLICATION JAVASCRIPT
========================================================= */

"use strict";


(() => {


    /* =====================================================
       DOM HELPERS
    ===================================================== */

    const $ =
        (selector, parent = document) =>
            parent.querySelector(selector);


    const $$ =
        (selector, parent = document) =>
            [...parent.querySelectorAll(selector)];


    /* =====================================================
       HEADER
    ===================================================== */

    const header =
        $("#site-header");


    function updateHeader() {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuButton =
        $("#mobile-menu-button");

    const navigation =
        $("#main-navigation");


    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                const open =
                    navigation.classList.toggle(
                        "open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(open)
                );

            }
        );


        $$(".nav-link", navigation)
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        () => {

                            navigation.classList.remove(
                                "open"
                            );

                            menuButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       TYPING ENGINE
    ===================================================== */

    const typingElement =
        $("#typing-text");


    const typingWords = [

        "building digital experiences.",

        "writing clean code.",

        "solving practical problems.",

        "working with data.",

        "learning new technologies.",

        "turning ideas into projects."

    ];


    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeLoop() {

        if (!typingElement) {
            return;
        }


        const current =
            typingWords[wordIndex];


        if (!deleting) {

            characterIndex++;

            typingElement.textContent =
                current.slice(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                current.length
            ) {

                deleting = true;

                setTimeout(
                    typeLoop,
                    1700
                );

                return;

            }

        } else {

            characterIndex--;

            typingElement.textContent =
                current.slice(
                    0,
                    characterIndex
                );


            if (
                characterIndex <= 0
            ) {

                deleting = false;

                wordIndex =
                    (
                        wordIndex + 1
                    ) %
                    typingWords.length;

            }

        }


        setTimeout(
            typeLoop,
            deleting ? 35 : 65
        );

    }


    typeLoop();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        $$("main section[id]");

    const navLinks =
        $$(".nav-link");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const id =
                            entry.target.id;


                        navLinks.forEach(
                            link => {

                                link.classList.toggle(
                                    "active",
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    `#${id}`
                                );

                            }
                        );

                    }
                );

            },
            {
                threshold: .25,
                rootMargin:
                    "-20% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            sectionObserver.observe(
                section
            )
    );


    /* =====================================================
       CURSOR
    ===================================================== */

    const cursor =
        $("#cursor");

    const cursorRing =
        $("#cursor-ring");


    if (
        cursor &&
        cursorRing &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        let ringX = 0;
        let ringY = 0;

        let pointerX = 0;
        let pointerY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                pointerX =
                    event.clientX;

                pointerY =
                    event.clientY;


                cursor.style.transform =
                    `translate(
                        ${pointerX}px,
                        ${pointerY}px
                    ) translate(-50%,-50%)`;

            },
            {
                passive: true
            }
        );


        function cursorAnimation() {

            ringX +=
                (
                    pointerX -
                    ringX
                ) * .16;

            ringY +=
                (
                    pointerY -
                    ringY
                ) * .16;


            cursorRing.style.transform =
                `translate(
                    ${ringX}px,
                    ${ringY}px
                ) translate(-50%,-50%)`;


            requestAnimationFrame(
                cursorAnimation
            );

        }


        cursorAnimation();


        const interactiveElements =
            $$(
                "a, button, input, textarea, .skill-card, .project-card"
            );


        interactiveElements.forEach(
            element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        document.body.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        document.body.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       CERTIFICATE SYSTEM
    ===================================================== */

    const certificateButton =
        $("#certificate-upload-button");

    const certificateInput =
        $("#certificate-input");

    const certificateGrid =
        $("#certificate-grid");


    const CERTIFICATE_STORAGE =
        "siddharth_certificates_v1";


    let certificates =
        loadCertificates();


    function loadCertificates() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    CERTIFICATE_STORAGE
                ) || "[]"
            );

        } catch {

            return [];

        }

    }


    function saveCertificates() {

        try {

            localStorage.setItem(
                CERTIFICATE_STORAGE,
                JSON.stringify(
                    certificates
                )
            );

        } catch {

            /*
             * Large image files can exceed
             * browser localStorage limits.
             */

        }

    }


    if (
        certificateButton &&
        certificateInput
    ) {

        certificateButton.addEventListener(
            "click",
            () => {

                certificateInput.click();

            }
        );


        certificateInput.addEventListener(
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
                        "Please upload a certificate image."
                    );

                    certificateInput.value = "";

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    () => {

                        certificates.push({

                            id:
                                Date.now(),

                            image:
                                reader.result,

                            title:
                                file.name

                        });


                        saveCertificates();

                        renderCertificates();

                        certificateInput.value =
                            "";

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    function renderCertificates() {

        if (!certificateGrid) {
            return;
        }


        certificateGrid.innerHTML = "";


        certificates.forEach(
            certificate => {

                const card =
                    document.createElement(
                        "article"
                    );

                card.className =
                    "certificate-card";


                card.innerHTML = `

                    <img
                        src="${certificate.image}"
                        alt="Certificate"
                    >

                    <button
                        class="certificate-remove"
                        type="button"
                        aria-label="Remove certificate"
                    >
                        ×
                    </button>

                    <div
                        class="certificate-card-info"
                    >
                        <p>
                            ${escapeHTML(
                                certificate.title
                            )}
                        </p>
                    </div>

                `;


                const remove =
                    card.querySelector(
                        ".certificate-remove"
                    );


                remove.addEventListener(
                    "click",
                    () => {

                        certificates =
                            certificates.filter(
                                item =>
                                    item.id !==
                                    certificate.id
                            );

                        saveCertificates();

                        renderCertificates();

                    }
                );


                certificateGrid.appendChild(
                    card
                );

            }
        );

    }


    function escapeHTML(value) {

        const div =
            document.createElement(
                "div"
            );

        div.textContent =
            value;

        return div.innerHTML;

    }


    renderCertificates();


    /* =====================================================
       RESUME DOWNLOAD SAFETY
    ===================================================== */

    const pdfLinks =
        $$(
            'a[href="assets/resume.pdf"]'
        );


    pdfLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    /*
                     * The browser handles the actual
                     * PDF download through the download
                     * attribute. We only prevent empty
                     * navigation when the file is missing.
                     */

                    if (
                        !link.getAttribute(
                            "href"
                        )
                    ) {

                        event.preventDefault();

                    }

                }
            );

        }
    );


    /* =====================================================
       YEAR
    ===================================================== */

    const year =
        $("#current-year");


    if (year) {

        year.textContent =
            new Date()
                .getFullYear();

    }


    /* =====================================================
       IMAGE ERROR FALLBACK
    ===================================================== */

    $$("img").forEach(
        image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.background =
                        "linear-gradient(135deg,#0a101b,#111d2b)";

                },
                {
                    once: true
                }
            );

        }
    );


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    $$(
        'a[href^="#"]'
    ).forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches
                                ? "auto"
                                : "smooth"
                    });


                    history.replaceState(
                        null,
                        "",
                        targetID
                    );

                }
            );

        }
    );


})();