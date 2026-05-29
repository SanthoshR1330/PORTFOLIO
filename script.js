/* ==========================================================================
   GALAXY PORTFOLIO CORE CONTROLLER - SANTHOSH R
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Elements
    const loaderOverlay = document.getElementById("loader-overlay");
    const loadProgress = document.getElementById("load-progress");
    const loaderStatus = document.getElementById("loader-status");
    
    const customCursor = document.getElementById("custom-cursor");
    const cursorFollower = document.getElementById("cursor-follower");
    
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    const scrollProgressBar = document.getElementById("scroll-progress-bar");
    const telemetryTime = document.getElementById("telemetry-time");
    
    const soundToggle = document.getElementById("sound-toggle");
    const soundIcon = document.getElementById("sound-icon");

    /* ==========================================
       1. UNIVERSAL LOADING SCREEN SEQUENCER
       ========================================== */
    let loadPercent = 0;
    const bootSteps = [
        "Aligning layout components...",
        "Calibrating neural engines...",
        "Initiating visual matrices...",
        "Establishing contact channels...",
        "Portfolio configuration complete."
    ];

    const loadInterval = setInterval(() => {
        loadPercent += Math.floor(Math.random() * 8) + 2;
        if (loadPercent >= 100) {
            loadPercent = 100;
            clearInterval(loadInterval);
            
            // Fade out loader
            setTimeout(() => {
                loaderOverlay.classList.add("fade-out");
                initializeAnimations();
            }, 500);
        }
        
        loadProgress.style.width = `${loadPercent}%`;
        const stepIndex = Math.min(Math.floor(loadPercent / 20), bootSteps.length - 1);
        loaderStatus.textContent = `${bootSteps[stepIndex]} ${loadPercent}%`;
    }, 45);


    /* ==========================================
       2. RECONCILE STYLING ANIMATIONS & LIBRARIES
       ========================================== */
    function initializeAnimations() {
        // Initialize AOS (Animate on Scroll)
        if (window.AOS) {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 120,
                easing: 'ease-out-cubic'
            });
        }

        // Initialize Typed.js for Hero Section
        if (window.Typed) {
            new Typed("#typed-text", {
                strings: [
                    "AI & Data Science Student",
                    "Full Stack Developer",
                    "Flutter Developer",
                    "AI Enthusiast"
                ],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 2000,
                loop: true,
                cursorChar: '|'
            });
        }

        // Initialize VanillaTilt for Skills & Projects
        if (window.VanillaTilt) {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.25,
                scale: 1.05
            });
        }

        // Check if particles.js is loaded, else draw fallback stars
        initializeParticles();
    }

    /* ==========================================
       3. INTERACTIVE STARS & PARTICLES INJECTOR
       ========================================== */
    function initializeParticles() {
        // Inject script tag dynamically for particles.js as dynamic loading failsafe
        const pScript = document.createElement("script");
        pScript.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
        pScript.onload = () => {
            if (window.particlesJS) {
                particlesJS("particles-js", {
                    "particles": {
                        "number": { "value": 110, "density": { "enable": true, "value_area": 850 } },
                        "color": { "value": ["#00f2fe", "#9d4edd", "#ff007f", "#ffffff"] },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.45, "random": true, "anim": { "enable": true, "speed": 0.8, "opacity_min": 0.1, "sync": false } },
                        "size": { "value": 2.5, "random": true, "anim": { "enable": true, "speed": 1.2, "size_min": 0.1, "sync": false } },
                        "line_linked": { "enable": true, "distance": 110, "color": "#00f2fe", "opacity": 0.08, "width": 1 },
                        "move": { "enable": true, "speed": 0.8, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
                    },
                    "interactivity": {
                        "detect_on": "window",
                        "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                        "modes": { "bubble": { "distance": 130, "size": 4.5, "duration": 2, "opacity": 0.7, "speed": 3 }, "push": { "particles_nb": 4 } }
                    },
                    "retina_detect": true
                });
            }
        };
        pScript.onerror = () => {
            // Stars drawing fallback (if CDN blocked/offline)
            createLocalStarfieldFallback();
        };
        document.head.appendChild(pScript);
    }

    function createLocalStarfieldFallback() {
        const spaceContainer = document.getElementById("particles-js");
        if (!spaceContainer) return;
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        spaceContainer.appendChild(canvas);
        const ctx = canvas.getContext("2d");
        
        let stars = [];
        const numStars = 100;
        
        function resize() {
            canvas.width = spaceContainer.offsetWidth;
            canvas.height = spaceContainer.offsetHeight;
        }
        resize();
        window.addEventListener("resize", resize);
        
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2,
                opacity: Math.random(),
                speed: Math.random() * 0.02
            });
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0) {
                    star.speed = -star.speed;
                }
            });
            requestAnimationFrame(draw);
        }
        draw();
    }

    /* ==========================================
       4. HIGH-TECH METEOR CANVAS RENDERER
       ========================================== */
    const meteorCanvas = document.getElementById("meteor-canvas");
    const mCtx = meteorCanvas.getContext("2d");
    let meteors = [];

    function resizeMeteors() {
        meteorCanvas.width = window.innerWidth;
        meteorCanvas.height = window.innerHeight;
    }
    resizeMeteors();
    window.addEventListener("resize", resizeMeteors);

    class Meteor {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * meteorCanvas.width * 1.5;
            this.y = -50;
            this.length = Math.random() * 80 + 40;
            this.speed = Math.random() * 8 + 4;
            this.thickness = Math.random() * 2 + 0.5;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.color = Math.random() > 0.5 ? "#00f2fe" : "#ff007f";
        }

        draw() {
            mCtx.strokeStyle = this.color;
            mCtx.lineWidth = this.thickness;
            mCtx.globalAlpha = this.alpha;
            mCtx.beginPath();
            mCtx.moveTo(this.x, this.y);
            mCtx.lineTo(this.x - this.length, this.y + this.length);
            mCtx.stroke();
        }

        update() {
            this.x -= this.speed;
            this.y += this.speed;

            if (this.y > meteorCanvas.height || this.x < -100) {
                this.reset();
            }
        }
    }

    // Generate Initial Meteors
    for (let i = 0; i < 4; i++) {
        meteors.push(new Meteor());
    }

    function renderMeteors() {
        mCtx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
        meteors.forEach(meteor => {
            meteor.update();
            meteor.draw();
        });
        requestAnimationFrame(renderMeteors);
    }
    renderMeteors();

    /* ==========================================
       5. CUSTOM GLOWING CURSOR WITH DAMPING
       ========================================== */
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dynamic cursor follow position
        if (customCursor) {
            customCursor.style.left = `${mouseX}px`;
            customCursor.style.top = `${mouseY}px`;
        }
    });

    function updateFollower() {
        // Linear interpolation for smooth lag follower
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        if (cursorFollower) {
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
        }

        requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Hover effects on links & buttons
    const interactiveElements = document.querySelectorAll("a, button, .skill-card, .project-card");
    interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", () => {
            if (cursorFollower) {
                cursorFollower.style.transform = "translate(-50%, -50%) scale(1.6)";
                cursorFollower.style.borderColor = "var(--neon-cyan)";
            }
        });
        el.addEventListener("mouseleave", () => {
            if (cursorFollower) {
                cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
                cursorFollower.style.borderColor = "var(--neon-pink)";
            }
        });
    });

    /* Mouse follow Nebula shift */
    const nebulaOverlay = document.getElementById("nebula-overlay");
    window.addEventListener("mousemove", (e) => {
        const xOffset = (e.clientX - window.innerWidth / 2) * 0.05;
        const yOffset = (e.clientY - window.innerHeight / 2) * 0.05;
        if (nebulaOverlay) {
            nebulaOverlay.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }
    });

    /* Galaxy Particle click explosion */
    window.addEventListener("click", (e) => {
        createClickStars(e.clientX, e.clientY);
    });

    function createClickStars(x, y) {
        for (let i = 0; i < 8; i++) {
            const star = document.createElement("div");
            star.className = "star-spark";
            star.style.left = `${x}px`;
            star.style.top = `${y}px`;
            
            // Random direction variables
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 60 + 20;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            star.style.setProperty("--tx", `${tx}px`);
            star.style.setProperty("--ty", `${ty}px`);
            
            // Color variations
            const colors = ["#00f2fe", "#ff007f", "#9d4edd", "#ffffff"];
            star.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(star);
            
            // Remove after animation finished
            setTimeout(() => {
                star.remove();
            }, 800);
        }
    }

    /* ==========================================
       6. THEME SWAP CONTROLLER (DARK / LIGHT GALAXY)
       ========================================== */
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        let targetTheme = "dark";

        if (!currentTheme || currentTheme === "dark") {
            targetTheme = "light";
            themeIcon.className = "fas fa-sun";
        } else {
            targetTheme = "dark";
            themeIcon.className = "fas fa-moon";
        }

        document.documentElement.setAttribute("data-theme", targetTheme);
    });

    /* ==========================================
       7. MOBILE NAVIGATION OVERLAYS
       ========================================== */
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = mobileToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
            icon.className = "fas fa-times";
        } else {
            icon.className = "fas fa-bars";
        }
    });

    // Close mobile menu on menu link click
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = mobileToggle.querySelector("i");
            if (icon) icon.className = "fas fa-bars";
        });
    });

    /* ==========================================
       8. SCROLL AGENT: SPY & NAV INDICATOR
       ========================================== */
    window.addEventListener("scroll", () => {
        // Scroll Progress Bar Update
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgressBar.style.width = `${scrolled}%`;

        // Active Link Spy
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".nav-link");
        
        let currentSectionId = "";
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (winScroll >= secTop) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });

        // Trigger Achievement counters on scroll-into-view
        const achievementsSec = document.getElementById("achievements");
        if (achievementsSec) {
            const rect = achievementsSec.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 100 && rect.bottom >= 0) {
                triggerCounters();
            }
        }
    });

    /* ==========================================
       9. ADVANCED GRAPH & PROJECT MODAL LOADER
       ========================================== */
    const projectsData = {
        inex: {
            title: "INEX AI Expense Tracker",
            subtitle: "FinTech Analysis & Prediction System",
            description: "INEX acts as an automated tracking system for personal expenses. Utilizing custom OCR models, it scans images of transactional receipts and extracts text variables. A light prediction system runs a classification model in Python to catalog budget metrics.",
            architecture: "Python / FastAPI Backend, OCR Tesseract Parser, Scikit-learn Classifier, ChartJS charts.",
            metrics: ["OCR Speed: <1.2s", "Category Precision: 94%"],
            icon: "fas fa-piggy-bank",
            theme: "cyan"
        },
        roomrev: {
            title: "Room Revenue Revolution",
            subtitle: "Business Intelligence Dashboard for Occupancy Statistics",
            description: "A state-of-the-art hospitality dashboard designed to model and improve hotel occupancy metrics. By running analytics computations via Python dashboards, it tracks revenue anomalies and displays seasonal occupancy indicators using professional datasets.",
            architecture: "IBM Cognos Analytics, MySQL backend, Python Dash UI panel, Regression prediction models.",
            metrics: ["Revenue Boost: +34%", "Anomalies Checked: 99.8%"],
            icon: "fas fa-chart-line",
            theme: "purple"
        },
        interview360: {
            title: "Interview 360",
            subtitle: "Automated Interview Simulator with Stress Analysis",
            description: "A comprehensive preparation platform simulating rigorous interview modules. It loads user transcripts, feeds details to LLM routers, formats customized technical questionnaires, and evaluates voice frequency sweeps to detect emotional stress metrics.",
            architecture: "Flutter client frontend, WebRTC session endpoints, Whisper API transcription, sentiment matrices.",
            metrics: ["AI Sentiment Accuracy: 89%", "Response Processing: 800ms"],
            icon: "fas fa-microphone-lines",
            theme: "pink"
        }
    };

    const projectModal = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalBodyContent = document.getElementById("modal-body-content");

    document.querySelectorAll(".open-modal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const projectKey = btn.getAttribute("data-project");
            const data = projectsData[projectKey];
            if (!data) return;

            // Generate content HTML
            modalBodyContent.innerHTML = `
                <div class="modal-media">
                    <div style="font-size: 5rem; color: var(--neon-${data.theme}); text-shadow: var(--glow-shadow-${data.theme});">
                        <i class="${data.icon}"></i>
                    </div>
                </div>
                <div class="modal-details">
                    <div class="badge-tag ${data.theme}-badge">${data.subtitle}</div>
                    <h3 class="font-neon">${data.title}</h3>
                    <p>${data.description}</p>
                    <div style="margin-bottom: 16px;">
                        <strong>Technology stack:</strong> ${data.architecture}
                    </div>
                    <div class="modal-stats">
                        <div class="m-stat" style="border-left-color: var(--neon-${data.theme});">
                            <span>METRIC 1</span>
                            <strong>${data.metrics[0]}</strong>
                        </div>
                        <div class="m-stat" style="border-left-color: var(--neon-${data.theme});">
                            <span>METRIC 2</span>
                            <strong>${data.metrics[1]}</strong>
                        </div>
                    </div>
                </div>
            `;
            
            projectModal.classList.add("active");
        });
    });

    modalCloseBtn.addEventListener("click", () => {
        projectModal.classList.remove("active");
    });

    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove("active");
        }
    });

    /* ==========================================
       10. VIEWPORT COUNTERS TRIGGERS
       ========================================== */
    let countersActive = false;
    function triggerCounters() {
        if (countersActive) return;
        countersActive = true;
        
        document.querySelectorAll(".counter-number").forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const updateCount = () => {
                const count = +counter.innerText;
                const increment = Math.ceil(target / 40);
                if (count < target) {
                    counter.innerText = Math.min(count + increment, target);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    }

    /* ==========================================
       11. WEB AUDIO API: COSMIC SPACE DRONE SYNTH
       ========================================== */
    let audioCtx = null;
    let ambientOsc1 = null;
    let ambientOsc2 = null;
    let ambientGain = null;
    let soundRunning = false;

    soundToggle.addEventListener("click", () => {
        if (!soundRunning) {
            startCosmicDrone();
        } else {
            stopCosmicDrone();
        }
    });

    function startCosmicDrone() {
        try {
            // Web Audio Initialization
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
            
            // Gain node to control volume safely
            ambientGain = audioCtx.createGain();
            ambientGain.gain.setValueAtTime(0.04, audioCtx.currentTime); // Low volume ambient sound

            // Base Low-Pitch Oscillator
            ambientOsc1 = audioCtx.createOscillator();
            ambientOsc1.type = "sawtooth";
            ambientOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 note
            
            // Failsafe Filter node to make it sound atmospheric (muffle high frequencies)
            const lowpass = audioCtx.createBiquadFilter();
            lowpass.type = "lowpass";
            lowpass.frequency.setValueAtTime(250, audioCtx.currentTime);

            // Modulating LFO for filter sweep
            const lfo = audioCtx.createOscillator();
            lfo.frequency.setValueAtTime(0.05, audioCtx.currentTime); // very slow cycle (20s)
            
            const lfoGain = audioCtx.createGain();
            lfoGain.gain.setValueAtTime(100, audioCtx.currentTime); // range sweep

            // Connect LFO modulation
            lfo.connect(lfoGain);
            lfoGain.connect(lowpass.frequency);

            // Second Oscillator for harmonic richness
            ambientOsc2 = audioCtx.createOscillator();
            ambientOsc2.type = "triangle";
            ambientOsc2.frequency.setValueAtTime(110.3, audioCtx.currentTime); // A2 slight detune

            // Connect lines
            ambientOsc1.connect(lowpass);
            ambientOsc2.connect(lowpass);
            lowpass.connect(ambientGain);
            ambientGain.connect(audioCtx.destination);

            // Start notes
            ambientOsc1.start();
            ambientOsc2.start();
            lfo.start();
            
            soundRunning = true;
            soundIcon.className = "fas fa-volume-up";
            soundToggle.classList.add("btn-glow-cyan");
        } catch (e) {
            console.error("Audio Context initialization failed: ", e);
        }
    }

    function stopCosmicDrone() {
        if (ambientOsc1) {
            ambientOsc1.stop();
            ambientOsc1.disconnect();
        }
        if (ambientOsc2) {
            ambientOsc2.stop();
            ambientOsc2.disconnect();
        }
        if (audioCtx) {
            audioCtx.close();
        }
        soundRunning = false;
        soundIcon.className = "fas fa-volume-mute";
        soundToggle.classList.remove("btn-glow-cyan");
    }

    /* ==========================================
       12. INTERACTIVE AI ASSISTANT CHATBOT
       ========================================== */
    const aiAssistantBtn = document.getElementById("ai-assistant-btn");
    const aiChatPanel = document.getElementById("ai-chat-panel");
    const aiPanelClose = document.getElementById("ai-panel-close");
    const aiSendBtn = document.getElementById("ai-send-btn");
    const aiInput = document.getElementById("ai-input");
    const aiChatMessages = document.getElementById("ai-chat-messages");

    aiAssistantBtn.addEventListener("click", () => {
        aiChatPanel.classList.toggle("active");
    });

    aiPanelClose.addEventListener("click", () => {
        aiChatPanel.classList.remove("active");
    });

    aiSendBtn.addEventListener("click", sendUserMessage);
    aiInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendUserMessage();
    });

    function sendUserMessage() {
        const text = aiInput.value.trim();
        if (!text) return;

        // Display user query
        appendChatMessage(text, "user-message");
        aiInput.value = "";

        // Evaluate AI response delay
        setTimeout(() => {
            const aiResponse = computeAIResponse(text.toLowerCase());
            appendChatMessage(aiResponse, "ai-message");
        }, 600);
    }

    function appendChatMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${className}`;
        messageDiv.innerHTML = text;
        aiChatMessages.appendChild(messageDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function computeAIResponse(input) {
        // Keyword parsing rules
        if (input.includes("project") || input.includes("inex") || input.includes("360")) {
            return "Santhosh has developed several core projects: <strong>INEX</strong> (AI expense model with OCR scanning), <strong>Room Revenue Revolution</strong> (hospitality occupancy optimization dashboard), and <strong>Interview 360</strong> (interview preparation app). Which details would you like to explore?";
        }
        if (input.includes("skill") || input.includes("code") || input.includes("python")) {
            return "Skills list includes: <strong>Flutter, Python, JavaScript, Java, MongoDB, FastAPI</strong>, and <strong>IBM Cognos BI</strong>. He excels at integrating frontend designs with intelligent backend logic.";
        }
        if (input.includes("contact") || input.includes("hire") || input.includes("email")) {
            return "You can get in touch via the <strong>Contact Section</strong>, email him at <a href='mailto:santhosh.ai.dev@gmail.com' style='color: var(--neon-cyan);'>santhosh.ai.dev@gmail.com</a>, or check his LinkedIn profile.";
        }
        if (input.includes("education") || input.includes("college") || input.includes("study")) {
            return "Santhosh is studying Artificial Intelligence & Data Science at <strong>M. Kumarasamy College of Engineering</strong>, maintaining an excellent academic record.";
        }
        if (input.includes("about") || input.includes("santhosh")) {
            return "Santhosh R is an AI developer and builder who transforms complex logic into responsive web and mobile applications.";
        }
        return "Command not recognized. Please try asking about: <strong>'projects'</strong>, <strong>'skills'</strong>, <strong>'education'</strong>, or <strong>'contact'</strong>.";
    }

    /* Astronaut Chat Trigger */
    const astroChatBubble = document.getElementById("astro-chat-bubble");
    const floatingAstronaut = document.getElementById("floating-astronaut");
    let astroPhrases = [
        "System stability at 100%. Portfolio components loaded successfully.",
        "New items added in the Achievements sector!",
        "Double-click to return to top of portfolio!",
        "Message incoming! Routing query details..."
    ];

    floatingAstronaut.addEventListener("click", () => {
        const randomPhrase = astroPhrases[Math.floor(Math.random() * astroPhrases.length)];
        astroChatBubble.textContent = randomPhrase;
        astroChatBubble.style.opacity = 1;
        astroChatBubble.style.visibility = "visible";
        setTimeout(() => {
            astroChatBubble.style.opacity = 0;
            astroChatBubble.style.visibility = "hidden";
        }, 3500);
    });

    /* ==========================================
       13. TELEMETRY CLOCK CONTROLLER
       ========================================== */
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getUTCHours()).padStart(2, '0');
        const mins = String(now.getUTCMinutes()).padStart(2, '0');
        const secs = String(now.getUTCSeconds()).padStart(2, '0');
        telemetryTime.textContent = `${hrs}:${mins}:${secs} UTC`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    /* ==========================================
       14. CONTACT FORM SIGNAL TRANSMISSION
       ========================================== */
    const contactForm = document.getElementById("galaxy-contact-form");
    const formFeedback = document.getElementById("form-feedback-message");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const btn = document.getElementById("send-form-btn");
        const originHTML = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending...`;
        btn.disabled = true;

        // Simulate secure database submission delay
        setTimeout(() => {
            btn.innerHTML = originHTML;
            btn.disabled = false;
            
            formFeedback.textContent = "MESSAGE SENT SUCCESSFULLY! I WILL GET BACK TO YOU SOON.";
            formFeedback.style.color = "var(--neon-cyan)";
            
            contactForm.reset();
            
            // Remove notification after delay
            setTimeout(() => {
                formFeedback.textContent = "";
            }, 6000);
        }, 1500);
    });

});
