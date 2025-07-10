// script.js

// =======================
// Portfolio App Main File
// =======================
//
// Author: Njoroge Muigai
// Description: Single-page portfolio site with smooth navigation, scroll-based
//              section highlighting, reveal animations, and back-to-top button.
//
// -----------------------------------------------------------------------------
// Table of Contents:
//   1. DOMContentLoaded Entry Point
//   2. App Markup Injection (initApp)
//   3. Smooth Scroll Navigation (setupSmoothScroll)
//   4. Scroll-based Nav Highlight (setupScrollHighlight)
//   5. Reveal Cards on Scroll (setupRevealOnScroll)
//   6. Back-to-Top Button (setupBackToTop)
//   7. Utility Functions
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupSmoothScroll();
    setupScrollHighlight();
    setupRevealOnScroll();
    setupBackToTop();
});

/**
 * Injects all page markup into #app.
 * This function sets up the header, navigation, main content sections, and footer.
 */
function initApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
         <header class="site-header">
      <div class="container">
        <h1 class="site-title">Njoroge Muigai</h1>
        <p class="site-tagline">Strategic Communications & Multimedia Storytelling</p>
        <nav class="navbar">
          <ul>
            <li><a href="#about" class="nav-link">About</a></li>
            <li><a href="#case-studies" class="nav-link">Case Studies</a></li>
            <li><a href="#awards" class="nav-link">Awards</a></li>
            <li><a href="#writing" class="nav-link">Writing</a></li>
            <li><a href="#media" class="nav-link">Media</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main class="container">
      <section id="about" class="card">
        <h2>About Me</h2>
        <p>I’m a communications specialist and former BBC senior journalist with over a decade of experience in strategic storytelling, digital growth, and audience engagement in Africa. I co‑led the BBC's WASH project and helped grow NTV Kenya’s social media following from 100k to over 1M. I craft narratives that connect communities, funders, and policymakers.</p>
      </section>
      <section id="case-studies" class="card">
        <h2>Case Studies</h2>
        <article>
          <h3>BBC Gates Foundation WASH Project</h3>
          <p>Developed a regional communications strategy across multiple African countries. Delivered multimedia content (video, radio, digital) aligning storytelling with donor and community needs.</p>
          <p>
            <a href="https://public.flourish.studio/visualisation/16615423/" target="_blank">View Story</a> |
            <a href="https://public.flourish.studio/visualisation/16615423/" target="_blank">Data Visualization</a>
          </p>
        </article>
        <article>
          <h3>NTV Kenya Digital Growth</h3>
          <p>Helped grow social media from under 100,000 to over 1 million followers by implementing strategic video and engagement campaigns.</p>
        </article>
      </section>
      <section id="awards" class="card">
        <h2>Awards & Recognition</h2>
        <ul>
          <li><a href="https://worldpressinstitute.org/news/world-press-institute-announces-2025-international-fellows/" target="_blank">2025 World Press Institute Fellow</a></li>
          <li><a href="https://mediacouncil.or.ke/sites/default/files/downloads/AJEA%20Final%20List%202023_0.pdf" target="_blank">2023 Annual Journalism Excellence Awards Finalist</a></li>
        </ul>
      </section>
      <section id="writing" class="card">
        <h2>Writing Samples</h2>
        <ul>
          <li><a href="https://public.flourish.studio/visualisation/16615423/" target="_blank">Power from Waste: Uganda’s Green Grid</a></li>
          <li><a href="https://bbc.com/news/articles/cjewge4lvv0o" target="_blank">Why the trees behind shea butter beauty cream are under threat</a></li>
        </ul>
      </section>
      <section id="media" class="card">
        <h2>Media & Campaigns</h2>
        <ul>
          <li><a href="https://www.youtube.com/watch?v=ugDTiBMRsu0" target="_blank">BBC Energy Field Video</a></li>
          <li><a href="https://www.youtube.com/watch?v=OwXQiciBYlw&t=5s" target="_blank">Digital Feature Video</a></li>
        </ul>
      </section>
      <section id="contact" class="card">
        <h2>CV & Contact</h2>
        <p>Email: <a href="mailto:njorogemuigai@gmail.com">njorogemuigai@gmail.com</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/njorogemuigai" target="_blank">linkedin.com/in/njorogemuigai</a></p>
        <p>Location: Nairobi, Kenya (Remote‑ready)</p>
      </section>
    </main>
    <footer class="site-footer">
      <div class="container"><p>&copy; 2025 Njoroge Muigai</p></div>
    </footer>
  `;
}

/**
 * Enables smooth-scroll behavior for navigation links.
 * Highlights the clicked link and scrolls smoothly to the target section.
 */
function setupSmoothScroll() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            clearActiveLinks(links);
            link.classList.add('active');
            const target = document.querySelector(link.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Highlights the navigation link corresponding to the section in view.
 * Uses scroll position to determine the active section.
 */
function setupScrollHighlight() {
    const links    = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('main section'));
    let activeLink = null;

    window.addEventListener('scroll', throttle(() => {
        const scrollMid = window.scrollY + window.innerHeight * 0.3;
        for (const sec of sections) {
            const top    = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (scrollMid >= top && scrollMid < bottom) {
                const newLink = document.querySelector(`.nav-link[href="#${sec.id}"]`);
                if (newLink !== activeLink) {
                    clearActiveLinks(links);
                    newLink.classList.add('active');
                    activeLink = newLink;
                }
                break;
            }
        }
    }, 100));
}

/**
 * Reveals card sections as they enter the viewport using IntersectionObserver.
 * Adds a 'visible' class to animate cards on scroll.
 */
function setupRevealOnScroll() {
    const cards   = document.querySelectorAll('.card');
    const options = { threshold: 0.1 };
    const obs     = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    cards.forEach(card => obs.observe(card));
}

/**
 * Creates and manages a back-to-top button.
 * The button appears after scrolling down and scrolls smoothly to the top when clicked.
 */
function setupBackToTop() {
    // Create button element
    const btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.textContent = '↑ Top';
    document.body.appendChild(btn);

    // Inline styling (can be moved to CSS)
    Object.assign(btn.style, {
        position: 'fixed',
        right: '1rem',
        bottom: '1rem',
        padding: '0.5rem 1rem',
        display: 'none',
        backgroundColor: '#001F54',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        zIndex: 100
    });

    // Show/hide button on scroll
    window.addEventListener('scroll', throttle(() => {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }, 200));

    // Scroll to top on click
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Utility: Removes the 'active' class from all navigation links.
 * @param {NodeList} links - List of navigation link elements.
 */
function clearActiveLinks(links) {
    links.forEach(l => l.classList.remove('active'));
}

/**
 * Utility: Throttles execution of a function to once per specified milliseconds.
 * @param {Function} fn - Function to throttle.
 * @param {number} wait - Milliseconds to wait between calls.
 * @returns {Function} Throttled function.
 */
function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
        const now = Date.now();
        if (now - last >= wait) {
            last = now;
            fn.apply(this, args);
        }
    };
}
