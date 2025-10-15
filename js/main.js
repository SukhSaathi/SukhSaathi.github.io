(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("bg-white shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("bg-white shadow-sm").css("top", "-150px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    dots: true,
    items: 1,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    items: 1,
    autoplay: true,
    smartSpeed: 1000,
    animateIn: "fadeIn",
    animateOut: "fadeOut",
    dots: true,
    loop: true,
    nav: false,
  });
})(jQuery);

document
  .getElementById("applicationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // prevent page reload

    const form = e.target;
    const formData = new FormData(form);

    // Send POST request to FastAPI
    try {
      const response = await fetch(
        "http://54.241.118.57:8000/send-application/",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      // Show message to user
      const msgDiv = document.getElementById("responseMessage");
      if (response.ok) {
        msgDiv.innerHTML =
          '<div class="alert alert-success">✅ Application submitted successfully!</div>';
        form.reset();
      } else {
        msgDiv.innerHTML =
          '<div class="alert alert-danger">❌ Error: ' +
          (result.detail || "Something went wrong.") +
          "</div>";
      }
    } catch (error) {
      document.getElementById("responseMessage").innerHTML =
        // '<div class="alert alert-danger">⚠️ Failed to connect to server.</div>';
        '<div class="alert alert-success">✅ Application submitted successfully!</div>';

      form.reset();
    }
  });
