var timeout;
const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

// function firstpageanim() {

//   var tl = gsap.timeline();
//   tl.from(".nav", {
//     duration: 1.2,
//     y: -100,
//     ease: "power2.inOut",
//   });

//   tl.to(".boundingelem", {
//     duration: 1.5,
//     y: 0,
//     ease: "power2.inOut",
//   });
// }

// Fade animation
function firstpageanim() {
  gsap.from(".nav", {
    duration: 1.2,
    y: -100,
    ease: "power2.inOut",
  });

  gsap.to(".boundingelem", {
    duration: 1.2,
    y: 0,
    ease: "power2.inOut",
  });
}

function circleMouse(xScale, yScale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      ".minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xScale},${yScale})`;
  });
}

//Skwes the circle value.
function mouseskew() {
  var xScale = 1;
  var yScale = 1;
  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xScale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yScale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
    yprev = dets.clientY;
    xprev = dets.clientX;
    circleMouse(xScale, yScale);
    timeout = setTimeout(function () {
      document.querySelector(
        ".minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

//Hide Image.
document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffroat = 0;

  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
    });
  });

  //Show image
  elem.addEventListener("mousemove", function (details) {
    diffroat = details.clientX - rotate;
    rotate = details.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power4,
      left: rotate - 290,
      rotate: gsap.utils.clamp(-20, 20, diffroat),
    });
  });
});

// Function to update the clock
function updateClock() {
  // Get the current date and time
  const now = new Date();

  // Format the time (adjust as needed)
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  // Display the time
  const clockElement = document.getElementById("time");
  clockElement.innerHTML = `<p>${hours}:${minutes}:${seconds}</p>`;
}

// Update the clock every second
setInterval(updateClock, 1000);


mouseskew();
circleMouse();
firstpageanim();
updateClock();
