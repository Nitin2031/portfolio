const reveals = document.querySelectorAll(".reveal");

/*
 * Reveal sections when they enter the screen.
 */
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  reveals.forEach(element => {
    observer.observe(element);
  });
} else {
  /*
   * Fallback for browsers that don't support
   * IntersectionObserver.
   */
  reveals.forEach(element => {
    element.classList.add("visible");
  });
}

/*
 * Highlight the selected navigation link.
 */
document
  .querySelectorAll('a[href^="#"]')
  .forEach(link => {
    link.addEventListener("click", () => {
      document
        .querySelectorAll(".site-header nav a")
        .forEach(item => {
          item.classList.remove("active");
        });

      if (link.closest("nav")) {
        link.classList.add("active");
      }
    });
  });
