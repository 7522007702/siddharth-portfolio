/* =========================================================
   SIDDHARTH MISHRA PORTFOLIO
   MASTER JAVASCRIPT SYSTEM
   Real-Time Weather + Portfolio Interactions
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
        "Retail Operations",
        "Sales Professional",
        "Sales & Marketing",
        "Management Information System",
        "Aspiring Business Analyst",
        "Future Entrepreneur",
        "Developer",
        "Digital Builder",
        "Problem Solver",
        "Technology Explorer",
        "Continuous Learner"
    ],

    typingIndex: 0,
    typingCharacter: 0,
    typingDeleting: false,

    selectedResumeTemplate: 1,

    uploadedCertificates: [],

    resumePhoto:
        localStorage.getItem("siddharthResumePhoto") ||
        "assets/profile.jpg",

    weather: {
        state: "unknown",
        temperature: null,
        humidity: null,
        windSpeed: null,
        description: "Loading weather...",
        icon: "◌",
        isDay: true,
        lastUpdated: null
    }
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
        "connecting weather service...",
        "portfolio ready."
    ];

    let value = 0;
    let messageIndex = 0;

    const timer = setInterval(() => {
        value += Math.floor(Math.random() * 14) + 7;

        if (value > 100) {
            value = 100;
        }

        if (
            messageIndex < messages.length &&
            value >= (messageIndex + 1) * (100 / messages.length)
        ) {
            if (text) {
                text.textContent = messages[messageIndex];
            }

            messageIndex++;
        }

        if (progress) {
            progress.style.width = `${value}%`;
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
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton = $("#mobileMenuButton");
const mainNav = $("#mainNav");

if (mobileMenuButton && mainNav) {
    mobileMenuButton.addEventListener("click", () => {
        const open = mainNav.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(open)
        );
    });

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
    const scrollTop = window.scrollY;

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
        scrollProgress.style.width = `${percentage}%`;
    }
}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

handleScroll();

if (backTop) {
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
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
    document.addEventListener("mousemove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.13;
        ringY += (mouseY - ringY) * 0.13;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactiveSelectors =
        "a, button, input, textarea, select, " +
        ".skill-card, .project-card, .contact-link, " +
        ".template-select, .editor-template";

    document.addEventListener("mouseover", event => {
        if (event.target.closest(interactiveSelectors)) {
            document.body.classList.add("cursor-hover");
        }
    });

    document.addEventListener("mouseout", event => {
        if (event.target.closest(interactiveSelectors)) {
            document.body.classList.remove("cursor-hover");
        }
    });
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

    const words = state.typingWords;
    const currentWord = words[state.typingIndex];

    if (!state.typingDeleting) {
        state.typingCharacter++;

        typingText.textContent =
            currentWord.substring(
                0,
                state.typingCharacter
            );

        if (
            state.typingCharacter >=
            currentWord.length
        ) {
            state.typingDeleting = true;

            setTimeout(typingLoop, 1200);
            return;
        }
    } else {
        state.typingCharacter--;

        typingText.textContent =
            currentWord.substring(
                0,
                state.typingCharacter
            );

        if (state.typingCharacter <= 0) {
            state.typingDeleting = false;

            state.typingIndex =
                (state.typingIndex + 1) %
                words.length;
        }
    }

    setTimeout(
        typingLoop,
        state.typingDeleting ? 45 : 85
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
        window.innerWidth < 600 ? 55 : 120;

    const fragment =
        document.createDocumentFragment();

    for (let index = 0; index < amount; index++) {
        const drop = document.createElement("span");

        drop.className = "raindrop";

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
   REAL-TIME WEATHER + DAY PERIOD SYSTEM
   Morning / Day / Afternoon / Evening / Night
========================================================= */

(function initRealTimeWeather() {
    "use strict";

    const weatherPanel = document.querySelector("[data-weather-panel]");

    if (!weatherPanel) {
        return;
    }

    const weatherLocation = weatherPanel.querySelector(
        "[data-weather-location]"
    );

    const weatherIcon = weatherPanel.querySelector(
        "[data-weather-icon]"
    );

    const weatherTemperature = weatherPanel.querySelector(
        "[data-weather-temperature]"
    );

    const weatherDescription = weatherPanel.querySelector(
        "[data-weather-description]"
    );

    const weatherHumidity = weatherPanel.querySelector(
        "[data-weather-humidity]"
    );

    const weatherWind = weatherPanel.querySelector(
        "[data-weather-wind]"
    );

    const weatherUpdated = weatherPanel.querySelector(
        "[data-weather-updated]"
    );

    const weatherPeriod = weatherPanel.querySelector(
        "[data-weather-period]"
    );

    const weatherStatus = weatherPanel.querySelector(
        "[data-weather-status]"
    );

    const cityBackground = document.querySelector(
        "#cityBackground"
    );

    const body = document.body;

    /*
     * Lucknow coordinates.
     *
     * You can change these coordinates later
     * if you want weather for another city.
     */
    const WEATHER_API_URL =
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude=26.8467" +
        "&longitude=80.9462" +
        "&current=" +
        "temperature_2m," +
        "relative_humidity_2m," +
        "precipitation," +
        "rain," +
        "showers," +
        "weather_code," +
        "cloud_cover," +
        "wind_speed_10m," +
        "is_day" +
        "&daily=sunrise,sunset" +
        "&forecast_days=1" +
        "&timezone=Asia%2FKolkata";

    const weatherCodeMap = {
        0: {
            state: "clear",
            icon: "☀",
            nightIcon: "☾",
            description: "Clear sky"
        },

        1: {
            state: "clear",
            icon: "🌤",
            nightIcon: "☾",
            description: "Mainly clear"
        },

        2: {
            state: "cloudy",
            icon: "⛅",
            nightIcon: "☁",
            description: "Partly cloudy"
        },

        3: {
            state: "cloudy",
            icon: "☁",
            nightIcon: "☁",
            description: "Overcast"
        },

        45: {
            state: "fog",
            icon: "〰",
            nightIcon: "〰",
            description: "Fog"
        },

        48: {
            state: "fog",
            icon: "〰",
            nightIcon: "〰",
            description: "Depositing rime fog"
        },

        51: {
            state: "rain",
            icon: "☂",
            nightIcon: "☂",
            description: "Light drizzle"
        },

        53: {
            state: "rain",
            icon: "☂",
            nightIcon: "☂",
            description: "Moderate drizzle"
        },

        55: {
            state: "rain",
            icon: "☂",
            nightIcon: "☂",
            description: "Dense drizzle"
        },

        56: {
            state: "rain",
            icon: "☂",
            nightIcon: "☂",
            description: "Freezing drizzle"
        },

        57: {
            state: "rain",
            icon: "☂",
            nightIcon: "☂",
            description: "Heavy freezing drizzle"
        },

        61: {
            state: "rain",
            icon: "☔",
            nightIcon: "☔",
            description: "Slight rain"
        },

        63: {
            state: "rain",
            icon: "☔",
            nightIcon: "☔",
            description: "Moderate rain"
        },

        65: {
            state: "rain",
            icon: "☔",
            nightIcon: "☔",
            description: "Heavy rain"
        },

        66: {
            state: "rain",
            icon: "☔",
            nightIcon: "☔",
            description: "Freezing rain"
        },

        67: {
            state: "rain",
            icon: "☔",
            nightIcon: "☔",
            description: "Heavy freezing rain"
        },

        71: {
            state: "snow",
            icon: "❄",
            nightIcon: "❄",
            description: "Slight snow"
        },

        73: {
            state: "snow",
            icon: "❄",
            nightIcon: "❄",
            description: "Moderate snow"
        },

        75: {
            state: "snow",
            icon: "❄",
            nightIcon: "❄",
            description: "Heavy snow"
        },

        77: {
            state: "snow",
            icon: "❄",
            nightIcon: "❄",
            description: "Snow grains"
        },

        80: {
            state: "rain",
            icon: "🌦",
            nightIcon: "☔",
            description: "Slight rain showers"
        },

        81: {
            state: "rain",
            icon: "🌦",
            nightIcon: "☔",
            description: "Moderate rain showers"
        },

        82: {
            state: "storm",
            icon: "⛈",
            nightIcon: "⛈",
            description: "Violent rain showers"
        },

        85: {
            state: "snow",
            icon: "🌨",
            nightIcon: "🌨",
            description: "Slight snow showers"
        },

        86: {
            state: "snow",
            icon: "🌨",
            nightIcon: "🌨",
            description: "Heavy snow showers"
        },

        95: {
            state: "storm",
            icon: "⚡",
            nightIcon: "⚡",
            description: "Thunderstorm"
        },

        96: {
            state: "storm",
            icon: "⛈",
            nightIcon: "⛈",
            description: "Thunderstorm with hail"
        },

        99: {
            state: "storm",
            icon: "⛈",
            nightIcon: "⛈",
            description: "Heavy thunderstorm with hail"
        }
    };

    const periodLabels = {
        morning: "Morning",
        day: "Day",
        afternoon: "Afternoon",
        evening: "Evening",
        night: "Night",
        unknown: "Detecting..."
    };

    /*
     * Extract HH:mm from Open-Meteo local ISO string.
     *
     * Example:
     * 2026-09-14T06:00
     * becomes 360 minutes.
     *
     * This avoids timezone conversion problems.
     */
    function getMinutesFromIso(value) {
        if (!value) {
            return null;
        }

        const match = String(value).match(
            /T(\d{2}):(\d{2})/
        );

        if (!match) {
            return null;
        }

        const hours = Number(match[1]);
        const minutes = Number(match[2]);

        return (hours * 60) + minutes;
    }

    function getCurrentMinutes(currentTime) {
        if (currentTime) {
            const apiMinutes = getMinutesFromIso(currentTime);

            if (apiMinutes !== null) {
                return apiMinutes;
            }
        }

        const now = new Date();

        return (
            now.getHours() * 60 +
            now.getMinutes()
        );
    }

    /*
     * Time periods:
     *
     * Before sunrise       = Night
     * Sunrise to 10:00     = Morning
     * 10:00 to 12:00       = Day
     * 12:00 to 16:00       = Afternoon
     * 16:00 to sunset      = Evening
     * After sunset         = Night
     */
    function getDayPeriod(
        currentTime,
        sunriseTime,
        sunsetTime
    ) {
        const currentMinutes =
            getCurrentMinutes(currentTime);

        const sunriseMinutes =
            getMinutesFromIso(sunriseTime);

        const sunsetMinutes =
            getMinutesFromIso(sunsetTime);

        if (
            sunriseMinutes === null ||
            sunsetMinutes === null
        ) {
            const fallbackHour =
                Math.floor(currentMinutes / 60);

            if (fallbackHour >= 5 && fallbackHour < 10) {
                return "morning";
            }

            if (fallbackHour >= 10 && fallbackHour < 12) {
                return "day";
            }

            if (fallbackHour >= 12 && fallbackHour < 16) {
                return "afternoon";
            }

            if (fallbackHour >= 16 && fallbackHour < 19) {
                return "evening";
            }

            return "night";
        }

        if (
            currentMinutes < sunriseMinutes ||
            currentMinutes >= sunsetMinutes
        ) {
            return "night";
        }

        if (currentMinutes < 10 * 60) {
            return "morning";
        }

        if (currentMinutes < 12 * 60) {
            return "day";
        }

        if (currentMinutes < 16 * 60) {
            return "afternoon";
        }

        return "evening";
    }

    function setWeatherState(weatherState) {
        body.dataset.weatherState = weatherState;

        if (cityBackground) {
            cityBackground.classList.remove(
                "weather-clear",
                "weather-cloudy",
                "weather-fog",
                "weather-rain",
                "weather-storm",
                "weather-snow"
            );

            cityBackground.classList.add(
                `weather-${weatherState}`
            );
        }
    }

    function setDayPeriod(period) {
        body.dataset.dayPeriod = period;

        if (cityBackground) {
            cityBackground.classList.remove(
                "period-morning",
                "period-day",
                "period-afternoon",
                "period-evening",
                "period-night",
                "period-unknown"
            );

            cityBackground.classList.add(
                `period-${period}`
            );
        }

        if (weatherPeriod) {
            weatherPeriod.textContent =
                periodLabels[period] ||
                periodLabels.unknown;
        }
    }

    function formatUpdatedTime() {
        const now = new Date();

        return now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }
        );
    }

    function setStatus(text, isError = false) {
        if (!weatherStatus) {
            return;
        }

        weatherStatus.textContent = text;
        weatherStatus.classList.toggle(
            "error",
            isError
        );
    }

    function showWeatherError() {
        setStatus("OFFLINE", true);

        if (weatherTemperature) {
            weatherTemperature.textContent = "--°";
        }

        if (weatherDescription) {
            weatherDescription.textContent =
                "Weather unavailable";
        }

        if (weatherHumidity) {
            weatherHumidity.textContent = "--%";
        }

        if (weatherWind) {
            weatherWind.textContent = "-- km/h";
        }

        if (weatherUpdated) {
            weatherUpdated.textContent =
                "Connection unavailable";
        }

        if (weatherIcon) {
            weatherIcon.textContent = "◌";
        }

        setDayPeriod("unknown");
    }

    function updateWeatherInterface(data) {
        if (!data || !data.current) {
            showWeatherError();
            return;
        }

        const current = data.current;
        const daily = data.daily || {};

        const weatherCode =
            Number(current.weather_code);

        const weatherInfo =
            weatherCodeMap[weatherCode] ||
            {
                state: "cloudy",
                icon: "☁",
                nightIcon: "☁",
                description: "Variable conditions"
            };

        const period = getDayPeriod(
            current.time,
            daily.sunrise?.[0],
            daily.sunset?.[0]
        );

        const isNight = period === "night";

        setWeatherState(weatherInfo.state);
        setDayPeriod(period);
        setStatus("LIVE");

        if (weatherLocation) {
            weatherLocation.textContent =
                "Lucknow, India";
        }

        if (weatherIcon) {
            weatherIcon.textContent =
                isNight
                    ? weatherInfo.nightIcon
                    : weatherInfo.icon;
        }

        if (weatherTemperature) {
            const temperature =
                Math.round(
                    Number(current.temperature_2m)
                );

            weatherTemperature.textContent =
                `${temperature}°C`;
        }

        if (weatherDescription) {
            weatherDescription.textContent =
                weatherInfo.description;
        }

        if (weatherHumidity) {
            weatherHumidity.textContent =
                `${Math.round(
                    Number(current.relative_humidity_2m)
                )}%`;
        }

        if (weatherWind) {
            weatherWind.textContent =
                `${Math.round(
                    Number(current.wind_speed_10m)
                )} km/h`;
        }

        if (weatherUpdated) {
            weatherUpdated.textContent =
                formatUpdatedTime();
        }
    }

    async function loadRealWeather() {
        setStatus("SYNCING");

        try {
            const response = await fetch(
                WEATHER_API_URL,
                {
                    method: "GET",
                    cache: "no-store"
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Weather API error: ${response.status}`
                );
            }

            const data = await response.json();

            updateWeatherInterface(data);
        } catch (error) {
            console.warn(
                "Real-time weather could not be loaded:",
                error
            );

            showWeatherError();
        }
    }

    /*
     * Initial weather load.
     */
    loadRealWeather();

    /*
     * Refresh weather every 10 minutes.
     */
    const weatherRefreshTimer = setInterval(
        loadRealWeather,
        10 * 60 * 1000
    );

    /*
     * Update day period every minute so the background
     * changes even without waiting for the API refresh.
     */
    const periodRefreshTimer = setInterval(
        loadRealWeather,
        60 * 1000
    );

    /*
     * Refresh when user returns to the tab.
     */
    document.addEventListener(
        "visibilitychange",
        () => {
            if (!document.hidden) {
                loadRealWeather();
            }
        }
    );

    /*
     * Expose controls for debugging.
     */
    window.SiddharthWeather = {
        reload: loadRealWeather,
        destroy: () => {
            clearInterval(weatherRefreshTimer);
            clearInterval(periodRefreshTimer);
        }
    };
})();

/* =========================================================
   CITY PARALLAX
========================================================= */

(function cityParallax() {
    const city = $("#cityBackground");

    if (!city) return;

    const finePointer =
        window.matchMedia("(pointer:fine)").matches;

    if (!finePointer) return;

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", event => {
        targetX =
            (event.clientX / window.innerWidth - 0.5) * 10;

        targetY =
            (event.clientY / window.innerHeight - 0.5) * 7;
    });

    function animate() {
        currentX +=
            (targetX - currentX) * 0.025;

        currentY +=
            (targetY - currentY) * 0.025;

        city.style.transform =
            `scale(1.025) translate3d(` +
            `${currentX}px, ${currentY}px, 0)`;

        requestAnimationFrame(animate);
    }

    animate();
})();

/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");

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

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = $$("main section[id]");
const navLinks = $$(".nav-link");

if ("IntersectionObserver" in window) {
    const sectionObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = $(
                        `.nav-link[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(element) {
    const target = Number(
        element.dataset.target
    );

    if (!Number.isFinite(target)) return;

    const duration = 1200;
    const start = performance.now();

    function update(time) {
        const progress = Math.min(
            (time - start) / duration,
            1
        );

        const eased =
            1 - Math.pow(1 - progress, 3);

        element.textContent =
            Math.floor(target * eased);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

if ("IntersectionObserver" in window) {
    const counterObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);

                        counterObserver.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.6
            }
        );

    $$(".counter").forEach(counter => {
        counterObserver.observe(counter);
    });
} else {
    $$(".counter").forEach(counter => {
        counter.textContent =
            counter.dataset.target || "0";
    });
}

/* =========================================================
   SKILL BARS
========================================================= */

if ("IntersectionObserver" in window) {
    const skillObserver =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    $$(".skill-bar span", entry.target)
                        .forEach(bar => {
                            setTimeout(() => {
                                bar.style.width =
                                    bar.dataset.width;
                            }, 150);
                        });

                    skillObserver.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.25
            }
        );

    $$(".skill-card").forEach(card => {
        skillObserver.observe(card);
    });
} else {
    $$(".skill-bar span").forEach(bar => {
        bar.style.width = bar.dataset.width;
    });
}

/* =========================================================
   PROJECT FILTERS
========================================================= */

const projectFilters = $$(".project-filter");
const projectCards = $$(".project-card");

projectFilters.forEach(filter => {
    filter.addEventListener("click", () => {
        projectFilters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selected =
            filter.dataset.filter;

        projectCards.forEach(card => {
            const category =
                card.dataset.category;

            const shouldShow =
                selected === "all" ||
                category === selected;

            card.classList.toggle(
                "hidden",
                !shouldShow
            );
        });
    });
});

/* =========================================================
   PROJECT PAGE NAVIGATION
========================================================= */

const projectPages = {
    univichar: "projects/univichar.html",
    powerbi: "projects/powerbi-dashboard.html",
    sql: "projects/sql-analysis.html",
    portfolio: "projects/portfolio-system.html",
    computer: "projects/fundamental-of-computer.html"
};

$$(".project-card").forEach(card => {
    const button = $(".project-open", card);

    const projectKey =
        card.dataset.project ||
        button?.dataset.project;

    if (
        !projectKey ||
        !projectPages[projectKey]
    ) {
        return;
    }

    card.dataset.project = projectKey;
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "link");

    const openProjectPage = () => {
        const page = projectPages[projectKey];

        if (page) {
            window.location.href = page;
        }
    };

    card.addEventListener("click", event => {
        if (event.target.closest(".project-open")) {
            return;
        }

        if (event.target.closest("a")) {
            return;
        }

        openProjectPage();
    });

    card.addEventListener("keydown", event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            openProjectPage();
        }
    });

    if (button) {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            openProjectPage();
        });
    }
});

/* =========================================================
   OWNER-MANAGED CERTIFICATES
========================================================= */

const ownerCertificates = [
    {
        src: "assets/certificates/certificate-.jpg",
        title: "Certificate Name"
    },
    {
        src: "assets/certificates/certificate-1.jpg",
        title: "Another Certificate"
    },
    {
        src: "assets/certificates/certificate-2.jpg",
        title: "Another Certificate"
    },
    {
        src: "assets/certificates/certificate-3.jpg",
        title: "Another Certificate"
    },
    {
        src: "assets/certificates/certificate-4.jpg",
        title: "Another Certificate"
    },
    {
        src: "assets/certificates/certificate-5.jpg",
        title: "Another Certificate"
    }
];

const certificateGrid = $("#certificateGrid");

function renderCertificates() {
    if (!certificateGrid) return;

    certificateGrid.innerHTML = "";

    if (ownerCertificates.length === 0) {
        const empty = document.createElement("div");

        empty.className = "certificate-empty";

        const tag = document.createElement("span");
        tag.textContent = "<certificate />";

        const title = document.createElement("p");
        title.textContent =
            "No certificates published yet.";

        const description =
            document.createElement("small");

        description.textContent =
            "Owner-managed certificates will appear here.";

        empty.appendChild(tag);
        empty.appendChild(title);
        empty.appendChild(description);

        certificateGrid.appendChild(empty);

        return;
    }

    ownerCertificates.forEach(
        (certificate, index) => {
            const item =
                document.createElement("article");

            item.className = "certificate-item";

            const image =
                document.createElement("img");

            image.src = certificate.src;

            image.alt =
                certificate.title ||
                `Certificate ${index + 1}`;

            image.loading = "lazy";

            item.appendChild(image);
            certificateGrid.appendChild(item);
        }
    );
}

renderCertificates();

/* =========================================================
   RESUME TEMPLATE SYSTEM
========================================================= */

const resumePaper = $("#resumePaper");
const templateButtons = $$(".template-select");
const editorTemplateButtons = $$(".editor-template");

function applyResumeTemplate(templateNumber) {
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

    templateButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.template ===
            String(templateNumber)
        );
    });

    editorTemplateButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.editorTemplate ===
            String(templateNumber)
        );
    });
}

templateButtons.forEach(button => {
    button.addEventListener("click", () => {
        applyResumeTemplate(
            button.dataset.template
        );
    });
});

editorTemplateButtons.forEach(button => {
    button.addEventListener("click", () => {
        applyResumeTemplate(
            button.dataset.editorTemplate
        );
    });
});

applyResumeTemplate(1);

/* =========================================================
   RESUME EDITOR
========================================================= */

const resumeEditor = $("#resumeEditor");
const printResumeButton = $("#printResume");
const closeResumeEditorButton = $("#closeResumeEditor");
const editorPrint = $("#editorPrint");
const editorDownloadPdf = $("#editorDownloadPdf");

function openResumeEditor() {
    if (!resumeEditor) return;

    resumeEditor.classList.add("open");

    resumeEditor.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add("modal-open");
    document.body.dataset.resumeEditorOpen = "true";
}

function closeResumeEditor() {
    if (!resumeEditor) return;

    resumeEditor.classList.remove("open");

    resumeEditor.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove("modal-open");
    document.body.dataset.resumeEditorOpen = "false";
}

if (printResumeButton) {
    printResumeButton.addEventListener(
        "click",
        openResumeEditor
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

const resumePhotoInput = $("#resumePhotoInput");
const resumePhoto = $("#resumePhoto");

if (resumePhoto) {
    resumePhoto.src = state.resumePhoto;
}

if (resumePhotoInput) {
    resumePhotoInput.addEventListener(
        "change",
        event => {
            const file = event.target.files[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                return;
            }

            const reader = new FileReader();

            reader.onload = loadEvent => {
                const source =
                    loadEvent.target.result;

                state.resumePhoto = source;

                localStorage.setItem(
                    "siddharthResumePhoto",
                    source
                );

                if (resumePhoto) {
                    resumePhoto.src = source;
                }

                const miniPhoto =
                    $(".mini-photo img");

                if (miniPhoto) {
                    miniPhoto.src = source;
                }
            };

            reader.readAsDataURL(file);
        }
    );
}

/* =========================================================
   RESUME EDITABLE FIELDS
========================================================= */

const editableResumeFields =
    $$('#resumePaper [contenteditable="true"]');

editableResumeFields.forEach(field => {
    field.addEventListener("focus", () => {
        field.dataset.original = field.innerHTML;
    });

    field.addEventListener("keydown", event => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            if (field.tagName !== "LI") {
                document.execCommand(
                    "insertLineBreak"
                );
            }
        }
    });
});

/* =========================================================
   DOWNLOAD ORIGINAL RESUME PDF
========================================================= */

const downloadResume = $("#downloadResume");

function downloadOriginalResume() {
    const anchor =
        document.createElement("a");

    anchor.href = "assets/resume.pdf";
    anchor.download = "Siddharth-Mishra-Resume.pdf";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
}

if (downloadResume) {
    downloadResume.addEventListener(
        "click",
        () => {
            downloadOriginalResume();

            setTimeout(() => {
                openResumeEditor();
            }, 450);
        }
    );
}

/* =========================================================
   PRINT A4 RESUME
========================================================= */

function printA4Resume() {
    openResumeEditor();

    setTimeout(() => {
        window.print();
    }, 250);
}

if (editorPrint) {
    editorPrint.addEventListener(
        "click",
        printA4Resume
    );
}

/* =========================================================
   EDITOR DOWNLOAD / SAVE AS PDF
========================================================= */

if (editorDownloadPdf) {
    editorDownloadPdf.addEventListener(
        "click",
        () => {
            openResumeEditor();

            setTimeout(() => {
                window.print();
            }, 250);
        }
    );
}

/* =========================================================
   CONTACT INTERACTION
========================================================= */

$$(".contact-link").forEach(link => {
    link.addEventListener("mouseenter", () => {
        link.style.setProperty(
            "--contact-glow",
            "1"
        );
    });

    link.addEventListener("mouseleave", () => {
        link.style.setProperty(
            "--contact-glow",
            "0"
        );
    });
});

/* =========================================================
   HASH NAVIGATION
========================================================= */

window.addEventListener("load", () => {
    if (!window.location.hash) return;

    setTimeout(() => {
        const target =
            document.querySelector(
                window.location.hash
            );

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, 100);
});

/* =========================================================
   RESUME EDITOR CLOSE WITH ESCAPE
========================================================= */

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        resumeEditor &&
        resumeEditor.classList.contains("open")
    ) {
        closeResumeEditor();
    }
});

/* =========================================================
   MOBILE CITY OPTIMIZATION
========================================================= */

function optimizeCityForDevice() {
    const isSmall =
        window.innerWidth < 600;

    const rain = $("#rain");

    if (isSmall && rain) {
        const drops = $$(".raindrop", rain);

        drops.forEach((drop, index) => {
            if (index > 58) {
                drop.remove();
            }
        });
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
        const city = $("#cityBackground");

        if (!city) return;

        if (document.hidden) {
            city.style.animationPlayState = "paused";
        } else {
            city.style.animationPlayState = "running";
            loadRealTimeWeather();
        }
    }
);

/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    `%c SIDDHARTH MISHRA
%c Developer • Builder • Learner
%c Real-time portfolio system initialized.
%c Weather system connected through Open-Meteo.
`,
    "color:#00eaff;font-size:20px;font-weight:bold;",
    "color:#9b5cff;font-size:12px;",
    "color:#47f6a0;font-size:11px;",
    "color:#ffd166;font-size:11px;"
);

/* =========================================================
   FINAL SYSTEM STATUS
========================================================= */

window.SiddharthPortfolio = {
    version: "FINAL-WEATHER",

    technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Python",
        "SQL",
        "Power BI",
        "Git",
        "GitHub",
        "Open-Meteo API"
    ],

    weather: {
        refresh: loadRealTimeWeather,
        current: () => state.weather
    },

    resume: {
        templates: 4,

        currentTemplate: () =>
            state.selectedResumeTemplate,

        open: openResumeEditor,
        close: closeResumeEditor,
        print: printA4Resume
    },

    projects: Object.keys(projectPages),

    status: "ONLINE"
};