/* =====================================================================
   fzkaipeng.com - main.js
   Theme, navigation, scroll reveal, hero canvas, terminal, counters
   ===================================================================== */
(function () {
    'use strict';

    /* ---------- Theme persistence ---------- */
    const root = document.documentElement;
    const themeKey = 'fzk-theme';
    const stored = localStorage.getItem(themeKey);
    if (stored === 'light') root.setAttribute('data-theme', 'light');

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const cur = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            if (cur === 'light') root.setAttribute('data-theme', 'light');
            else root.removeAttribute('data-theme');
            localStorage.setItem(themeKey, cur);
            updateThemeIcon();
        });
    }
    function updateThemeIcon() {
        if (!themeBtn) return;
        const isLight = root.getAttribute('data-theme') === 'light';
        themeBtn.innerHTML = isLight
            ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>'
            : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    }
    updateThemeIcon();

    /* ---------- Nav scroll state ---------- */
    const nav = document.querySelector('.nav');
    function onScroll() {
        if (!nav) return;
        if (window.scrollY > 30) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile toggle ---------- */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
    }

    /* ---------- Reveal on scroll ---------- */
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    /* ---------- Animated counters ---------- */
    const counterIO = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseFloat(el.dataset.count || '0');
            const dur = 1600;
            const start = performance.now();
            const isFloat = String(target).indexOf('.') > -1;
            function tick(t) {
                const p = Math.min(1, (t - start) / dur);
                const ease = 1 - Math.pow(1 - p, 3);
                const v = target * ease;
                el.textContent = isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString();
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            counterIO.unobserve(el);
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('[data-count]').forEach(el => counterIO.observe(el));

    /* ---------- Hero canvas particle / network ---------- */
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let w, h, particles;
        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = heroCanvas.getBoundingClientRect();
            w = rect.width; h = rect.height;
            heroCanvas.width = w * dpr; heroCanvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        function seed() {
            const count = Math.min(120, Math.floor((w * h) / 12000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.5 + 0.4,
                hue: Math.random() < 0.5 ? '92,200,255' : '125,108,255'
            }));
        }
        function step() {
            ctx.clearRect(0, 0, w, h);
            for (let p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
            }
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < 140 * 140) {
                        const o = 1 - Math.sqrt(d2) / 140;
                        ctx.strokeStyle = 'rgba(120,160,255,' + (o * 0.18) + ')';
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            for (let p of particles) {
                ctx.fillStyle = 'rgba(' + p.hue + ',0.85)';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(step);
        }
        function init() { resize(); seed(); step(); }
        window.addEventListener('resize', () => { resize(); seed(); });
        init();
    }

    /* ---------- Hero terminal typewriter ---------- */
    const term = document.getElementById('termBody');
    if (term) {
        const lines = [
            { t: '<span class="c5">$</span> <span class="c2">fzk</span> <span class="c1">init</span> --studio=<span class="c3">sheffield</span>', d: 0 },
            { t: '<span class="c5">[ok]</span> booting core modules ··· <span class="c1">audio.synth</span>, <span class="c1">visual.zen</span>, <span class="c1">privacy.local</span>', d: 600 },
            { t: '<span class="c5">[ok]</span> loading design system ··· <span class="c4">100%</span>', d: 1300 },
            { t: '<span class="c5">[ok]</span> connecting app matrix ··· <span class="c3">6 live</span>, <span class="c3">2 in lab</span>', d: 2000 },
            { t: '<span class="c5">$</span> <span class="c2">fzk</span> <span class="c1">deploy</span> --target=<span class="c3">global</span> --privacy=<span class="c1">local-only</span>', d: 2900 },
            { t: '<span class="c5">[✓]</span> all systems nominal · awaiting input<span class="cursor"></span>', d: 3700 }
        ];
        const fragment = document.createDocumentFragment();
        const placeholders = lines.map(() => {
            const d = document.createElement('span');
            d.className = 'line';
            d.innerHTML = '&nbsp;';
            fragment.appendChild(d);
            return d;
        });
        term.innerHTML = '';
        term.appendChild(fragment);
        lines.forEach((l, i) => {
            setTimeout(() => { placeholders[i].innerHTML = l.t; }, l.d);
        });
    }

    /* ---------- Card mouse-glow position ---------- */
    document.querySelectorAll('.card').forEach(c => {
        c.addEventListener('mousemove', (e) => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            c.style.setProperty('--my', (e.clientY - r.top) + 'px');
        });
    });

    /* ---------- Legal TOC active state ---------- */
    const tocLinks = document.querySelectorAll('.legal-toc a');
    if (tocLinks.length) {
        const tocIO = new IntersectionObserver((entries) => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    tocLinks.forEach(l => l.classList.remove('active'));
                    const id = en.target.id;
                    const active = document.querySelector('.legal-toc a[href="#' + id + '"]');
                    if (active) active.classList.add('active');
                }
            });
        }, { rootMargin: '-30% 0px -60% 0px' });
        document.querySelectorAll('.legal-body section').forEach(s => tocIO.observe(s));
    }

    /* ---------- Contact form (no-op submit) ---------- */
    const cForm = document.getElementById('contactForm');
    if (cForm) {
        cForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('cfStatus');
            if (status) {
                status.textContent = 'Transmitting payload to support@fzkaipeng.com ···';
                setTimeout(() => { status.textContent = '✓ Message queued. We typically respond within 24h.'; }, 800);
            }
            cForm.reset();
        });
    }

    /* ---------- Year ---------- */
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();