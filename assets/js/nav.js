// nav.js — header/navigation behaviour

document.addEventListener("DOMContentLoaded", function () {

  const burger = document.querySelector(".burger");
  const nav = document.querySelector("nav.main");

  if (burger && nav) {

    burger.addEventListener("click", function (e) {

      e.preventDefault();
      e.stopPropagation();

      const opened = nav.classList.toggle("open");

      burger.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );

      burger.setAttribute(
        "aria-label",
        opened ? "Close menu" : "Open menu"
      );

      burger.textContent = opened ? "✕" : "☰";
    });


    // Close menu when a real link is clicked
    nav.querySelectorAll("a").forEach(function (a) {

      a.addEventListener("click", function () {

        if (window.innerWidth <= 980) {

          // Don't close the menu for dropdown/parent links
          const parent = a.parentElement;

          if (parent && parent.querySelector(".drop")) {
            return;
          }

          nav.classList.remove("open");

          burger.textContent = "☰";
          burger.setAttribute("aria-expanded", "false");
          burger.setAttribute("aria-label", "Open menu");
        }

      });

    });


    // Close menu when resizing back to desktop
    window.addEventListener("resize", function () {

      if (window.innerWidth > 980) {

        nav.classList.remove("open");

        burger.textContent = "☰";
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open menu");
      }

    });

  }


  // Back to top
  const toTop = document.getElementById("backToTop");

  if (toTop) {

    window.addEventListener("scroll", function () {

      if (window.scrollY > 500) {
        toTop.classList.add("show");
      } else {
        toTop.classList.remove("show");
      }

    });

    toTop.addEventListener("click", function () {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // Current page
  const here =
    location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav.main a").forEach(function (a) {

    const href = a.getAttribute("href") || "";

    if (href.endsWith(here) && here !== "") {
      a.classList.add("current");
    }

  });

});