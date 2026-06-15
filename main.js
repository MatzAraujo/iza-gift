// Aguarda o DOM carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", () => {
    
    const cardBtn = document.getElementById('cardBtn');
    const letterContent = document.getElementById('letterContent');
    const heartBtn = document.getElementById('heartBtn');
    
    // Detecta se é mobile baseado na largura da tela
    const isMobile = window.innerWidth <= 768;
    let isOpen = false;

    console.log("Script main.js carregado com sucesso! Modo Mobile:", isMobile);

    // --- 1. CLIQUE DO CARD EXPANSÍVEL ---
    if (cardBtn && letterContent) {
        cardBtn.addEventListener('click', (event) => {
            event.preventDefault();
            console.log("Botão da mensagem clicado. Estado atual aberto?:", isOpen);
            
            if (!isOpen) {
                // Abre o card
                if (isMobile) {
                    letterContent.style.height = "auto";
                    letterContent.style.opacity = "1";
                } else if (typeof gsap !== "undefined") {
                    gsap.to(letterContent, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
                } else {
                    letterContent.style.height = "auto";
                    letterContent.style.opacity = "1";
                }
                cardBtn.innerText = "Fechar Mensagem ❌";
                cardBtn.style.background = "#EF4444"; 
                isOpen = true;
            } else {
                // Fecha o card
                if (isMobile) {
                    letterContent.style.height = "0";
                    letterContent.style.opacity = "0";
                } else if (typeof gsap !== "undefined") {
                    gsap.to(letterContent, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
                } else {
                    letterContent.style.height = "0";
                    letterContent.style.opacity = "0";
                }
                cardBtn.innerText = "Abrir Mensagem de Matheus 📩";
                cardBtn.style.background = "linear-gradient(135deg, var(--stitch-blue-neon), var(--stitch-purple-mid))";
                isOpen = false;
            }
        });
    }

    // --- 2. CLIQUE DO BOTÃO DE CORAÇÕES ---
    if (heartBtn) {
        heartBtn.addEventListener('click', (event) => {
            console.log("Botão de corações clicado!");
            const footer = document.querySelector('.footer-action');
            if (!footer) return;
            
            for (let i = 0; i < 12; i++) {
                const heart = document.createElement('span');
                heart.classList.add('heart-particle');
                heart.innerHTML = '💙';
                
                const rect = footer.getBoundingClientRect();
                const x = event.clientX - rect.left + (Math.random() - 0.5) * 160;
                const y = event.clientY - rect.top + (Math.random() - 0.5) * 40;
                
                heart.style.left = `${x}px`;
                heart.style.top = `${y}px`;
                heart.style.animationDelay = `${Math.random() * 0.2}s`;
                
                footer.appendChild(heart);
                setTimeout(() => { heart.remove(); }, 2000);
            }
        });
    }

    // --- 3. ANIMAÇÕES DO GSAP (APENAS DESKTOP) ---
    if (!isMobile && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        try {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(".trigger-letter", { opacity: 0, y: 40 }, {
                scrollTrigger: { trigger: ".trigger-letter", start: "top 85%", toggleActions: "play none none none" },
                opacity: 1, y: 0, duration: 1, ease: "power2.out"
            });

            gsap.fromTo(".trigger-grid", { opacity: 0, y: 30 }, {
                scrollTrigger: { trigger: ".grid-section", start: "top 80%" },
                opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
            });

            gsap.fromTo(".trigger-motivo", { opacity: 0, y: 30 }, {
                scrollTrigger: { trigger: ".motivo-section", start: "top 80%" },
                opacity: 1, y: 0, duration: 0.8, stagger: 0.25, ease: "power2.out"
            });

            // Hovers dos Stitchs
            const stitches = document.querySelectorAll('.floating-stitch');
            stitches.forEach(stitch => {
                stitch.addEventListener('mouseenter', () => {
                    gsap.to(stitch, { rotation: '+=360', scale: 1.3, opacity: 0.8, duration: 0.6, ease: "elastic.out(1, 0.5)" });
                });
                stitch.addEventListener('mouseleave', () => {
                    gsap.to(stitch, { scale: 1, opacity: 0.35, duration: 0.4, ease: "power2.out" });
                });
            });

            // Hovers dos Cards
            const activeHoverCards = document.querySelectorAll('.grid-item, .motivo-card');
            activeHoverCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { y: -8, scale: 1.015, boxShadow: "0 20px 40px rgba(56, 189, 248, 0.2)", duration: 0.3, ease: "power2.out" });
                });
                card.addEventListener('mouseleave', () => {
                    const isGrid = card.classList.contains('grid-item');
                    gsap.to(card, { y: 0, scale: 1, boxShadow: isGrid ? "none" : "0 15px 30px rgba(0,0,0,0.3)", duration: 0.3, ease: "power2.out" });
                });
            });
        } catch (err) {
            console.log("GSAP ignorado ou travado de forma segura:", err);
        }
    } else {
        // Se for Mobile, força a exibição dos elementos na hora sem animação de scroll
        document.querySelectorAll('.trigger-letter, .trigger-grid, .trigger-motivo').forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
        });
    }
});