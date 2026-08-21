const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
})
const menuLinks = document.querySelectorAll(".nav-list a");
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    })
})