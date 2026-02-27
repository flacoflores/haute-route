// Lightbox gallery viewer
(function () {
  var lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  var img = lightbox.querySelector(".lightbox__img");
  var caption = lightbox.querySelector(".lightbox__caption");
  var closeBtn = lightbox.querySelector(".lightbox__close");
  var prevBtn = lightbox.querySelector(".lightbox__prev");
  var nextBtn = lightbox.querySelector(".lightbox__next");

  var images = document.querySelectorAll(".gallery-grid__item img");
  var currentIndex = 0;

  function open(index) {
    currentIndex = index;
    var target = images[index];
    img.src = target.src;
    img.alt = target.alt;
    caption.textContent = target.alt || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    open(currentIndex);
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    open(currentIndex);
  }

  // Attach click to gallery items
  images.forEach(function (image, index) {
    image.addEventListener("click", function () {
      open(index);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Close on background click
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
})();
