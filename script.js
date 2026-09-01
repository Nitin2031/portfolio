const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

/* Reveal sections while scrolling */

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
    threshold: 0.12
  }
);

$$(".reveal").forEach(element => {
  observer.observe(element);
});

/* Project filtering */

$$("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    $$("[data-filter]").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    $$(".project").forEach(project => {
      const shouldHide =
        filter !== "all" &&
        !project.dataset.category.includes(filter);

      project.classList.toggle("hidden", shouldHide);
    });
  });
});

/* 3D card movement */

$$("[data-tilt]").forEach(card => {
  card.addEventListener("pointermove", event => {
    const box = card.getBoundingClientRect();

    const x =
      (event.clientX - box.left) / box.width - 0.5;

    const y =
      (event.clientY - box.top) / box.height - 0.5;

    card.style.transform = `
      perspective(900px)
      rotateY(${x * 5}deg)
      rotateX(${y * -5}deg)
      translateY(-3px)
    `;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

/* Animated network background */

const canvas = $("#mesh");
const context = canvas.getContext("2d");

let dots = [];

function resizeCanvas() {
  canvas.width = innerWidth * devicePixelRatio;
  canvas.height = innerHeight * devicePixelRatio;

  context.setTransform(
    devicePixelRatio,
    0,
    0,
    devicePixelRatio,
    0,
    0
  );

  dots = Array.from(
    {
      length: Math.min(
        70,
        Math.floor(innerWidth / 18)
      )
    },
    () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16
    })
  );
}

function renderNetwork() {
  context.clearRect(
    0,
    0,
    innerWidth,
    innerHeight
  );

  dots.forEach((dot, index) => {
    dot.x += dot.vx;
    dot.y += dot.vy;

    if (dot.x < 0 || dot.x > innerWidth) {
      dot.vx *= -1;
    }

    if (dot.y < 0 || dot.y > innerHeight) {
      dot.vy *= -1;
    }

    context.fillStyle =
      "rgba(68, 244, 210, 0.65)";

    context.beginPath();

    context.arc(
      dot.x,
      dot.y,
      1,
      0,
      Math.PI * 2
    );

    context.fill();

    dots
      .slice(index + 1)
      .forEach(otherDot => {
        const distance = Math.hypot(
          dot.x - otherDot.x,
          dot.y - otherDot.y
        );

        if (distance < 110) {
          const opacity =
            (1 - distance / 110) * 0.13;

          context.strokeStyle =
            `rgba(84, 140, 255, ${opacity})`;

          context.beginPath();
          context.moveTo(dot.x, dot.y);
          context.lineTo(
            otherDot.x,
            otherDot.y
          );
          context.stroke();
        }
      });
  });

  requestAnimationFrame(renderNetwork);
}

/* Resize animation when browser size changes */

addEventListener("resize", resizeCanvas);

resizeCanvas();

/* Respect reduced-motion accessibility preference */

const reducedMotion = matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!reducedMotion) {
  renderNetwork();
}
