document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.querySelector(".menuBtn");
    const navMobile = document.querySelector(".nav-mobile");

    menuBtn.addEventListener("click", function () {
        navMobile.classList.toggle("active");
    });
});
