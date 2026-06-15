// --- CONTROLE DE ANIMAÇÃO POR TAMANHO DE TELA ---
const isMobile = window.innerWidth <= 768;

if (!isMobile && typeof gsap !== "undefined") {
    // Registra o plugin apenas no Desktop para evitar erros
    gsap.registerPlugin(ScrollTrigger);

    // Animações exclusivas para Desktop
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
} else {
    // Se for Mobile, garante que TUDO comece 100% visível na tela sem travar
    document.querySelectorAll('.trigger-letter, .trigger-grid, .trigger-motivo').forEach(el => {
        el.style.opacity = "1";
        el.style.transform = "none";
    });
}


// --- LÓGICA DO CARD EXPANSÍVEL (FUNCIONA EM TUDO) ---
const cardBtn = document.getElementById('cardBtn');
const letterContent = document.getElementById('letterContent');
let isOpen = false;

cardBtn.addEventListener('click', () => {
    if (!isOpen) {
        if (isMobile) {
            // No mobile vai direto sem animação pesada para não dar lag
            letterContent.style.height = "auto";
            letterContent.style.opacity = "1";
        } else {
            // No desktop mantém o efeito suave do GSAP
            gsap.to(letterContent, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" });
        }
        cardBtn.innerText = "Fechar Mensagem ❌";
        cardBtn.style.background = "#EF4444"; 
        isOpen = true;
    } else {
        if (isMobile) {
            letterContent.style.height = "0";
            letterContent.style.opacity = "0";
        } else {
            gsap.to(letterContent, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
        }
        cardBtn.innerText = "Abrir Mensagem de Matheus 📩";
        cardBtn.style.background = "linear-gradient(135deg, var(--stitch-blue-neon), var(--stitch-purple-mid))";
        isOpen = false;
    }
});


// --- HOVERS E PARTICULAS (APENAS DESKTOP) ---
if (!isMobile) {
    const stitches = document.querySelectorAll('.floating-stitch');
    stitches.forEach(stitch => {
        stitch.addEventListener('mouseenter', () => {
            gsap.to(stitch, { rotation: '+=360', scale: 1.3, opacity: 0.8, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        });
        stitch.addEventListener('mouseleave', () => {
            gsap.to(stitch, { scale: 1, opacity: 0.35, duration: 0.4, ease: "power2.out" });
        });
    });

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
}

// O botão de corações do final continua funcionando por clique normal
function createHearts(event) {
    const footer = document.querySelector('.footer-action');
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart-particle');
        heart.innerHTML = '💙';
        const x = event.clientX - footer.getBoundingClientRect().left + (Math.random() - 0.5) * 160;
        const y = event.clientY - footer.getBoundingClientRect().top + (Math.random() - 0.5) * 40;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.animationDelay = `${Math.random() * 0.2}s`;
        footer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 2000);
    }
}