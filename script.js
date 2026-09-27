/* =========================================================
   SHARED WEBSITE BEHAVIOR
   This one file is linked on every page (see the <script> tag
   near the bottom of each .html file), so we don't repeat code.
   ========================================================= */

/* ---------- SECURITY: clickjacking protection ---------- */
// GitHub Pages can't send an X-Frame-Options header, so we do the
// equivalent in JavaScript: if this page is ever loaded inside someone
// else's <iframe> (window.self !== window.top), we force the TOP window
// to navigate to us directly instead of staying embedded — this defeats
// an attacker trying to trick guests into clicking hidden buttons.
if (window.top !== window.self) {
  window.top.location = window.self.location;
}

// ⚠️ PLACEHOLDER — replace with your real WhatsApp number
// (country code + number, no "+", no spaces, e.g. "2348012345678")
const HOTEL_WHATSAPP_NUMBER = "234XXXXXXXXXX";

// Everything below waits for the page to fully load before running,
// so it doesn't try to find buttons/sections that aren't ready yet.
document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 0. Hamburger menu (mobile nav) ---------- */
  // Tapping the ☰ button adds/removes an "open" class on the nav,
  // which style.css uses to show or hide the menu on small screens.
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });

    // Also close the menu automatically once a link is tapped,
    // so it doesn't stay open after navigating.
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
      });
    });
  }

  /* ---------- 1. Floating WhatsApp button ---------- */
  // Fills in the link using our shared number above.
  const floatBtn = document.getElementById("whatsapp-float");
  if (floatBtn) {
    const defaultText = encodeURIComponent("Hi! I'd like to know more about Grandeur Hotel.");
    floatBtn.href = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${defaultText}`;
  }

  // Same idea, for the plain text link on the Contact page.
  const contactLink = document.getElementById("contact-whatsapp-link");
  if (contactLink) {
    const defaultText = encodeURIComponent("Hi! I'd like to know more about Grandeur Hotel.");
    contactLink.href = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${defaultText}`;
  }

  /* ---------- 2. Sticky header shadow on scroll ---------- */
  // Adds a CSS class called "scrolled" once the page is scrolled down,
  // which we use in style.css to show a subtle shadow.
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  /* ---------- 3. Scroll-reveal animations ---------- */
  // IntersectionObserver is a built-in browser tool that watches elements
  // and tells us the moment they scroll into view. When that happens,
  // we add a "visible" class, which style.css animates with a fade + slide.
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // animate once, then stop watching
        }
      });
    },
    { threshold: 0.15 } // triggers when 15% of the section is visible
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- 4. Back-to-top button ---------- */
  const topBtn = document.getElementById("back-to-top");
  if (topBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    });
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 5. Booking form (only runs on booking.html) ---------- */
  const sendBtn = document.getElementById("send-btn");
  if (sendBtn) {
    sendBtn.addEventListener("click", function () {
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const service = document.getElementById("service").value;
      const date = document.getElementById("date").value;
      const guests = document.getElementById("guests").value;
      const message = document.getElementById("message").value;

      if (!name || !phone || !service || !date || !guests) {
        alert("Please fill in all required fields before sending.");
        return;
      }

      const text =
        `New Booking Request\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n` +
        `Date: ${date}\n` +
        `Guests: ${guests}\n` +
        `Message: ${message || "None"}`;

      const encodedText = encodeURIComponent(text);
      const whatsappURL = `https://wa.me/${HOTEL_WHATSAPP_NUMBER}?text=${encodedText}`;
      window.location.href = whatsappURL;
    });
  }

});
