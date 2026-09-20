// Application Logic - Ch. Prudhvi Raj Portfolio
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initProjectFiltering();
    initContactForm();
    initResumeModal();
    initScrollSpy();
});

// 1. Dynamic Typing Effect
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        "Front-End Developer & UI Engineer",
        "Full-Stack Node.js & Express Builder",
        "Computer Science Student @ KL University",
        "Creator of EduHub KL & DevSprint"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const holdDuration = 1800;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = holdDuration;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 300;
        }

        setTimeout(type, delay);
    }

    type();
}

// 2. Project Card Filtering
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

// 3. Contact Form Submission (REST API + Offline Fallback)
function initContactForm() {
    const form = document.getElementById('portfolioContactForm');
    const statusEl = document.getElementById('contactFormStatus');
    const submitBtn = document.getElementById('submitContactBtn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('senderName').value.trim();
        const email = document.getElementById('senderEmail').value.trim();
        const subject = document.getElementById('senderSubject').value.trim();
        const message = document.getElementById('senderMessage').value.trim();

        if (!name || !email || !message) {
            showStatus('Please fill in all required fields.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';

        const payload = { name, email, subject, message };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const result = await res.json();
                showStatus(result.message || 'Message sent and recorded successfully!', 'success');
                form.reset();
            } else {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Server rejected request');
            }
        } catch (err) {
            // LocalStorage Fallback for static hosting / offline execution
            const stored = JSON.parse(localStorage.getItem('portfolio_offline_messages') || '[]');
            stored.push({
                ...payload,
                savedOfflineAt: new Date().toISOString()
            });
            localStorage.setItem('portfolio_offline_messages', JSON.stringify(stored));

            showStatus('Message saved locally (Backend is running in static/offline mode). Thank you!', 'success');
            form.reset();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message ➔';
        }
    });

    function showStatus(text, type) {
        statusEl.textContent = text;
        statusEl.className = `form-status ${type}`;
        setTimeout(() => {
            statusEl.className = 'form-status';
            statusEl.textContent = '';
        }, 6000);
    }
}

// 4. Resume Modal
function initResumeModal() {
    const modal = document.getElementById('resumeModal');
    const openBtn = document.getElementById('openResumeBtn');
    const closeBtn = document.getElementById('closeResumeBtn');

    if (!modal || !openBtn) return;

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 5. ScrollSpy for Navbar
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
