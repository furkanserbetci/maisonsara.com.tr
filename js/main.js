(function () {
  "use strict";

  // Header: kaydırınca krem zemin kazanır
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobil menü
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelectorAll(".site-nav a");
  var closeNav = function () {
    document.body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        var first = document.querySelector(".site-nav a");
        if (first) first.focus();
      }
    });
    navLinks.forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    // Esc ile kapat
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        closeNav();
        toggle.focus();
      }
    });
    // Masaüstü genişliğine geçince menü durumunu sıfırla
    var mq = window.matchMedia("(min-width: 768px)");
    var onChange = function (e) { if (e.matches) closeNav(); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  // Harita: tıklayınca yükle (Google Maps yükünü isteğe bağlı yapar)
  var facade = document.querySelector(".map-facade");
  if (facade) {
    facade.addEventListener("click", function () {
      var wrap = facade.parentElement;
      var iframe = document.createElement("iframe");
      iframe.src = facade.getAttribute("data-map-src");
      iframe.title = facade.getAttribute("data-map-title") || "Google Maps";
      iframe.setAttribute("allowfullscreen", "");
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      wrap.appendChild(iframe);
      facade.remove();
    });
  }

  // Scroll reveal
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
