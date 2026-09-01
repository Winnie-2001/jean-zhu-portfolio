const progress = document.querySelector(".scroll-progress");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox?.querySelector("img");

const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.querySelector("img");
    if (!lightbox || !lightboxImage || !source) return;
    lightboxImage.src = source.currentSrc || source.src;
    lightboxImage.alt = source.alt;
    lightbox.showModal();
  });
});

lightbox?.querySelector(".lightbox__close")?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
