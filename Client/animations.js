let scrollContainer = document.querySelector("#setList");
let backBtn = document.querySelector(".back-btn");
let nextBtn = document.querySelector(".next-btn");

scrollContainer.addEventListener('wheel', (e) => {
    e.defaultPrevented();
    scrollContainer.scrollLeft += e.deltaY;
    scrollContainer.style.scrollBehavior = 'auto';
});
nextBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft += 900;
});

backBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft -= 900;
});

