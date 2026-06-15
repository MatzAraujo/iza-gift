// Registrando o plugin do ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

// --- ANIMAÇÕES DE ENTRADA INTELIGENTES (DESKTOP VS MOBILE) ---

// Criamos uma função de mídia para o GSAP entender o tamanho da tela
let mm = gsap.matchMedia();

// Configuração para telas MOBILE (até 768px)
mm.add("(max-width: 768px)", () => {
    // No mobile, o gatilho dispara bem mais cedo (assim que a seção aponta na tela)
    gsap.fromTo(".trigger-letter", { opacity: 0, y: 20 }, {
        scrollTrigger: { trigger: ".trigger-letter", start: "top 95%", toggleActions: "play none none none" },
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out"
    });

    gsap.fromTo(".trigger-grid", { opacity: 0, y: 15 }, {
        scrollTrigger: { trigger: ".grid-section", start: "top 90%" },
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out"
    });

    gsap.fromTo(".trigger-motivo", { opacity: 0, y: 15 }, {
        scrollTrigger: { trigger: ".motivo-section", start: "top 90%" },
        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out"
    });
});

// Configuração para telas DESKTOP (maiores que 768px)
mm.add("(min-width: 769px)", () => {
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
});