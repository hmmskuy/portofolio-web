document.addEventListener("DOMContentLoaded", () => {

    // =============================================================
    // 1. MOBILE MENU TOGGLE & ACTIVE NAVBAR LINK HIGHLIGHT
    // =============================================================
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const iconHamburger = document.getElementById("icon-hamburger");
    const iconClose = document.getElementById("icon-close");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const isHidden = mobileMenu.classList.toggle("hidden");
            if (iconHamburger && iconClose) {
                iconHamburger.classList.toggle("hidden", !isHidden);
                iconHamburger.classList.toggle("block", isHidden);
                iconClose.classList.toggle("hidden", isHidden);
                iconClose.classList.toggle("block", !isHidden);
            }
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                if (iconHamburger && iconClose) {
                    iconHamburger.classList.remove("hidden");
                    iconHamburger.classList.add("block");
                    iconClose.classList.add("hidden");
                    iconClose.classList.remove("block");
                }
            });
        });
    }

    // Active link indicator while scrolling
    const navLinks = document.querySelectorAll("#desktop-nav .nav-link");
    const sections = document.querySelectorAll("section[id]");

    function updateActiveNav() {
        let currentSectionId = "home";
        sections.forEach((sec) => {
            const top = sec.offsetTop - 160;
            if (window.scrollY >= top) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${currentSectionId}`) {
                link.classList.add("text-blue-400", "font-semibold", "border-b-2", "border-blue-400");
                link.classList.remove("text-gray-300");
            } else {
                link.classList.remove("text-blue-400", "font-semibold", "border-b-2", "border-blue-400");
                link.classList.add("text-gray-300");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();

    // =============================================================
    // 2. HERO TYPEWRITER EFFECT (RE-TRIGGERS ON SCROLL)
    // =============================================================
    const typewriterTarget = document.getElementById("typewriter-text");
    let typingTimeout = null;

    if (typewriterTarget) {
        const textToType = typewriterTarget.getAttribute("data-text") || "";
        const typingSpeed = 45;
        let index = 0;

        function startTyping() {
            clearTimeout(typingTimeout);
            typewriterTarget.textContent = "";
            index = 0;

            function typeWriter() {
                if (index < textToType.length) {
                    typewriterTarget.textContent += textToType.charAt(index);
                    index++;
                    typingTimeout = setTimeout(typeWriter, typingSpeed);
                }
            }

            typingTimeout = setTimeout(typeWriter, 300);
        }

        const heroObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startTyping();
                    } else {
                        clearTimeout(typingTimeout);
                        typewriterTarget.textContent = "";
                    }
                });
            },
            { threshold: 0.3 }
        );

        const heroSection = typewriterTarget.closest("section") || typewriterTarget;
        heroObserver.observe(heroSection);
    }

    // =============================================================
    // 3. INTERACTIVE DRAGGABLE CHARACTER CARD (MOUSE & TOUCH)
    // =============================================================
    const charCard = document.getElementById("character-card");
    if (charCard) {
        const charImg = charCard.querySelector(".character-img");
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        charCard.addEventListener("pointerdown", (e) => {
            isDragging = true;
            startX = e.clientX - currentX;
            startY = e.clientY - currentY;

            if (charImg) charImg.classList.remove("animate-character-float");
            charCard.style.transition = "none";
            charCard.setPointerCapture(e.pointerId);
        });

        charCard.addEventListener("pointermove", (e) => {
            if (!isDragging) return;
            currentX = e.clientX - startX;
            currentY = e.clientY - startY;
            charCard.style.transform = `translate3d(${currentX}px, ${currentY}px, 0px) rotate(${currentX * 0.05}deg) scale(1.08)`;
        });

        const stopDragging = () => {
            if (!isDragging) return;
            isDragging = false;

            charCard.style.transition = "transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            charCard.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg) scale(1)";

            currentX = 0;
            currentY = 0;

            setTimeout(() => {
                if (!isDragging && charImg) {
                    charImg.classList.add("animate-character-float");
                }
            }, 700);
        };

        charCard.addEventListener("pointerup", stopDragging);
        charCard.addEventListener("pointercancel", stopDragging);
    }

    // =============================================================
    // 4. INTERACTIVE SINGLE-LETTER NAME CLICK ("Hammam")
    // =============================================================
    const nameText = document.getElementById("nama-click-trigger");
    if (nameText) {
        const rawText = nameText.textContent.trim();
        nameText.innerHTML = "";

        [...rawText].forEach((char) => {
            const span = document.createElement("span");
            span.classList.add("single-letter-interactive");

            if (char === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = char;
            }

            span.addEventListener("click", (e) => {
                e.stopPropagation();
                span.classList.remove("animate-single-letter");
                void span.offsetWidth;
                span.classList.add("animate-single-letter");
            });

            span.addEventListener("animationend", () => {
                span.classList.remove("animate-single-letter");
            });

            nameText.appendChild(span);
        });
    }

    // =============================================================
    // 5. ABOUT ME & TOOLS SCROLL REVEAL (LEFT / RIGHT)
    // =============================================================
    const lrScrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                } else {
                    entry.target.classList.remove("reveal-active");
                }
            });
        },
        { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal-scroll-left, .reveal-scroll-right").forEach((el) => {
        lrScrollObserver.observe(el);
    });

    // =============================================================
    // 6. ORGANISASI CINEMATIC 3D SCROLL REVEAL
    // =============================================================
    const cinematicCards = document.querySelectorAll(".org-cinematic-card");
    const orgObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("is-visible");
                    }, index * 120);
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    cinematicCards.forEach((card) => orgObserver.observe(card));

    // =============================================================
    // 7. INITIAL REVEAL FOR SKILLS & PORTFOLIO CARDS
    // =============================================================
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("opacity-0", "translate-y-6", "translate-y-10");
                    entry.target.classList.add("opacity-100", "translate-y-0");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal-item").forEach((el) => revealObserver.observe(el));

    // =============================================================
    // 8. SKILLS SECTION: 3D TILT & SCROLL EXIT/RETURN
    // =============================================================
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        const skillCards = skillsSection.querySelectorAll(".skill-card");
        let isSkillHovered = false;

        function checkSkillsScroll() {
            if (isSkillHovered) return;
            const rect = skillsSection.getBoundingClientRect();

            if (rect.bottom < 120) {
                skillCards.forEach((card, index) => {
                    const exitDelay = index * 60;
                    let transformVal = "";
                    if (index === 0) transformVal = "perspective(1000px) translateX(-200px) scale(0.85)";
                    else if (index === 1) transformVal = "perspective(1000px) translateY(70px) scale(0.85)";
                    else transformVal = "perspective(1000px) translateX(200px) scale(0.85)";

                    card.style.transitionDelay = `${exitDelay}ms`;
                    card.style.transform = transformVal;
                    card.style.opacity = "0";
                    card.style.transition = "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out";
                });
            } else {
                skillCards.forEach((card, index) => {
                    const returnDelay = 300 + index * 150;
                    card.style.transitionDelay = `${returnDelay}ms`;
                    card.style.transform =
                        "perspective(1000px) translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)";
                    card.style.opacity = "1";
                    card.style.transition =
                        "transform 2.1s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
                });
            }
        }

        window.addEventListener("scroll", checkSkillsScroll, { passive: true });
        checkSkillsScroll();

        skillCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                isSkillHovered = true;
            });

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;

                card.style.transitionDelay = "0ms";
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.opacity = "1";
                card.style.transition = "transform 0.1s ease-out";
            });

            card.addEventListener("mouseleave", () => {
                isSkillHovered = false;
                card.style.transitionDelay = "0ms";
                checkSkillsScroll();
            });
        });
    }

    // =============================================================
    // 9. PORTFOLIO SECTION: 3D TILT & SCROLL EXIT/RETURN
    // =============================================================
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
        const portfolioCards = portfolioSection.querySelectorAll(".portfolio-card");
        let isPortfolioHovered = false;

        function checkPortfolioScroll() {
            if (isPortfolioHovered) return;
            const rect = portfolioSection.getBoundingClientRect();

            if (rect.bottom < 120) {
                portfolioCards.forEach((card, index) => {
                    const offsetX = index % 2 === 0 ? -180 : 180;
                    card.style.transitionDelay = "0ms";
                    card.style.transform = `perspective(1000px) translateX(${offsetX}px) scale(0.85)`;
                    card.style.opacity = "0";
                    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out";
                });
            } else {
                portfolioCards.forEach((card, index) => {
                    const returnDelay = 400 + index * 150;
                    card.style.transitionDelay = `${returnDelay}ms`;
                    card.style.transform =
                        "perspective(1000px) translateX(0px) rotateX(0deg) rotateY(0deg) scale(1)";
                    card.style.opacity = "1";
                    card.style.transition =
                        "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out";
                });
            }
        }

        window.addEventListener("scroll", checkPortfolioScroll, { passive: true });
        checkPortfolioScroll();

        portfolioCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                isPortfolioHovered = true;
            });

            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;

                card.style.transitionDelay = "0ms";
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                card.style.opacity = "1";
                card.style.transition = "transform 0.1s ease-out";
            });

            card.addEventListener("mouseleave", () => {
                isPortfolioHovered = false;
                card.style.transitionDelay = "0ms";
                checkPortfolioScroll();
            });
        });
    }

    // =============================================================
    // 10. PRESTASI TIMELINE: DIRECTIONAL SCROLL REVEAL
    // =============================================================
    const timelineItems = document.querySelectorAll(".timeline-item-scroll");
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const timelineObserver = new IntersectionObserver(
        (entries) => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const isScrollingUp = currentScrollTop < lastScrollTop;

            entries.forEach((entry, idx) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        if (isScrollingUp) {
                            entry.target.classList.remove("hidden-to-top", "hidden-to-bottom", "reveal-from-bottom");
                            entry.target.classList.add("reveal-from-top");
                        } else {
                            entry.target.classList.remove("hidden-to-top", "hidden-to-bottom", "reveal-from-top");
                            entry.target.classList.add("reveal-from-bottom");
                        }
                    }, idx * 120);
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove("reveal-from-top", "reveal-from-bottom", "hidden-to-bottom");
                        entry.target.classList.add("hidden-to-top");
                    } else {
                        entry.target.classList.remove("reveal-from-top", "reveal-from-bottom", "hidden-to-top");
                        entry.target.classList.add("hidden-to-bottom");
                    }
                }
            });

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
        },
        { threshold: 0.2 }
    );

    window.addEventListener(
        "scroll",
        () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            lastScrollTop = st <= 0 ? 0 : st;
        },
        { passive: true }
    );

    timelineItems.forEach((item) => timelineObserver.observe(item));
});
