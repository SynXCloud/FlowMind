
        document.addEventListener('DOMContentLoaded', () => {
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;
            
            // Load saved theme
            const savedTheme = localStorage.getItem('flowmind-theme') || 'dark';
            html.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('flowmind-theme', newTheme);
                updateThemeIcon(newTheme);
            });

            function updateThemeIcon(theme) {
                const icon = themeToggle.querySelector('i');
                if (theme === 'dark') {
                    icon.className = 'fas fa-sun';
                } else {
                    icon.className = 'fas fa-moon';
                }
            }

            // Scroll Progress & Navbar Blur
            const progressBar = document.getElementById('progressBar');
            const navbar = document.getElementById('navbar');

            window.addEventListener('scroll', () => {
                // Progress Bar
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';

                // Navbar sticky style
                if (winScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // Mobile Menu
            const mobileBtn = document.getElementById('mobileBtn');
            const closeMobileBtn = document.getElementById('closeMobileBtn');
            const mobileMenu = document.getElementById('mobileMenu');

            mobileBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
            closeMobileBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));

            // Typewriter Effect
            const phrases = [
                "AI that writes your meeting notes.",
                "Tasks that assign themselves.",
                "Docs that update in real time.",
                "Analytics that predict, not report."
            ];
            let phraseIndex = 0;
            let letterIndex = 0;
            let currentText = "";
            let isDeleting = false;
            const typewriterEl = document.getElementById('typewriter');

            function type() {
                const currentPhrase = phrases[phraseIndex];
                
                if (isDeleting) {
                    currentText = currentPhrase.substring(0, letterIndex - 1);
                    letterIndex--;
                } else {
                    currentText = currentPhrase.substring(0, letterIndex + 1);
                    letterIndex++;
                }
                
                typewriterEl.innerHTML = currentText + '<span style="border-right: 2px solid var(--primary); animation: blink 1s infinite;">&nbsp;</span>';

                let typeSpeed = isDeleting ? 30 : 80;

                if (!isDeleting && letterIndex === currentPhrase.length) {
                    typeSpeed = 2000; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && letterIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typeSpeed = 500; // Pause before new word
                }

                setTimeout(type, typeSpeed);
            }
            setTimeout(type, 1000);

            // Live Activity Ticker
            const tickerTexts = [
                "🚀 Riya from Bangalore just started a free trial",
                "💳 Team at DesignCo upgraded to Pro",
                "⭐ Marcus left a 5-star review",
                "📋 Sarah's team completed 47 tasks today",
                "🔥 124 teams joined FlowMind today"
            ];
            const tickerEl = document.getElementById('ticker-text');
            let tickerIndex = 0;

            setInterval(() => {
                tickerEl.style.opacity = 0;
                setTimeout(() => {
                    tickerIndex = (tickerIndex + 1) % tickerTexts.length;
                    tickerEl.textContent = tickerTexts[tickerIndex];
                    tickerEl.style.opacity = 1;
                }, 300);
            }, 4000);
            tickerEl.style.transition = "opacity 0.3s";

            // Mockup Animation Loop
            const kCard1 = document.getElementById('k-card-1');
            setInterval(() => {
                kCard1.style.transform = 'translateY(150px) translateX(150px)';
                kCard1.style.opacity = '0';
                setTimeout(() => {
                    kCard1.style.transform = 'translateY(0) translateX(0)';
                    kCard1.style.opacity = '1';
                }, 3000);
            }, 8000);
            kCard1.style.transition = "all 0.5s ease";

            // Scroll Reveal Animation (Intersection Observer)
            const revealElements = document.querySelectorAll('.reveal, .list-item');
            
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('active', 'visible');
                        }, entry.target.classList.contains('list-item') ? index * 150 : 0);
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: "0px 0px -100px 0px" });

            revealElements.forEach(el => revealObserver.observe(el));

            // Feature Tabs
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    
                    btn.classList.add('active');
                    document.getElementById(btn.dataset.target).classList.add('active');
                });
            });

            // Mouse Follow Glow Cards
            document.querySelectorAll('.glow-card').forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                    
                    // 3D Tilt
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
                });
            });

            // Timeline Interaction
            const timelineSteps = document.querySelectorAll('.timeline-step');
            const timelineContentBox = document.getElementById('timeline-content');
            
            const timelineData = {
                1: { icon: '👋', title: 'Invite your team with one click.', desc: 'SSO enabled. No complex permissions to set up.' },
                2: { icon: '🔌', title: 'Connect your tools in seconds.', desc: 'Native integrations sync historical data instantly.' },
                3: { icon: '✨', title: 'Watch the AI work its magic.', desc: 'First meeting summarized, first tasks auto-assigned.' },
                4: { icon: '🚀', title: 'Your team is 3x more productive.', desc: 'Less time managing work. More time flowing.' }
            };

            timelineSteps.forEach(step => {
                step.addEventListener('click', () => {
                    timelineSteps.forEach(s => s.classList.remove('active'));
                    step.classList.add('active');
                    
                    const data = timelineData[step.dataset.step];
                    timelineContentBox.style.opacity = 0;
                    
                    setTimeout(() => {
                        timelineContentBox.innerHTML = `
                            <div style="font-size:2rem;margin-bottom:16px;">${data.icon}</div>
                            <strong>${data.title}</strong><br>
                            <span class="text-muted" style="font-size:1rem">${data.desc}</span>
                        `;
                        timelineContentBox.style.opacity = 1;
                        
                        // Add confetti if step 4
                        if(step.dataset.step === '4') createConfetti(timelineContentBox);
                        
                    }, 300);
                });
            });
            timelineContentBox.style.transition = "opacity 0.3s";

            // Number Counter Animation
            const counters = document.querySelectorAll('.counter');
            let hasCounted = false;

            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !hasCounted) {
                    hasCounted = true;
                    counters.forEach(counter => {
                        const target = parseFloat(counter.getAttribute('data-target'));
                        const isDecimal = counter.hasAttribute('data-decimal');
                        const duration = 2000; // ms
                        const stepTime = 20;
                        const steps = duration / stepTime;
                        const increment = target / steps;
                        let current = 0;

                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            
                            if (target > 1000) {
                                counter.innerText = Math.floor(current).toLocaleString();
                            } else if (isDecimal) {
                                counter.innerText = current.toFixed(1);
                            } else {
                                counter.innerText = Math.floor(current);
                            }
                        }, stepTime);
                    });
                }
            });
            if(document.querySelector('.metrics-section')) {
                counterObserver.observe(document.querySelector('.metrics-section'));
            }

            // Pricing Calculator
            const teamSlider = document.getElementById('teamSlider');
            const teamSizeVal = document.getElementById('teamSizeVal');
            const billingToggle = document.getElementById('billingToggle');
            const proPrice = document.getElementById('proPrice');
            const hoursSaved = document.getElementById('hoursSaved');
            const valueSaved = document.getElementById('valueSaved');

            let isAnnual = true;

            function updatePricing() {
                const size = parseInt(teamSlider.value);
                teamSizeVal.innerText = size;
                
                // Base price logic
                const pricePerSeat = isAnnual ? 19 : 29;
                const totalPro = size * pricePerSeat;
                
                proPrice.innerText = totalPro.toLocaleString();
                
                // ROI Logic: avg 3.2 hrs saved per person/week ≈ 12.8 hrs/month. Let's round to 12.
                // Value estimated at $50/hr
                const totalHours = size * 12;
                const totalValue = totalHours * 50;
                
                hoursSaved.innerText = totalHours.toLocaleString();
                valueSaved.innerText = totalValue.toLocaleString();
            }

            teamSlider.addEventListener('input', updatePricing);
            
            billingToggle.addEventListener('click', () => {
                isAnnual = !isAnnual;
                billingToggle.classList.toggle('annual', isAnnual);
                updatePricing();
            });
            
            updatePricing(); // Init

            // Compare Table Toggle
            const compareBtn = document.getElementById('compareBtn');
            const compareTable = document.getElementById('compareTable');
            
            compareBtn.addEventListener('click', () => {
                compareTable.classList.toggle('show');
                compareBtn.innerHTML = compareTable.classList.contains('show') ? 
                    'Hide feature comparison &uarr;' : 'Compare all features &darr;';
            });

            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                item.querySelector('.faq-question').addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    // Close all
                    faqItems.forEach(i => i.classList.remove('active'));
                    // Open if wasn't active
                    if (!isActive) item.classList.add('active');
                });
            });

            // Form Submit Simulation
            const ctaForm = document.getElementById('ctaForm');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');
            const successMsg = document.getElementById('successMsg');

            ctaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                btnText.style.display = 'none';
                btnSpinner.style.display = 'block';
                
                setTimeout(() => {
                    btnSpinner.style.display = 'none';
                    btnText.style.display = 'inline';
                    ctaForm.style.display = 'none';
                    successMsg.style.display = 'block';
                    createConfetti(document.querySelector('.cta-section'));
                }, 1500);
            });

            // Simple Confetti effect for wow factor
            function createConfetti(parentElement) {
                const colors = ['#6C63FF', '#00F5D4', '#FF6B6B', '#F0F0FF'];
                for(let i=0; i<50; i++) {
                    const conf = document.createElement('div');
                    conf.style.position = 'absolute';
                    conf.style.width = Math.random() * 10 + 5 + 'px';
                    conf.style.height = Math.random() * 10 + 5 + 'px';
                    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    conf.style.top = '50%';
                    conf.style.left = '50%';
                    conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    conf.style.zIndex = 100;
                    
                    const angle = Math.random() * Math.PI * 2;
                    const velocity = 50 + Math.random() * 100;
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity - 50;
                    
                    conf.animate([
                        { transform: 'translate(0,0) scale(1)', opacity: 1 },
                        { transform: `translate(${tx}px, ${ty}px) scale(0) rotate(${Math.random()*360}deg)`, opacity: 0 }
                    ], {
                        duration: 1000 + Math.random() * 1000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    });
                    
                    parentElement.appendChild(conf);
                    setTimeout(() => conf.remove(), 2000);
                }
            }
        });
    