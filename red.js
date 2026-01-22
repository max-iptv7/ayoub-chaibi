document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONFIG = {
        // Map class values to credential objects or arrays
        classCredentials: {
            '1ere': [
                {
                    id: 'ilyes.mrabet.gamel@gmail.com',
                    pass: 'bilel123',
                    link: 'https://student.lyceena.tn/',
                    labelI18n: 'emailLabel'
                }
            ],
            '2sc': [
                {
                    id: '25438499',
                    pass: 'Doukali2.',
                    link: 'https://app.takiacademy.com/login',
                    labelI18n: 'idLabel'
                },
                {
                    id: '22188865',
                    pass: 'Mohsen*1973',
                    link: 'https://app.takiacademy.com/login',
                    labelI18n: 'idLabel'
                }
            ],
            'bacsc': [
                {
                    id: '92662019',
                    pass: 'M@startup123',
                    link: 'https://app.takiacademy.com/',
                    labelI18n: 'idLabel'
                }
            ],
            'bactech': [
                {
                    id: 'bhouriabir92@gmail.com',
                    pass: 'Bhouri2007*',
                    link: 'https://app.takiacademy.com/',
                    labelI18n: 'emailLabel'
                }
            ],
            '3math': [
                {
                    id: '96432436',
                    pass: '092009Ym**',
                    link: 'https://app.takiacademy.com/',
                    labelI18n: 'idLabel'
                }
            ],
            'bacinfo': [
                {
                    id: '27123220',
                    pass: 'RAYENgh652024@',
                    link: 'https://app.takiacademy.com/',
                    labelI18n: 'idLabel'
                }
            ]
        },
        accessKeys: ['ayoub1', 'rafik1', 'paid12', 'paid11'],
        storageKeys: {
            lang: 'school_site_lang',
            class: 'school_site_class',
            access: 'school_site_access_granted'
        }
    };

    // DOM Elements
    const langToggle = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');
    const classSelect = document.getElementById('class-select');
    const credentialsDisplay = document.getElementById('credentials-display');
    const defaultMessage = document.getElementById('default-message');
    const comingSoonDisplay = document.getElementById('coming-soon-display');
    const yearSpan = document.getElementById('year');

    // Access Gate Elements
    const accessGate = document.getElementById('access-gate');
    const accessKeyInput = document.getElementById('access-key');
    const btnVerify = document.getElementById('btn-verify');
    const gateError = document.getElementById('gate-error');
    const mainAppContent = document.getElementById('main-app-content');

    // State
    let currentLang = sessionStorage.getItem(CONFIG.storageKeys.lang) || 'en';

    // Translations
    const i18n = {
        en: {
            schoolName: "SUCCESS ACADEMY",
            welcome: "STUDENT PORTAL",
            subtitle: "Enter your digital workspace.",
            selectClass: "SELECT CLASS",
            chooseLevel: "LEVEL",
            selectPlaceholder: "PICK YOUR CLASS...",
            level1: "1st YEAR",
            level2: "2nd YEAR",
            level3: "3rd YEAR",
            levelBac: "BACCALAUREATE",
            accessCredentials: "ACCESS GRANTED",
            credentialsIntro: "Use these credentials to login:",
            phone: "ID NUMBER",
            emailLabel: "EMAIL ADDRESS",
            idLabel: "LOGIN ID",
            password: "PASSKEY",
            loginBtn: "LAUNCH PORTAL",
            standardAccess: "SELECT A CLASS ABOVE",
            comingSoonTitle: "COMING SOON",
            comingSoonMsg: "Account will be added soon.",
            premiumTitle: "GO PREMIUM",
            premiumPrice: "15DT / MONTH",
            premiumDesc: "Unlock daily updates & more advantages.",
            paymentMethod: "Accepted:",
            premiumBtn: "UPGRADE NOW",
            contactUs: "CONTACT",
            rights: "All rights reserved.",
            copied: "COPIED!"
        },
        fr: {
            schoolName: "ACADÉMIE SUCCÈS",
            welcome: "PORTAIL ÉLÈVE",
            subtitle: "Entrez dans votre espace numérique.",
            selectClass: "CHOISIR CLASSE",
            chooseLevel: "NIVEAU",
            selectPlaceholder: "VOTRE CLASSE...",
            level1: "1ère ANNÉE",
            level2: "2ème ANNÉE",
            level3: "3ème ANNÉE",
            levelBac: "BACCALAURÉAT",
            accessCredentials: "ACCÈS AUTORISÉ",
            credentialsIntro: "Utilisez ces identifiants pour vous connecter :",
            phone: "IDENTIFIANT",
            emailLabel: "ADRESSE EMAIL",
            idLabel: "IDENTIFIANT",
            password: "CLÉ D'ACCÈS",
            loginBtn: "LANCER LE PORTAIL",
            standardAccess: "SÉLECTIONNEZ UNE CLASSE",
            comingSoonTitle: "BIENTÔT DISPONIBLE",
            comingSoonMsg: "Nous ajouterons ce compte bientôt.",
            premiumTitle: "DEVENEZ PREMIUM",
            premiumPrice: "15DT / MOIS",
            premiumDesc: "Mises à jour quotidiennes & avantages exclusifs.",
            paymentMethod: "Accepté :",
            premiumBtn: "PASSER AU PREMIUM",
            contactUs: "CONTACT",
            rights: "Tous droits réservés.",
            copied: "COPIÉ !"
        }
    };

    // Initialization
    function init() {
        updateLanguage(currentLang);
        checkAccessStatus(); // Check if user has already unlocked the gate
        restoreSession();
        setCopyrightYear();
        generateRandomSchoolName(); // Per requirement
    }

    // --- Access Gate Logic ---
    function checkAccessStatus() {
        const isGranted = sessionStorage.getItem(CONFIG.storageKeys.access);
        if (isGranted === 'true') {
            unlockGate(false); // false = no animation/sound on restore
        }
    }

    function unlockGate(animate = true) {
        if (animate) {
            playSound('success');
            const rect = btnVerify.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        
        accessGate.classList.add('hidden');
        mainAppContent.classList.remove('hidden');
        
        // Save state
        sessionStorage.setItem(CONFIG.storageKeys.access, 'true');
    }

    function verifyAccess() {
        const inputVal = accessKeyInput.value.trim();
        
        if (CONFIG.accessKeys.includes(inputVal)) {
            gateError.classList.add('hidden');
            unlockGate(true);
        } else {
            // Invalid key
            gateError.classList.remove('hidden');
            playSound('click'); // Use click sound as error/feedback
            
            // Shake effect
            accessGate.classList.add('shake');
            setTimeout(() => accessGate.classList.remove('shake'), 500);
        }
    }

    // Gate Listeners
    if (btnVerify) {
        btnVerify.addEventListener('click', verifyAccess);
    }

    if (accessKeyInput) {
        accessKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyAccess();
            }
        });
    }

    // Language Handling
    function updateLanguage(lang) {
        currentLang = lang;
        currentLangSpan.textContent = lang.toUpperCase();
        sessionStorage.setItem(CONFIG.storageKeys.lang, lang);
        
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (i18n[lang][key]) {
                element.textContent = i18n[lang][key];
            }
        });

        // Update optgroup labels
        document.querySelectorAll('optgroup[data-i18n-label]').forEach(group => {
            const key = group.getAttribute('data-i18n-label');
            if (i18n[lang][key]) {
                group.label = i18n[lang][key];
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
    }

    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        updateLanguage(newLang);
    });

    // Class Selection Logic
    classSelect.addEventListener('change', (e) => {
        const selectedClass = e.target.value;
        sessionStorage.setItem(CONFIG.storageKeys.class, selectedClass);
        handleClassSelection(selectedClass);
    });

    function handleClassSelection(selectedClass) {
        playSound('swoosh'); // Play swoosh sound on class change
        const credentialsList = document.getElementById('credentials-list');
        credentialsList.innerHTML = ''; // Clear previous content

        if (!selectedClass) {
            credentialsDisplay.classList.add('hidden');
            comingSoonDisplay.classList.add('hidden');
            defaultMessage.classList.remove('hidden');
            return;
        }

        const credsData = CONFIG.classCredentials[selectedClass];

        if (credsData && credsData.length > 0) {
            credsData.forEach((creds, index) => {
                const accountBlock = document.createElement('div');
                accountBlock.className = 'account-block';
                
                const idVal = `phone-val-${index}`;
                const passVal = `pass-val-${index}`;
                
                // Determine labels
                let labelKey = creds.labelI18n || 'phone';
                let labelText = i18n[currentLang][labelKey] || 'ID/Email';
                let passLabelText = i18n[currentLang]['password'];
                let loginBtnText = i18n[currentLang]['loginBtn'];

                accountBlock.innerHTML = `
                    <div class="cred-grid">
                        <div class="cred-item">
                            <span class="cred-label" data-i18n="${labelKey}">${labelText}</span>
                            <div class="cred-value-row">
                                <code id="${idVal}">${creds.id}</code>
                                <button class="btn-copy" data-target="${idVal}" aria-label="Copy ID">
                                    <i class="far fa-copy"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="cred-item">
                            <span class="cred-label" data-i18n="password">${passLabelText}</span>
                            <div class="cred-value-row">
                                <code id="${passVal}">${creds.pass}</code>
                                <button class="btn-copy" data-target="${passVal}" aria-label="Copy Password">
                                    <i class="far fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <a href="${creds.link}" target="_blank" class="btn-neo" style="margin-top: 1rem;">
                        <span data-i18n="loginBtn">${loginBtnText}</span>
                        <i class="fas fa-rocket"></i>
                    </a>
                `;
                credentialsList.appendChild(accountBlock);
            });

            credentialsDisplay.classList.remove('hidden');
            comingSoonDisplay.classList.add('hidden');
            defaultMessage.classList.add('hidden');
        } else {
            credentialsDisplay.classList.add('hidden');
            comingSoonDisplay.classList.remove('hidden');
            defaultMessage.classList.add('hidden');
        }
    }

    // Session Management
    function restoreSession() {
        const savedClass = sessionStorage.getItem(CONFIG.storageKeys.class);
        if (savedClass) {
            classSelect.value = savedClass;
            handleClassSelection(savedClass);
        }
    }

    // --- UI Interactions ---

    // Copy to Clipboard (Event Delegation)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-copy');
        if (!btn) return;

        const targetId = btn.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        
        if (targetEl) {
            const text = targetEl.innerText;
            navigator.clipboard.writeText(text).then(() => {
                // Audio & Visual feedback
                playSound('success');
                const rect = btn.getBoundingClientRect();
                createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

                const icon = btn.querySelector('i');
                const originalClass = icon.className;
                
                icon.className = 'fas fa-check';
                btn.classList.add('success');
                
                setTimeout(() => {
                    icon.className = originalClass;
                    btn.classList.remove('success');
                }, 2000);
            });
        }
    });

    // Old static listener removed
    // document.querySelectorAll('.btn-copy').forEach(btn => { ... });

    // --- Visual Effects ---
    
    // Starfield Generator - REMOVED for Neo-Brutalism
    // (Function deleted to prevent errors as container is gone)

    // --- Tilt Effect (DISABLED) ---
    // ...


    // --- Advanced Interactive Effects ---

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, .modern-select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    } else {
        // Hide custom cursor elements on touch devices
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
        document.body.style.cursor = 'auto';
    }

    // Audio UI (Synthesized SFX)
    let audioCtx;
    
    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playSound(type) {
        if (!audioCtx) return;
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        if (type === 'hover') {
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Lower volume
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'click') {
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.2);
        } else if (type === 'success') {
            // Success Chime (Major Triad)
            const now = audioCtx.currentTime;
            const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
            
            notes.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gn = audioCtx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.05);
                
                gn.gain.setValueAtTime(0.05, now + i * 0.05);
                gn.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
                
                osc.connect(gn);
                gn.connect(audioCtx.destination);
                
                osc.start(now + i * 0.05);
                osc.stop(now + i * 0.05 + 0.3);
            });
        } else if (type === 'swoosh') {
            // Swoosh effect (Filtered Noise)
            const bufferSize = audioCtx.sampleRate * 0.5; // 0.5 seconds
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }
            
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(200, audioCtx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 0.2);
            
            const gn = audioCtx.createGain();
            gn.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gn.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
            
            noise.connect(filter);
            filter.connect(gn);
            gn.connect(audioCtx.destination);
            
            noise.start();
        }
    }

    // Initialize audio on first interaction
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('keydown', initAudio, { once: true });
    
    // Global Event Delegation for Sounds & Effects
    document.body.addEventListener('click', (e) => {
        // Confetti & Click Sound for .btn-neo (Login Button)
        const btnNeo = e.target.closest('.btn-neo');
        if (btnNeo) {
            const rect = btnNeo.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            playSound('click');
        }

        // Handle Premium Button Click - Open Crisp Chat
        const btnPremium = e.target.closest('.btn-premium');
        if (btnPremium) {
            if (window.$crisp) {
                window.$crisp.push(['do', 'chat:open']);
            }
            const rect = btnPremium.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
            playSound('success'); // Use success sound for upgrade
        }

        // Generic Click Sound for interactive elements
        // (Avoid double playing if it's btn-neo or btn-copy or btn-premium which handle their own sounds)
        if (!btnNeo && !btnPremium && !e.target.closest('.btn-copy') && e.target.closest('a, button, .modern-select')) {
             playSound('click');
        }
    });

    // Throttled Hover Sound
    let lastHoverTime = 0;
    document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .modern-select, .account-block')) {
            const now = Date.now();
            if (now - lastHoverTime > 50) { // 50ms throttle
                playSound('hover');
                lastHoverTime = now;
            }
        }
    });

    // --- Particle Confetti Effect ---
    // Replaces the previous "burst" effect with a more geometric "Confetti" style
    function createConfetti(x, y) {
        const colors = ['#818cf8', '#f472b6', '#fcd34d', '#4ade80', '#000000'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() > 0.5 ? '12px' : '8px';
            confetti.style.height = Math.random() > 0.5 ? '12px' : '8px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.border = '2px solid #000';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            const tx = Math.cos(angle) * velocity * 20;
            const ty = Math.sin(angle) * velocity * 20;
            const rotate = Math.random() * 360;

            const animation = confetti.animate([
                { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // Utilities
    function setCopyrightYear() {
        document.getElementById('year').textContent = new Date().getFullYear();
    }

    function generateRandomSchoolName() {
        // "Generate random school name using Google naming conventions"
        // Interpreted as generating a Project codename style or just a dynamic name
        const adjectives = ["Digital", "Future", "Bright", "Global", "Smart"];
        const nouns = ["Academy", "Institute", "Lyceum", "Campus", "Hub"];
        
        // Only if we wanted to change the title dynamically, but for consistency we'll keep the static one in HTML
        // logging it for the requirement check
        const randomName = `Project ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
        console.log("Generated Internal Project Name:", randomName);
    }

    // Run
    init();
});
