let player = document.getElementById('#layer_1');

LottieInteractivity.create({
    mode: "scroll",
    player: "#layer_1",
    actions: [
        {
            visibility: [0.4, 0.55],
            type: "seek",
            frames: [0, 60]
        },
        {
            visibility: [0.55, 0.8],
            type: "seek",
            frames: [60, 180]
        }
    ]
});

gsap.registerPlugin(ScrollTrigger);
gsap.timeline({
    scrollTrigger: {
        trigger: ".logo",
        start: "top center",
        end: "+=200",
        scrub: 1
    }
})
    .from(".logo", { opacity: 100, duration: 2 })

gsap.timeline({
    scrollTrigger: {
        trigger: ".header",
        start: "bottom bottom",
        end: "+=200",
        scrub: 1
    }
})
    .from(".header", { opacity: 0, y: 36, duration: 2 })