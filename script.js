const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const menuBackdrop = document.querySelector(".menu-backdrop");

function closeMenu() {
    document.body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
}

function toggleMenu() {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle?.setAttribute("aria-expanded", String(isOpen));
    menuToggle?.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

function setActiveLink() {
    const headerOffset = (header?.offsetHeight || 0) + 24;
    let current = sections[0]?.getAttribute("id") || "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", () => {
    setActiveLink();

    if (window.innerWidth > 1000) {
        closeMenu();
    }
});
window.addEventListener("load", setActiveLink);

menuToggle?.addEventListener("click", toggleMenu);
menuBackdrop?.addEventListener("click", closeMenu);
navLinks.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
